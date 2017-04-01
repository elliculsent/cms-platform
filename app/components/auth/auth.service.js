(function() {
	'use strict';
	
	// Registration
	angular.module('cms.auth')
		.factory('AuthService', AuthService);

	// Dependency injection
	AuthService.$inject = ['$rootScope', '$http', '$httpParamSerializer', '$q', '$location', 'CacheService'];

	function AuthService($rootScope, $http, $httpParamSerializer, $q, $location, CacheService) {
		var cache = CacheService.init('auth');

		var vm = this;

		var service = {
			isPublicState: isPublicState,
			isAllowedToState: isAllowedToState,

			logIn: logIn,
			logOut: logOut,
			hasActiveSession: hasActiveSession,
			getSession: getSession,
			saveSession: saveSession,
			getSessionUsername: getSessionUsername,
			getAccessToken: getAccessToken,
			refreshAccessToken: refreshAccessToken,

			alertVerified: alertVerified,
			alertNotVerified: alertNotVerified,
			alertPendingVerification: alertPendingVerification,
			resendVerificationEmail: resendVerificationEmail
		};

		return service;

		////////////

		function isPublicState(state) {
			if(state.data && state.data.access === 'public') {
				return true;
			}
			return false;
		};

		function isAllowedToState(fromState, fromParams, toState, toParams) {
			// Validate if fromState is valid in relation to toState
			if(fromState.name !== toState.name &&  
				toState.data && 
				toState.data.from && 
				toState.data.from.length > 0 &&
				toState.data.from.indexOf(fromState.name) < 0) {
				return false;
			}

			// Validate if blocked from access via address bar
			if(toState.data.blocked === true && !toParams.force) {
				return false;
			}
			return true;
		};

		function logIn(username, password) {
			var dfd = $q.defer();
			
			$http.post(ENV.url + '/auth/login', {
				email: username,
				password: password
			})
			.then(function onSuccess(resp) {
				service.saveSession(resp.data);

				$rootScope.$broadcast('REFRESH_USER');
				// TODO: Modify logIn response with response wrapper
				// dfd.resolve(resp.data.data);
				dfd.resolve(resp.data);
			}, function onError(resp) {
				dfd.reject(resp.data ? resp.data.error : null);
			});

			return dfd.promise;
		};

		function logOut() {
			var dfd = $q.defer();

			// Temporary implemenation
			CacheService.remove('auth', 'session');
			$rootScope.$broadcast('REFRESH_USER');
			dfd.resolve();

			return dfd.promise;
		};

		function hasActiveSession() {
			// Get token from user session
			var session = service.getSession();
			var token = session ? session.access_token : '';
			// if(token && !JwtService.isTokenExpired(token)) {
			if(token) {
				return true;
			}
			return false;
		};

		function getSessionUsername() {
			var session = service.getSession();
			return session ? session.username : null;
		};

		function getSession() {
			var session = CacheService.get('auth', 'session');
			return session;
		};

		function saveSession(data) {
			cache.put('session', data);
		};

		function getAccessToken() {
			var dfd = $q.defer();
			// Get token from user session
			var session = service.getSession();
			var token = session ? session.access_token : '';
			var refreshToken = session ? session.refresh_token : '';

			// Validate if token is expired
			if(token && refreshToken && JwtService.isTokenExpired(token)) {
				return service.refreshAccessToken()
			}
			else {
				dfd.resolve(token);
			}
			return dfd.promise;
		};

		function refreshAccessToken() {
			var dfd = $q.defer();
			// Get refresh token from user session
			var session = service.getSession();
			var refreshToken = session ? session.refresh_token : '';

			var params = {
				grant_type: 'refresh_token',
				refresh_token: refreshToken
			};

			$http({
				method: 'POST',
				url: ENV.url + '/oauth/access_token',
				skipAuth: true,
				data: $httpParamSerializer(params),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
			.then(function(resp) {
				service.saveSession(resp.data);

				dfd.resolve(resp.data.access_token);
			}, function(resp) {
				dfd.reject(resp);
			});

			return dfd.promise;
		};

		function alertVerified() {
			var isVerified = $location.search().verified;
			if(isVerified == 'true') {
				PopupService.alert('verified.SUCCESS_MESSAGE');
			}
			else if(isVerified == 'false') {
				PopupService.error('verified.ERROR_MESSAGE');
			}
			$location.search('verified', null);
		};

		function alertPendingVerification() {
			PopupService.alert('verified.PENDING_VERIFICATION_MESSAGE');
		};

		function alertNotVerified(message) {
			PopupService.confirm(message, {passive: true, okText: 'verified.RESEND'})
			.then(function(answer) {
				if(answer) {
					//$ionicLoading.show();
					service.resendVerificationEmail()
					.finally(function() { //$ionicLoading.hide(); 
                    });
				}
			});
		};

		function resendVerificationEmail() {
			var dfd = $q.defer();
			$http.get(ENV.url + '/user/resend')
			.then(function onSuccess(resp) {
				if(resp.data.success){
					dfd.resolve(resp.data.data);
				}
				else {
					dfd.reject(resp.data.error);
				}
			}, function onError (resp) {
				dfd.reject(resp);
			});
			return dfd.promise;
		};
	}
})();