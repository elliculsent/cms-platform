(function() {
	'use strict';

	// Registration
	angular.module('uex')
		.constant('ENV', {
			value: "local", 
			url: "https://uex-api-production-0-3-4.ap-southeast-1.elasticbeanstalk.com", 
			yousignUrl: "https://demo.yousign.fr/public/ext/cosignature/", 
			gaTrackingId: "UA-83823614-1", 
		});
})();
