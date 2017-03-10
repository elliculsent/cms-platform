/* global toastr:false, moment:false */
(function() {
	'use strict';

	// Registration
	angular.module('uex')
		.constant('toastr', toastr)
		.constant('moment', moment)
		.constant('LOCALES', {
			locales: {
				en_US: 'English',
				fr_FR: 'French'
			},
			preferredLocale: 'en_US'
		})
		.constant('POLICY_TYPE', {
			USER: 'USER',
			PRESET: 'PRESET',
			PSEUDO: 'PSEUDO',
			SHARED: 'SHARED'
		})
		.constant('POLICY_STATUS', {
			DRAFT: 'DRAFT',
			REVIEW_HEALTH: 'REVIEW_HEALTH',
			PENDING_SIGN: 'PENDING_SIGN',
			PENDING_SIGN_ONLY: 'PENDING_SIGN_ONLY',
			PENDING_PAYMENT: 'PENDING_PAYMENT',
			ACTIVE: 'ACTIVE'
		})
		.constant('PAYMENT_STATUS', {
			CREATED: 'CREATED',
			SUCCESS: 'SUCCESS',
			FAILED: 'FAILED',
			OTHERS: 'OTHERS',
			CANCELLED: 'CANCELLED'
		})
		.constant('PRODUCT', {
			BASE_COVERAGE: 'BASE',
			DENTAL_COVERAGE: 'DENTAL',
			MATERNITY_COVERAGE: 'MATERNITY',
			OPTICAL_COVERAGE: 'OPTICAL',
			TRAVEL_COVERAGE: 'TRAVEL'
		})
		.constant('POLICY_SIGNATURE_STATUS', {
			INIT: 'init',
			WAITING: 'waiting',
			SIGNED: 'signed',
			SIGNED_COMPLETE: 'signed_complete',
			ERROR: 'error'
		})
		.constant('PREMIUM_FACTORS', {
			PAYMENT_PERIOD: {
				CODE: "PAYMENT_PERIOD",
				TYPE: {
					ANNUAL: "ANNUAL",
					MONTHLY: "MONTHLY"
				}
			}
		})
		.constant('POLICY_CONTACT', {
			PHONENO: '+6531583677',
			EMAIL: 'contact@uexglobal.com',
			ADMIN_EMAIL: 'admin@uexglobal.com'
		})
		.constant('DATE_FORMAT', {
			DISPLAY: 'DD MMM YYYY',
			DISPLAY_TIME: 'DD MMM YYYY HH:mm',
			INPUT: 'YYYY-MM-DD'
		})
		.constant('PRESET_LEVELS_ORDINALITY', {
			BASIC: 1,
			MEDIUM: 2,
			EXCLUSIVE: 3
		})
		.constant('GA_EVENTS', {
			CLICK: 'Click',
			DOWNLOAD: 'Download',
			CHANGE: 'Change',
			TOGGLE: 'Toggle'
		});
})();
