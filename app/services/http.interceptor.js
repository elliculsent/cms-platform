(function() {
	'use strict';

	// Registration
	angular.module('cms.services')
		.provider('HttpInterceptor', HttpInterceptorProvider);

	function HttpInterceptorProvider() {
		this.$get = HttpInterceptor;
	}

	// Dependency injection
	HttpInterceptor.$inject = ['$injector', '$q', 
		'ERROR'];

	function HttpInterceptor ($injector, $q,
		ERROR) {

		var authHeader = 'Authorization';
		var authPrefix = 'Bearer ';

		return {
			request: onRequest,
			requestError: onRequestError,
			response: onResponse,
			responseError: onResponseError
		};

		////////////////

		function onRequest(config){
			if (config.skipAuth || 
				config.url.substr(config.url.length - 5) == '.html' || 
				config.headers && config.headers[authHeader]) {
				return config;
			}

			var AuthService = $injector.get('AuthService');
			AuthService.getAccessToken()
			.then(function(token) {
				if(token) {
					config.headers = config.headers || {};
					// Attach JWT token to the header
					config.headers[authHeader] = authPrefix + token;
				}
			});
			return config;
		};

		function onRequestError(rejection){
			// Do something
			return $q.reject(rejection);
		};

		function onResponse(resp){
			// Checked exceptions
			if(resp.data && resp.data.success == false && resp.data.error) {
				//var $ionicLoading = $injector.get('$ionicLoading');
				//$ionicLoading.hide();
				var code = resp.data.error.code;
				if(code) {
					resp.data.error.messageKey = ERROR[code];
				}
				if(code == 3004) {
					var AuthService = $injector.get('AuthService');
					AuthService.alertNotVerified(ERROR[code])
				}
			}

			// Do something
			return resp;
		};

		function onResponseError(response){
			//var $ionicLoading = $injector.get('$ionicLoading');
			//$ionicLoading.hide();
			var httpStatus = response.status;
			// Inject error message key based on error code
			if(response.data &&
				response.data.success === false &&
				response.data.error && 
				response.data.error.code) {

				var code = response.data.error.code;
				if(httpStatus === 401) {
					response.data.error.messageKey = 'auth.INVALID_LOGIN';
				}
				else {
					response.data.error.messageKey = ERROR[code];
				}
			}
			// TODO: Remove once response is modified with response wrapper
			else if(httpStatus === 401) {
				response.data = {
					error: {
						messageKey: 'auth.INVALID_LOGIN' 
					}
				};
			}
			return $q.reject(response);
		};
	}
})();

