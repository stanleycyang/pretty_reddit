(function(){
	angular
		.module('app')
		.factory('UsersFactory', UsersFactory);

		UsersFactory.$inject = ['Resources'];

	function UsersFactory(Resources){
		var Users = function(){
			var self = this;

			var UserResource = new Resources('users');

			// This grabs the user
			self.show = UserResource.get();						

			self.destroy = function(userId){
				UserResource.delete({'id': userId});
			};

			self.update = function(user){

				UserResource.update(user);
			};
		};

		return Users;
	}
})();