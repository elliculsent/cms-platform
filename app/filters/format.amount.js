(function(){
	'use strict';

	angular.module('uex')
		.filter('formatAmount', FormatAmount);

	// Used to format amount to 2 decimal places and comma seperated (1,000,000.00)
	
	FormatAmount.$inject = ['PREMIUM_FACTORS'];
	
	function FormatAmount(PREMIUM_FACTORS) {
		return function(input, displayType, absolute) {
			if(input) {
				if (displayType === PREMIUM_FACTORS.PAYMENT_PERIOD.TYPE.MONTHLY) {
					input /= 12;
				}

				if(absolute) {
					input = Math.abs(input);
				}

				// 2 Decimal Places
				input = parseFloat(input).toFixed(2);

				// Add comma
				input = input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}

			return input;
		};
	}

})();