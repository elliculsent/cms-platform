(function(){
	'use strict';
    
	// Registration
	angular.module('cms.manage')
		.controller('PageController', PageController);
    
	// Dependency injection
	PageController.$inject = [];
    
	function PageController() {
		var vm = this;
		
        
		init();
        
		//////////////
		
        function init() {
			console.log('your app works in the first page');
		};
		
	}
})();