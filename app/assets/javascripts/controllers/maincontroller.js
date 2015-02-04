// Controller before a person is logged in

(function(){

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['PostsFactory', 'UsersFactory', 'CommentsFactory', 'ipCookie'];

	function MainController(PostsFactory, UsersFactory, CommentsFactory, ipCookie){

		var self = this;

		// Create UserFactory as an object
		self.User = new UsersFactory();

		// Create PostFactory as an object		
		self.Post = new PostsFactory();

		// Create CommentsFactory as an object
		self.Comment = new CommentsFactory(self.Post);

		self.id = ipCookie('id');		
								


	}

})();