(function() {
	'use strict';
	// Registration
	angular.module('cms.cache')
		.factory('CacheService', CacheService);
	// Dependency injection
	CacheService.$inject = ['CacheFactory'];
	function CacheService(CacheFactory) {
		var service = {
			init: init,
			get: get,
			remove: remove,
			destroy: destroy,
			info: info
		};
		return service;
		////////////
		// Initializes a cache
		function init (cacheName) {
			var cache = CacheFactory.get(cacheName);
			if(!cache) {
				cache = CacheFactory(cacheName);
			}
			return cache;
		};
		function get(cacheName, key) {
			var cache = CacheFactory.get(cacheName);
			var value;
			if(cache) {
				value = cache.get(key);
			}
			return value;
		};
		function remove(cacheName, key) {
			var cache = CacheFactory.get(cacheName);
			var value;
			if(cache) {
				cache.remove(key);
			}
		};
		// Clear all the cache
		function destroy(cacheName) {
			CacheFactory.destroy(cacheName);
		};
		// Info about the cache
		function info() {
			return CacheFactory.info();
		};
	}
})();
