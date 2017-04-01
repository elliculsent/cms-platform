(function(){
	'use strict';

	// Registration
	angular.module('nav.menu')
		.controller('NavMenuController', NavMenuController);

	// Dependency injection
	NavMenuController.$inject = ['$scope', '$state', '$q'];

	function NavMenuController($scope, $state, $q) {
		var vm = this;

		init();

		////////////

		function init() {
			console.log('all functions for navigation respond clicks here');
		};

	}
})();
