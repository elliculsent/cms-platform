(function() {
	'use strict';

	// Registration
	angular.module('uex.services')
		.provider('IEService', IEServiceProvider);

	// Dependency injection
	IEServiceProvider.$inject = ['$provide'];

	function IEServiceProvider($provide) {
		// Factory
		this.$get = IEService;

		// Config functions
		// Override ng-click for ie to prevent double click
		// https://jira.leotech.com.sg/browse/UEX-1477
		this.overrideNgClick = function() {
			if(IEService().isIE()) {
				$provide.factory('$ionicNgClick', ['$parse', '$timeout', function ($parse, $timeout) {
					return function(scope, element, clickExpr) {
						var clickHandler = angular.isFunction(clickExpr) ? clickExpr : $parse(clickExpr);

						element.on('click', function(event) {
						scope.$apply(function() {
							if (scope.clicktimer) return; // Second call
								clickHandler(scope, {$event: (event) });
								scope.clicktimer = $timeout(function() { delete scope.clicktimer; }, 1, false);
							});
						});

						// Hack for iOS Safari's benefit. It goes searching for onclick handlers and is liable to click
						// something else nearby.
						element.onclick = function(event) {};
					};
				}]);
			}
		};
	};

	// Dependency injection
	IEService.$inject = [];

	function IEService() {

		return {
			isIE: isIE
		};

		////////////

		function isIE() {
			var ua = ionic.Platform.ua;
			var msie = ua.indexOf("MSIE ");

			return (msie > 0 || !!ua.match(/Trident.*rv\:11\./) || !!ua.match(/Edge\/\d./));
		};

	};
})();