(function() {
	'use strict';

	// Registration
	angular.module('cms.services')
		.provider('ExceptionHandler', ExceptionHandlerProvider);

	function ExceptionHandlerProvider() {
		this.$get = ExceptionHandler;
	}

	// Dependency injection
	ExceptionHandler.$inject = ['$delegate', '$injector'];

	function ExceptionHandler ($delegate, $injector){
		return function(exception, cause) {
			// Do something
			console.error(exception);
			console.error(cause);
		};
	}
})();