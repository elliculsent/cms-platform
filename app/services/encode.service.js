(function() {
	'use strict';

	// Registration
	angular.module('cms.services')
		.factory('EncodeService', EncodeService);

	// Dependency injection
	EncodeService.$inject = ['$window'];

	function EncodeService($window) {
		var service = {
			encodeBase64: encodeBase64,
			decodeBase64: decodeBase64,
			encodeUrl: encodeUrl,
			decodeUrl: decodeUrl,
			encodeUrlBase64: encodeUrlBase64,
			decodeUrlBase64: decodeUrlBase64
		};

		return service;

		////////////

		function encodeBase64(value) {
			if(!value) {
				return value;
			}
			if(typeof value == 'object') {
				value = JSON.stringify(value);
			}
			return $window.btoa(value);
		};

		function decodeBase64(value) {
			if(!value) {
				return value;
			}
			try {
				return $window.atob(value);
			}
			catch(err) {
				return value;
			}
		};

		function encodeUrl(value) {
			if(!value) {
				return value;
			}
			if(typeof value == 'object') {
				value = JSON.stringify(value);
			}
			return $window.encodeURIComponent(value);
		};

		function decodeUrl(value) {
			if(!value) {
				return value;
			}
			return $window.decodeURIComponent(value);
		};

		function encodeUrlBase64(value) {
			return service.encodeUrl(service.encodeBase64(value));
		};

		function decodeUrlBase64(value) {
			return service.decodeBase64(service.decodeUrl(value));
		};
	}
})();

