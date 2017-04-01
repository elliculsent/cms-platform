
(function() {
	'use strict';

	// Registration
	angular.module('cms')
		.config(Route);

	function Route($stateProvider, $urlRouterProvider) {
		$stateProvider

		/* Base template */
		.state('cms', {
			url: '/cms',
			abstract: true,
            views: {
				'nav@': {
                     'controller': 'NavMenuController',
			         'templateUrl': 'templateCache/layout/main.html'
                }
            }
		})
        

		/* CMS module */
		.state('cms.manage', {
			url: '/manage',
			abstract: true
		})

		.state('cms.manage.page', {
			url: '/page',
			data: {
				access: 'public',
				from: null,
				blocked: false
			},
			params: {force: null},
			views: {
				'manage@': {
					templateUrl: 'templateCache/features/manage/page/page.html',
					controller: 'PageController',
					controllerAs: 'vm'
				}
			}
		})

		

		// Default states
		$urlRouterProvider.otherwise(function($injector, $location) {
			var params = $location.search();
			var query = '';
			if(!_.isEmpty(params)) {
				query = _.reduce(params, function(result, value, key) {
					return result + (!result ? '?' : '&') + key + '=' + value;
				}, '');
			}
			return '/cms/manage/page' + query;
		});
	}
})();
