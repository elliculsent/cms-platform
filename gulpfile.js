var gulp = require('gulp');
var gutil = require('gulp-util');
var ngConstant = require('gulp-ng-constant');
var install = require('gulp-install');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var karma = require('karma');
var zip = require('gulp-zip');
var print = require('gulp-print');
var file = require('gulp-file');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace')

var paths = {
	sass: [
		'./app/**/*.scss'
	],
	js: [
		'./app/services/**/*.module.js',
		'./app/services/**/*.js',
		//'./app/components/**/*.module.js',
		//'./app/components/**/*.js',
		'./app/features/**/*.module.js',
		'./app/features/**/*.js',
		'./app/index.module.js',
		'./app/filters/**/*.js',
		'./app/config/**/*.js',
		'!./app/**/*.spec.js'
	],
	html: [
		'./app/**/*.html'
	],
	dist: {
		root: './dist',
		package: './dist/package',
		build: './dist/package/build',
		revManifest: './dist/package/build/rev-manifest.json' 
	}
};

var onError = function(err) {
	console.log(err);
};

var swallowError = function(err) {
	console.log(err.toString());
	this.emit('end');
};

var out = function(filepath) {
	return "============= built: " + filepath;
};

gulp.task('default', ['compile']);

/* Switch environment configuration */
gulp.task('switch-env', [], function() {
	if (!gutil.env.env) {
		console.log("Set env to either gulp switch-env --env local|staging|production");
		return;
	}

	var constants = require('./env/' + gutil.env.env.toLowerCase() + '.json');
	return ngConstant({
			constants: constants,
			templatePath: './env/env.js',
			stream: true
		})
		.pipe(rename("env.js"))
		.pipe(gulp.dest('./app/config'))
		.pipe(print(out));
});

/* Cleans vendor generated files */
gulp.task('clean-vendor', function() {
	return gulp.src([
		'./static-assets/fonts/!(uex)', // Vendor fonts files
		'./build/vendor*.js' // Vendor all
	], {
		read: false
	}).pipe(clean({
		force: true
	}));
});

gulp.task('vendor-fonts', function() {
	return gulp.src([
		'./lib/ionic/fonts/ionicons.eot',
		'./lib/ionic/fonts/ionicons.svg',
		'./lib/ionic/fonts/ionicons.ttf',
		'./lib/ionic/fonts/ionicons.woff'
	])
	.pipe(gulp.dest('./static-assets/fonts/'))
	.pipe(print(out));
});

/* Concatenate and uglify vendor scripts  */
gulp.task('vendor-js', function() {
	// Bundle vendor scripts
	return gulp.src([
			'./lib/ionic/js/ionic.bundle.js',
			'./lib/jquery/dist/jquery.js',
			'./lib/toastr/toastr.js',
			'./lib/lodash/dist/lodash.js',
			'./lib/moment/moment.js',
			'./lib/angular-translate/angular-translate.js',
			'./lib/angular-dynamic-locale/src/tmhDynamicLocale.js',
			'./lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
			'./lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
			'./lib/angular-translate-storage-local/angular-translate-storage-local.js',
			'./lib/angular-translate-handler-log/angular-translate-handler-log.js',
			'./lib/angular-messages/angular-messages.js',
			'./lib/angular-cache/dist/angular-cache.js',
			'./lib/angularjs-slider/dist/rzslider.js',
			'./lib/datepicker-for-ionic/dist/templates.min.js',
			'./lib/ionic-datepicker/dist/ionic-datepicker.bundle.min.js',
			'./lib/angular-country-picker/country-picker.js',
			'./lib/file-saver/FileSaver.min.js',
			// './lib/angular-socialshare/dist/angular-socialshare.js',
			'./lib/exif-js/exif.js',
			'./lib/angulartics/dist/angulartics.min.js',
			'./lib/angulartics-google-analytics/dist/angulartics-ga.min.js',
			'./lib/angular-clipboard/angular-clipboard.js',
		])
		.pipe(concat({
			path: 'vendor.js',
			cwd: ''
		}))
		.on('error', swallowError)
		.pipe(gulp.dest('./build/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify({
			mangle: false,
			compress: {
				drop_console: true
			}
		}))
		.pipe(gulp.dest('./build/'))
		.pipe(print(out));
});

/* Prepare all vendor build tasks */
gulp.task('vendor', ['vendor-fonts', 'vendor-js'], function(callback) {
	callback();
});

/* Cleans js generated files */
gulp.task('clean-js', function() {
	return gulp.src([
		'./build/uex*.js', // App script files
	], {
		read: false
	}).pipe(clean({
		force: true
	}));
});

