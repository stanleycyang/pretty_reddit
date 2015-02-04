(function(){

	angular
		.module('app')
		.factory('CommentsFactory', CommentsFactory);

	CommentsFactory.$inject = ['Resources'];

	function CommentsFactory(Resources, Post){
		var Comments = function(Post){
			var self = this;


			var CommentsResource = new Resources('comments');

			// Access to all the comments
			self.comments = CommentsResource.query();					
						
			// This create a new comment
			self.create = function(comment, postId, index){
				var commentObj= {body: comment, post_id: postId};

				CommentsResource.save(commentObj, function(data, headers, status){	
					
					// Pushes this into the posts
					Post.posts[index].comments.push(data);			
										
				}).$promise.catch(function(response) {
				    //this will be fired upon error
				    if(response.status !== 201){
				    	console.log('failed');
				    }
				});
			};

			self.destroy = function(comment, index, parentIndex){
				
				var commentObj = {id: comment};
				
				// Remove it from DOM
				Post.posts[parentIndex].comments.splice(index, 1);

				// Delete request
				CommentsResource.delete(commentObj);	
												
			};

		};

		return Comments;
	}

})();