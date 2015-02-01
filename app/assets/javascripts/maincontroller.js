// Controller before a person is logged in

(function(){

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['PostsFactory', 'UsersFactory', 'CommentsFactory'];

	function MainController(PostsFactory, UsersFactory, CommentsFactory){

		var self = this;

		// Create UserFactory as an object
		self.User = new UsersFactory();

		// Create PostFactory as an object		
		self.Post = new PostsFactory();

		// Create CommentsFactory as an object
		self.Comment = new CommentsFactory();

		// console.log(self.User.show({id: 1}));
								


	}

})();