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
				
				PostResource.save(post, function(data, headers, status){	
					// take post from array								
					self.posts.unshift(data);							
					// Clear the modal form
					post.link = '';
					post.title = '';		
					// Close the modal
					$('#post-link').modal('toggle');
				}).$promise.catch(function(response) {
				    //this will be fired upon error
				    if(response.status !== 201){
				    	self.postError = true;
				    }
				});
			};
			

			// Delete a post
			self.destroy = function(post, index){
				
				var postObj = {id: post};
				PostResource.delete(postObj);

				self.posts.splice(index, 1);

			};		
		};

		return Posts;

	}

})();