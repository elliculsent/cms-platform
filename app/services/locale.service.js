(function() {
	'use strict';

	// Registration
	angular.module('cms.services')
		.provider('LocaleService', LocaleServiceProvider);

	function LocaleServiceProvider() {
		this.$get = LocaleService;
	}

	// Dependency injection
	LocaleService.$inject = ['LOCALES', 'tmhDynamicLocale', '$translate', '$rootScope'];

	function LocaleService (LOCALES, tmhDynamicLocale, $translate, $rootScope) {

		// Locales info
		var localesObj = LOCALES.locales;

		// Locales and locales display names
		var _LOCALES = Object.keys(localesObj);
		if (!_LOCALES || _LOCALES.length === 0) {
			console.error('There are no _LOCALES provided');
		}
		var localesDisplayNames = [];
		_LOCALES.forEach(function(locale) {
			localesDisplayNames.push(localesObj[locale]);
		});
		
		// Current locale
		var currentLocale = $translate.proposedLanguage();

		// on successful change of translations
		$rootScope.$on('$translateChangeSuccess', function(event, data) {
			//e.g.: data {"language":"en_US"}
			document.documentElement.setAttribute('lang', data.language);// sets "lang" attribute to html
		
			// asking angular-dynamic-locale to load and apply proper AngularJS $locale settings
			var newLocale = data.language.toLowerCase().replace(/_/g, '-');
			tmhDynamicLocale.set(newLocale);
		});

		function checkLocaleIsValid(locale) {
			return _LOCALES.indexOf(locale) !== -1;
		}
		
		function setLocale(locale) {
			if (!checkLocaleIsValid(locale)) {
				console.error('Locale name "' + locale + '" invalid');
				return;
			}
			currentLocale = locale;
		
			// ask to load and apply the translations
			$translate.use(locale);
		}

		var service = {
			getLocaleDisplayName: getLocaleDisplayName,
			setLocaleByDisplayName: setLocaleByDisplayName,
			getLocalesDisplayNames: getLocalesDisplayNames
		};

		return service;

		///////////////
		
		function getLocaleDisplayName() {
			return localesObj[currentLocale];
		}

		function setLocaleByDisplayName(localeDisplayName) {
			setLocale(
				_LOCALES[ localesDisplayNames.indexOf(localeDisplayName) ]
			);
		}

		function getLocalesDisplayNames() {
			return localesDisplayNames;
		}
	}
})();

