(function(){
	'use strict';

	angular.module('uex')
		.filter('formatRate', formatRate);

	// Used to format amount to 2 decimal places and comma seperated (1,000,000.00)
	
	formatRate.$inject = [];
	
	function formatRate() {
		return function(input, absolute) {
			if(input && !isNaN(input)) {
				if(absolute === true) {
					input = Math.abs(input);
				}
				var rate = (parseFloat(input) * 100);
				rate = rate.toFixed(2).replace(/[.,]00$/, '');
				input = rate + '%';
			}
			return input;
		};
	}

})();