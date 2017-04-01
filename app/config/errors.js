(function() {
	'use strict';

	// Registration
	angular.module('cms')
		.constant('ERROR', {
			'3003': 'signup.EMAIL_TAKEN',
			'3004': 'verified.NOT_VERIFIED_CONFIRM_POPUP'
		});
})();
