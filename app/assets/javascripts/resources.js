(function(){
	angular
		.module("app")
		.factory("Resources", Resources);

	Resources.$inject = ['$resource'];

	// Define the Resource factory
	function Resources($resource){

		var Resource = function($resource){
			var self = this;

			self.service = $resource('/api/' + type + '/:id', {
	        	id: '@id'
	        }, {
	          query: {
	            method: 'GET',
	            isArray: false
	          },
	          update: {
	            method: 'PUT'
	          }
	        });
		};

		return Resource;
	}


}).call(this);