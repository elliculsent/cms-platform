(function(){
	'use strict';

	angular.module('uex', [

	'ionic',

	/*
	 * Angular modules
	 */
	'ngSanitize',

	/*
	 * Our reusable cross app code modules
	 */
	'uexTemplates',

	/*
	 * 3rd Party modules
	 */
	'pascalprecht.translate', //angular-translate
	'tmh.dynamicLocale', //angular-dynamic-locale
	'rzModule',
	'ionic-datepicker',
	'angulartics',
	'angulartics.google.analytics',
	// '720kb.socialshare',
	'angular-clipboard',

	/*
	 * Services 
	 */
	'uex.services',

	/*
	 * Component modules
	 */
	'uex.cache',
	'uex.sideMenu',
	'uex.lang',
	'uex.navTitle',
	'uex.auth',
	'uex.formValidation',
	'uex.countrySelect',
	'uex.dateValidator',
	'uex.signature',
	'uex.accordion',
	'uex.popup',
	'uex.rating',
	'uex.imageResize',
	'uex.modal',
	'uex.share',
	'uex.contactus',
	'uex.googleAnalytics',
	'uex.floodlight',
	'uex.screen',
	'uex.env',

	/*
	 * Feature modules
	 */
	'uex.tour',
	'uex.onboarding',
	'uex.policy',
	'uex.pricing',
	'uex.signup',
	'uex.password',
	'uex.validation'

	]);
})();
