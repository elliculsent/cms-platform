(function() {
	'use strict';

	// Registration
	angular.module('cms')
		.constant('ENV', {
			value: "local", 
			url: "localhost:8080", 
			yousignUrl: "", 
			gaTrackingId: "", 
		});
})();
