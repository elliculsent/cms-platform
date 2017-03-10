
(function() {
	'use strict';

	// Registration
	angular.module('uex')
		.config(Route);

	function Route($stateProvider, $urlRouterProvider) {
		$stateProvider

		/* Base template */
		.state('uex', {
			url: '/uex',
			abstract: true,
			templateUrl: 'templateCache/layout/main.html',
			controller: 'SideMenuController',
			controllerAs: 'vm',
			onEnter: ['AuthService', function(AuthService){
				AuthService.alertVerified();
			}]
		})

		/* Password module */
		.state('uex.password', {
			url: '/password',
			data: {
				access: 'public',
				from: null,
				blocked: false
			},
			params: {force: null},
			abstract: true
		})

		.state('uex.password.change', {
			url: '/change',
			views: {
				'content@uex': {
					templateUrl: 'templateCache/features/password/change-password/change-password.html',
					controller: 'ChangePasswordController',
					controllerAs: 'vm'
				}
			}
		})

		.state('uex.password.forgot', {
			url: '/forgot',
			views: {
				'content@uex': {
					templateUrl: 'templateCache/features/password/forgot-password/forgot-password.html',
					controller: 'ForgotPasswordController',
					controllerAs: 'vm'
				}
			}
		})

		/* Policy module */
		.state('uex.policy', {
			url: '/policy',
			abstract: true
		})

		.state('uex.policy.customise', {
			url: '/customise',
			data: {
				access: 'public',
				from: null,
				blocked: false
			},
			params: {force: null},
			views: {
				'content@uex': {
					templateUrl: 'templateCache/features/policy/customisation/customisation.html',
					controller: 'PolicyCustomisationController',
					controllerAs: 'vm'
				}
			},
			resolve: {
				shared: ['PolicyService', function(PolicyService) {
					var id = PolicyService.getSharedId();
					if(id) {
						return PolicyService.get(id);
					}
					return null;
				}],
				product: ['ProductService', 'PolicyService', 'shared', function(ProductService, PolicyService, shared) {
					var code = 'AXA';
					// Shared real policy
					if(shared && shared.id) {
						code = shared.productCode;
					}
					return ProductService.load(code);
				}],
				presets: ['PolicyService', 'product', function(PolicyService, product) {
					var code = product ? product.code : 'AXA';
					return PolicyService.loadPresets(code);
				}],
				pricingEngine: ['PricingService', 'product', function(PricingService, product) {
					var code = product ? product.code : 'AXA';
					return PricingService.loadEngine(code);
				}],
				coverageEngine: ['PolicyService', 'product', function(PolicyService, product) {
					var code = product ? product.code : 'AXA';
					return PolicyService.loadCoverageEngine(code);
				}],
				externalUserParams: ['PolicyService', function(PolicyService) {
					var data = PolicyService.getExternalParams();  
					return data;
				}]
			}
		})

		.state('uex.policy.form', {
			url: '/form',
			data: {
				access: 'auth',
				from: ['uex.policy.customise', 'uex.policy.tnc'],
				blocked: true
			},
			params: {force: null},
			views: {
				'content@uex': {
					templateUrl: 'templateCache/features/policy/form/form.html',
					controller: 'PolicyFormController',
					controllerAs: 'vm'
				}
			}
		})

		.state('uex.policy.tnc', {
			url: '/tnc',
			data: {
				access: 'auth',
				from: ['uex.policy.form', 'uex.policy.payment', 'uex.policy.review'],
				blocked: true
			},
			params: {force: null},
			views: {
				'content@uex': {
					templateUrl: 'templateCache/features/policy/tnc/tnc.html',
					controller: 'PolicyTncController',
					controllerAs: 'vm'
				}
			},
			resolve: {
				isReview: ['PolicyService', 'ValidationService', function(PolicyService, ValidationService) {
					return ValidationService.isReview(PolicyService.getPlayground());
				}]
			}
		})

		.state('uex.policy.review', {
			url: '/review',
			data: {
				access: 'auth',
				from: ['uex.policy.tnc'],
				blocked: true
			},
			params: {force: null},
			views: {
				'content@uex': {
					templateUrl: 'templateCache/features/policy/review/review.html',
					controller: 'PolicyReviewController',
					controllerAs: 'vm'
				}
			}
		})

		.state('uex.policy.payment', {
			url: '/payment',
			data: {
				access: 'auth',
				from: ['uex.policy.tnc', 'uex.policy.mine', 'uex.policy.summary'],
				blocked: true
			},
			params: {force: null, autoPay: null},
			views: {
				'content@uex': {
					templateUrl: 'templateCache/features/policy/payment/payment.html',
					controller: 'PolicyPaymentController',
					controllerAs: 'vm'
				}
			},
			resolve: {
				userPolicy: ['PolicyService', function(PolicyService) {
					return PolicyService.mine();
				}]
			}
		})

		.state('uex.policy.summary', {
			url: '/summary',
			data: {
				access: 'auth',
				from: null,
				blocked: false
			},
			params: {force: null},
			views: {
				'content@uex': {
					templateUrl: 'templateCache/features/policy/summary/summary.html',
					controller: 'PolicySummaryController',
					controllerAs: 'vm'
				}
			},
			resolve: {
				userPolicy: ['PolicyService', function(PolicyService) {
					return PolicyService.mine();
				}]
			}
		})

		.state('uex.policy.card', {
			url: '/card',
			data: {
				access: 'auth',
				from: null,
				blocked: false
			},
			params: {force: null},
			views: {
				'content@uex': {
					templateUrl: 'templateCache/features/policy/card/card.html',
					controller: 'PolicyCardController',
					controllerAs: 'vm'
				}
			},
			resolve: {
				userPolicy: ['PolicyService', function(PolicyService) {
					return PolicyService.mine();
				}],
				product: ['ProductService', function(ProductService) {
					var code = 'AXA';
					return ProductService.load(code);
				}]
			}
			
		})

		.state('uex.policy.ty', {
			url: '/ty',
			data: {
				access: 'auth',
				from: ['uex.policy.tnc', 'uex.policy.mine', 'uex.policy.payment'],
				blocked: true
			},
			params: {force: null},
			views: {
				'content@uex': {
					templateUrl: 'templateCache/features/policy/summary/summary.html',
					controller: 'PolicySummaryController',
					controllerAs: 'vm'
				}
			},
			resolve: {
				userPolicy: ['PolicyService', function(PolicyService) {
					return PolicyService.mine();
				}]
			}
		})

		.state('uex.policy.mine', {
			url: '/mine',
			data: {
				access: 'auth',
				from: null,
				blocked: false
			},
			params: {force: null},
			views: {
				'content@uex': {
					templateUrl: 'templateCache/features/policy/my-policy/my-policy.html',
					controller: 'PolicyMineController',
					controllerAs: 'vm'
				}
			},
			resolve: {
				userPolicy: ['PolicyService', function(PolicyService) {
					return PolicyService.mine();
				}],
				product: ['ProductService', 'PolicyService', function(ProductService, PolicyService) {
					var code = 'AXA';
					return ProductService.load(code);
				}],
				coverageEngine: ['PolicyService', 'product', function(PolicyService, product) {
					var code = product ? product.code : 'AXA';
					return PolicyService.loadCoverageEngine(code);
				}]
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
			return '/uex/policy/customise' + query;
		});
	}
})();
