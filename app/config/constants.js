/* global toastr:false, moment:false */
(function() {
	'use strict';

	// Registration
	angular.module('cms')
		.constant('toastr', toastr)
		.constant('moment', moment)
		.constant('LOCALES', {
			locales: {
				en_US: 'English',
				fr_FR: 'French'
			},
			preferredLocale: 'en_US'
		})
		.constant('GA_EVENTS', {
			CLICK: 'Click',
			DOWNLOAD: 'Download',
			CHANGE: 'Change',
			TOGGLE: 'Toggle'
		});
})();
