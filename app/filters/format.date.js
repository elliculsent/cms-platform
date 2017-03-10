(function(){
	'use strict';

	angular.module('uex')
		.filter('formatDate', formatDate);

	formatDate.$inject = ['DATE_FORMAT'];
	
	function formatDate(DATE_FORMAT) {
		return function(input, withTimestamp) {

			if(input) {
				var format = withTimestamp === true ? DATE_FORMAT.DISPLAY_TIME : DATE_FORMAT.DISPLAY;
				input = moment(input).format(format);
			}

			return input;
		};
	}

})();