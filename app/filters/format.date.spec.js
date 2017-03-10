'use strict';

describe('FormatDateFilter', function() {

	var DATE_FORMAT;

    beforeEach(inject(function(_DATE_FORMAT_){
    	DATE_FORMAT = _DATE_FORMAT_;
    }));

    it('should have a format date filter', inject(function($filter) {
        expect($filter('formatDate')).not.toBeNull();
    }));

    it('should format date to display value', inject(function($filter) {
        // Given:
    	var input = 'Fri May 13 2016 17:52:35 GMT+0800 (Malay Peninsula Standard Time)';

        // When:
        
        // Then:
        expect($filter('formatDate')(input)).toEqual('13 May 2016');
    }));

});