(function(){
	'use strict';

	angular.module('cms', [

	/*
	 * Angular modules
	 */
	'ngSanitize',
	'ngAnimate',
	'ui.router',
	'ngMaterial',
	/*
	 * Our reusable cross app code modules
	 */
	'cmsTemplates',
	/*
	 * 3rd Party modules
	 */
	'pascalprecht.translate', //angular-translate
	'tmh.dynamicLocale', //angular-dynamic-locale
	'rzModule',
	'angulartics',
	'angulartics.google.analytics',
	// '720kb.socialshare',
	'angular-clipboard',
        
        
	/*
	 * Component modules
	 */
	'cms.cache',
    'nav.menu',
        
    
	/*
	 * Services
	 */
	'cms.services',
    'cms.auth',
        
    /*
	 * Feature modules
	 */
	'cms.manage',
        
	]);
})();
