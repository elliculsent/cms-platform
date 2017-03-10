(function() {
	'use strict';

	angular.module('uex')
		.filter('trustAsHtml', trustAsHtml);

	trustAsHtml.$inject = ['$sce'];

	function trustAsHtml($sce) {
		return function(input) {
			return $sce.trustAsHtml(input);
		};
	};
})();