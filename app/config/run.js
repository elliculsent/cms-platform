(function(){
	'use strict';

	// Registration
	angular.module('cms')
		.run(Run);

	// Dependency injection
	Run.$inject = ['$window', '$rootScope', '$state'];

	function Run($window, $rootScope, $state) {

		// Initialisation
		$rootScope.$on('$stateChangeStart', onStateChangeStart);
		$rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);
		$rootScope.$on('$stateNotFound', onStateNotFound);
		$rootScope.$on('$stateChangeError', onStateChangeError);

		/*function goToLanding(fromState) {
			$state.go(fromState.name ? fromState.name : 'cms.manage.page');
		};*/

		function onStateChangeStart(event, toState, toParams, fromState, fromParams) {
            //goToLanding(fromState);
		}

		function onStateChangeSuccess(event, toState, toParams, fromState, fromParams) {

		}

		function onStateNotFound(event, unfoundState, fromState, fromParams) {

		};

		function onStateChangeError(event, toState, toParams, fromState, fromParams, error) {
			console.error(error);

		};
	}
})();
