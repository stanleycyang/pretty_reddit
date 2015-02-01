(function(){
	
	angular
		.module('app')
		.factory('PostsFactory', PostsFactory);

	PostsFactory.$inject = ['Resources'];

	function PostsFactory(Resources){

		var Posts = function(){
			var self = this;

			// Use ngResource for Posts
			var PostResource = new Resources('posts');

			// Get all posts
			self.index = PostResource.query();

			// Post
			self.create = function(){

			};

			// Show specific post
			self.show = function(){

			};

			// Edit a post
			self.update = function(){

			};

			// Delete a post
			self.destroy = function(){

			};

			self.isNotZero = function(value) {
				if(value > 0){
					return true;
				}
			};


		};

		return Posts;

	}

})();