(function(){
	
	angular
		.module('app')
		.factory('PostsFactory', PostsFactory);

	PostsFactory.$inject = ['Resources', '$http'];

	function PostsFactory(Resources, $http){

		var Posts = function(){
			var self = this;

			// Use ngResource for Posts
			var PostResource = new Resources('posts');

			// Get all posts
			self.posts = PostResource.query();

			// Create a post object
			self.post = new PostResource();

			self.create = function(post){
				
				PostResource.save(post, function(data, headers){
					// console.log(data);
					// console.log(headers());	
					self.posts.unshift(data);				
				});		
			};
			

			// Edit a post
			self.update = function(){

			};

			// Delete a post
			self.destroy = function(post, index){
				
				var postObj = {id: post};
				PostResource.delete(post);
				self.posts.splice(index, 1);

			};

			


		};

		return Posts;

	}

})();