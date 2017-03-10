(function(){
	'use strict';

	// Registration
	angular.module('uex')
		.run(Run);

	// Dependency injection
	Run.$inject = ['$window', '$rootScope', '$state', '$ionicLoading', '$ionicConfig',
		'ModalService', 'LocaleService', 'AuthService', 'PolicyService', 'IEService', 'EnvService', 'ScreenService', 'GoogleAnalyticsService', 'POLICY_STATUS'];

	function Run($window, $rootScope, $state, $ionicLoading, $ionicConfig,
		ModalService, LocaleService, AuthService, PolicyService, IEService, EnvService, ScreenService, GoogleAnalyticsService, POLICY_STATUS) {

		// Initialisation
		EnvService.toggle();
		ScreenService.init();
		GoogleAnalyticsService.init();

		$rootScope.$on('$stateChangeStart', onStateChangeStart);
		$rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);
		$rootScope.$on('$stateNotFound', onStateNotFound);
		$rootScope.$on('$stateChangeError', onStateChangeError);

		function goToLanding(fromState) {
			$state.go(fromState.name ? fromState.name : 'uex.policy.customise');
		};

		function onStateChangeStart(event, toState, toParams, fromState, fromParams) {
			$ionicLoading.show();
			ModalService.remove();

			// Validate session if transitioning to authenticated state
			if(!AuthService.hasActiveSession() &&
				!AuthService.isPublicState(toState)) {
				console.debug(toState.name + ' is not a public state. Please log in to proceed.');
				event.preventDefault();
				goToLanding(fromState);
				$ionicLoading.hide();
				return;
			}

			// Validate if user already has existing policy
			if (AuthService.hasActiveSession() &&
					(toState.name == 'uex.policy.customise' || toState.name == 'uex.policy.mine')) {

				var isCustomizedEnabled = (PolicyService.isCustomizedEnabled() === true) ? true : false;

				if(isCustomizedEnabled === true) {
					toState.name != 'uex.policy.customise' && PolicyService.goToHomeWithReload($state); 
					$ionicLoading.hide();
				}else {

					PolicyService.mine()
					.then(function onSuccess(mine) {

						if (mine && !isCustomizedEnabled) {
							toState.name != 'uex.policy.mine' && PolicyService.goToMine($state); //$state.go('uex.policy.mine');
						}else if(isCustomizedEnabled  === true) {
							toState.name != 'uex.policy.customise' && PolicyService.goToHomeWithReload($state);
						}else {
							toState.name != 'uex.policy.customise' && PolicyService.goToHome($state); //$state.go('uex.policy.customise');//
						}
						return;
					})
					.finally(function() { $ionicLoading.hide(); });
				}
			}

			// Validate if fromState is valid for toState
			if(!AuthService.isAllowedToState(fromState, fromParams, toState, toParams)) {
				console.debug(toState.name + ' can only be accessed via ' + toState.data.from + ' and not ' + fromState.name);
				event.preventDefault();
				goToLanding(fromState);
				$ionicLoading.hide();
				return;
			}
		}

		function onStateChangeSuccess(event, toState, toParams, fromState, fromParams) {
			$ionicLoading.hide();
		}

		function onStateNotFound(event, unfoundState, fromState, fromParams) {
			$ionicLoading.hide();
		};

		function onStateChangeError(event, toState, toParams, fromState, fromParams, error) {
			console.error(error);
			$ionicLoading.hide();
		};
	}
})();
