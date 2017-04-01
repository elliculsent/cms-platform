'use strict';

describe('AuthService', function() {
	var $rootScope;
	var $q;
	var $http;
	var service;
	var ENV = { 
		url: '//url'
	};
	var CacheService;
	var JwtService;

	// On set up
	beforeEach(angular.mock.module('uex', function($provide){
		$provide.constant('ENV', ENV);
	}));

	beforeEach(inject(function(_$rootScope_, _$q_, _$httpBackend_, _CacheService_, _JwtService_, _AuthService_){
		$rootScope = _$rootScope_;
		$q = _$q_;
		$http = _$httpBackend_;
		service = _AuthService_;
		CacheService = _CacheService_;
		JwtService = _JwtService_;
	}));

	// On tear down
	afterEach(function(){});

	it('should instantiate AuthService', function() {
		expect(service).toBeDefined();
	});

	it('logIn(username, password)', function() {
		// Given: 
		var username = 'hansang';
		var password = 'password';
		var url = ENV.url + '/auth/login';
		var mockData = {username: username};
		var response = mockData;
		// var response = {
		// 	data: mockData,
		// 	success: true
		// };
		spyOn(service, 'saveSession').and.callFake(function(data) {
			return data;
		});

		$http.expect('POST', url)
			.respond(response);

		// When: 
		var resolvedData;
		service.logIn(username, password)
		.then(function(data) {
			resolvedData = data;
		});

		$http.flush();

		// Then: 
		expect(resolvedData).toEqual(mockData);
		expect(service.saveSession).toHaveBeenCalledWith(mockData);
	});

	it('logOut()', function() {
		// TODO: Add test case
	});

	it('getSession()', function() {
		// Given: 
		var session = 'session data';
		spyOn(CacheService, 'get').and.returnValue(session);

		// When: 
		var result = service.getSession();

		// Then: 
		expect(session).toEqual(result);
	});

	it('getAccessToken() - isTokenExpired:false', function() {
		// Given: 
		var session = {
			access_token: 'access_token',
			refresh_token: 'refresh_token'
		};
		spyOn(service, 'getSession').and.returnValue(session);
		spyOn(JwtService, 'isTokenExpired').and.returnValue(false);

		// When: 
		var resolvedData;
		service.getAccessToken()
		.then(function(data) {
			resolvedData = data;
		});

		$rootScope.$apply();

		// Then: 
		expect(resolvedData).toEqual(session.access_token);
	});

	it('getAccessToken() - isTokenExpired:true', function() {
		// Given: 
		var newToken = 'new_access_token';
		var session = {
			access_token: 'access_token',
			refresh_token: 'refresh_token'
		};
		spyOn(service, 'getSession').and.returnValue(session);
		spyOn(service, 'refreshAccessToken').and.callFake(function() {
			var dfd = $q.defer();
			dfd.resolve(newToken)
			return dfd.promise;
		});
		spyOn(JwtService, 'isTokenExpired').and.returnValue(true);

		// When: 
		var resolvedData;
		service.getAccessToken()
		.then(function(data) {
			resolvedData = data;
		});

		$rootScope.$apply();

		// Then: 
		expect(resolvedData).toEqual(newToken);
	});

	it('refreshAccessToken()', function() {
		// Given: 
		var session = {
			access_token: 'access_token',
			refresh_token: 'refresh_token'
		};
		spyOn(service, 'getSession').and.returnValue(session);

		var url = ENV.url + '/oauth/access_token';
		var mockData = {
			access_token: 'new_access_token',
			refresh_token: 'refresh_token'
		};
		var response = mockData;
		// var response = {
		// 	data: mockData,
		// 	success: true
		// };
		spyOn(service, 'saveSession').and.callFake(function(data) {
			return data;
		});

		$http.expect('POST', url)
			.respond(response);

		// When: 
		var resolvedData;
		service.refreshAccessToken()
		.then(function(data) {
			resolvedData = data;
		});

		$http.flush();

		// Then: 
		expect(resolvedData).toEqual(mockData.access_token);
		expect(service.saveSession).toHaveBeenCalledWith(mockData);
	});
});