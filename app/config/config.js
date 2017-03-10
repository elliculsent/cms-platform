(function() {
	'use strict';

	// Registration
	angular.module('uex')
		.config(Config);

	// Dependency injection
	Config.$inject = ['$httpProvider', '$provide', 
		'HttpInterceptorProvider', 'ExceptionHandlerProvider', 'IEServiceProvider',
		'$translateProvider', 'tmhDynamicLocaleProvider', 'CacheFactoryProvider', 'ionicDatePickerProvider', '$ionicConfigProvider'];

	function Config($httpProvider, $provide,
		HttpInterceptorProvider, ExceptionHandlerProvider, IEServiceProvider,
		$translateProvider, tmhDynamicLocaleProvider, CacheFactoryProvider, ionicDatePickerProvider, $ionicConfigProvider) {
		// Configure HTTP interceptor implementation
		$httpProvider.interceptors.push(HttpInterceptorProvider.$get);

		// Extend exception handler implementation
		// $provide.decorator('$exceptionHandler', ExceptionHandlerProvider.$get);

		// To get warnings regarding forgotten IDs in translations
		$translateProvider.useMissingTranslationHandlerLog();

		// The translation files. All translation files are under app/resources e.g. app/resources/locale-en_EN.json for British English
		$translateProvider.useStaticFilesLoader({
			prefix: 'app/resources/locale-',
			suffix: '.json?random=' + _.random(0, 9999999)
		});

		// Sanitation strategy for security
		// http://angular-translate.github.io/docs/#/guide/19_security
		// $translateProvider.useSanitizeValueStrategy('sanitize');

		// Preferred language. Refer to constants.js for the supported locales
		$translateProvider.preferredLanguage('en_US');

		// Save selected language to local storage 
		//$translateProvider.useLocalStorage();		//TODO: resolve the dependency issue

		// The location of $locale settings files for angular-dynamic-locale
		tmhDynamicLocaleProvider.localeLocationPattern('lib/angular-i18n/angular-locale_{{locale}}.js');

		// Set the local storage prefix
		angular.extend(CacheFactoryProvider.defaults, {
			storageMode: 'localStorage',
			storagePrefix: 'uex-',
			axAge: 180 * 60 * 1000, // Items added to this cache expire after 15 minutes
			cacheFlushInterval: 180 * 60 * 1000, // This cache will clear itself every 3 hours
			deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
			onExpire: function(key, value) {
				console.log("Cache expire:", key, value);
			}
		});

		// Date picker default -- TODO: translate
		var datePickerObj = {
			inputDate: new Date(),
			setLabel: 'Set',
			todayLabel: 'Today',
			closeLabel: 'Close',
			mondayFirst: true,
			weeksList: ["S", "M", "T", "W", "T", "F", "S"],
			monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
			templateType: 'popup',
			from: new Date(2012, 8, 1),
			to: new Date(2018, 8, 1),
			showTodayButton: true,
			dateFormat: 'dd MMMM yyyy',
			closeOnSelect: false,
			disableWeekdays: []
		};
		ionicDatePickerProvider.configDatePicker(datePickerObj);

		ionic.Platform.setPlatform('ios');

		$ionicConfigProvider.views.maxCache(0);

		IEServiceProvider.overrideNgClick();
	}
})();
