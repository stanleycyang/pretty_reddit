(function(){
	angular
		.module('app')
		.factory('UsersFactory', UsersFactory);

		UsersFactory.$inject = ['Resources'];

	function UsersFactory(Resources){
		var Users = function(){
			var self = this;

			var UserResource = new Resources('users');

			self.show = function(userId){				
				var get = UserResource.get(userId).$promise.then(function(response){
					return response;
				});
				return get;
			};

		
			self.create = function(user){							
				UserResource.save(user);
			};

			self.destroy = function(userId){
				UserResource.delete(userId);
			};

			self.update = function(user){

				UserResource.update(user);
			};
		};

		return Users;
	}
})();