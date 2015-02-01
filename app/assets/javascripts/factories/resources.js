(function(){
	angular
		.module('app')
		.factory('Resources', Resources);

		Resources.$inject = ["$resource"];

	function Resources($resource, type){
		
		var Resource = function(type){

			var self = this;
			
			self.service = 
				$resource('/api/' + type + '/:id', {
		        	id: '@id'
		        }, {
		          query: {
		            method: 'GET',
		            isArray: true
		          },
		          update: {
		            method: 'PUT'
		          }
		        });

			

		    return self.service;
		};		

		return Resource;

	}


}).call(this);