/* Concat js files */
gulp.task('js', function() {
	return gulp.src(paths.js)
	.pipe(sourcemaps.init())
	.pipe(concat('uex.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./build/'))
	.pipe(print(out));
});

/* Cleans sass generated files */
gulp.task('clean-sass', function() {
	return gulp.src([
		'./build/**/*.css' // App sass
	], {
		read: false
	}).pipe(clean({
		force: true
	}));
});

/* Compile main scss files to css */
gulp.task('sass', function(done) {
	return gulp.src([
		'./app/index.scss',
		'./app/stylesheets/**/*.scss'
		])
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(rename('uex.css'))
	.pipe(gulp.dest('./build/'))
	.pipe(minifyCss({
	  keepSpecialComments: 0
	}))
	.pipe(rename('uex.min.css'))
	.pipe(gulp.dest('./build/'))
	.pipe(print(out));
});

/* Cleans template cache */
gulp.task('clean-template', function() {
	return gulp.src('./build/templates*.js', {
			read: false,
			force: true
		})
		.pipe(clean({
			force: true
		}));
});

//* Compile HTML templates using angular-templatecache */
gulp.task('template', function() {
	return gulp.src('./app/**/*.html')
		.pipe(templateCache('templates.js',{
			standalone: true,
			root: 'templateCache',
			module: 'uexTemplates'
		}))
		.on('error', swallowError)
		.pipe(gulp.dest('./build'))
		.pipe(print(out));
});


/* Cleans all generated files */
gulp.task('clean', ['clean-vendor', 'clean-template', 'clean-js', 'clean-sass'], function(callback) {
	callback();
});

/* Compiles and generates build files */
gulp.task('compile', function(callback) {
	runSequence('clean', 'vendor', 'template', 'js', 'sass', callback);
});

/* Add revision on compiled/build files */
gulp.task('rev', function(callback) {
	return gulp.src([
		paths.dist.build + '/*.js',
		paths.dist.build + '/*.css'
	])
	.pipe(clean({
		force: true
	}))
	.pipe(rev())
	.pipe(gulp.dest(paths.dist.build))
	.pipe(rev.manifest({
		merge: true
	}))
	.pipe(gulp.dest(paths.dist.build));
});

/* Replace index.html with build files with new revision */
gulp.task('rev-replace', function(callback) {
	var manifest = gulp.src(paths.dist.revManifest);

	return gulp.src(paths.dist.package + '/index.html')
	.pipe(revReplace({manifest: manifest}))
	.pipe(gulp.dest(paths.dist.package));
});

/* Revisions dist build files */
gulp.task('rev-dist', function(callback) {
	runSequence('rev', 'rev-replace', callback);
});

/* Cleans dist folder */
gulp.task('clean-dist', function() {
	return gulp.src([
		paths.dist.root
	], {
		read: false
	})
	.pipe(clean({
		force: true
	}));
});

/* Builds dist contents */
gulp.task('build-dist', [], function() {
	var dirs = [
		"./app/resources/**",
		"./lib/angular-i18n/**",
		"./build/**",
		"./static-assets/**",
		"./index.html",
		"./version.txt"
	];

	// zip all files in stage to dist location
	return gulp.src(dirs, { base: './' })
		.pipe(gulp.dest(paths.dist.package))
		.pipe(print(out));
});

/* Zips dist contents */
gulp.task('zip-dist', [], function() {
	// zip all files in stage to dist location
	return gulp.src(paths.dist.package)
		.pipe(zip('dist.zip'))
		.pipe(gulp.dest(paths.dist.root))
		.pipe(print(out));

});

/* Adds application version */
gulp.task('version-dist', [], function() {
	return file('version.txt', gutil.env.version + '\n' + new Date(), {src: true})
		.pipe(gulp.dest(paths.dist.package));
});

/* Compiles and zips req files for S3  */
gulp.task('dist', [], function(callback) {
	if (!gutil.env.version) {
		console.log("Set version via gulp dist --version <version>");
		return;
	}

	runSequence('clean-dist', 'compile', 'build-dist', 'rev-dist', 'version-dist', 'zip-dist', callback);
});

gulp.task('watch', ['compile'], function() {
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.js, ['js']);
	gulp.watch(paths.html, ['template']);
});

gulp.task('serve', ['watch'], function() {
	connect.server({
		port: 8100
	});
});

// gulp.task('karma', ['template'], function() {
gulp.task('karma', ['compile'], function() {
	var server = new karma.Server({
		configFile: __dirname + '/test/karma.conf.js'
	}, function(exitCode) {
		console.log('Done executing unit tests. exit_code=' +exitCode);
		process.exit(exitCode);
	});
	server.start();
});
