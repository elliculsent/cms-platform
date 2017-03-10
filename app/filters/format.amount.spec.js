'use strict';

describe('FormatAmountFilter', function() {

	var PREMIUM_FACTORS;

    beforeEach(inject(function(_PREMIUM_FACTORS_){
    	PREMIUM_FACTORS = _PREMIUM_FACTORS_;
    }));

    it('should have a format amount filter', inject(function($filter) {
        expect($filter('formatAmount')).not.toBeNull();
    }));

    it('should filter the amount into comma seperated and 2 decimal places', inject(function($filter) {
        // Given:
    	var input = 50000;

        // When:
        
        // Then:
        expect($filter('formatAmount')(input)).toEqual('50,000.00');
    }));

    it('should calculate monthly if displayType is monthly', inject(function($filter) {
    	// Given:
        var input = 1200;

        // When:
        
        // Then:
    	expect($filter('formatAmount')(input, PREMIUM_FACTORS.PAYMENT_PERIOD.TYPE.MONTHLY)).toEqual('100.00');
    }));

});