(function(){

	angular
		.module('app')
		.factory('CommentsFactory', CommentsFactory);

	CommentsFactory.$inject = ['Resources'];

	function CommentsFactory(Resources){
		var Comments = function(){
			var self = this;

			var CommentsResource = new Resources('comments');

			// Access to all the comments
			self.comments = CommentsResource.query();

			// Comment object
			self.comment = new CommentsResource();

			// Get a specific comment
			// self.get = CommentsResource.get({id: 1});				
						
			// This create a new comment
			self.create = function(comment){
				// self.comment.$save();
				// self.index.push(self.comment);
				// self.comment = new CommentsResource();
				alert(comment);
			};

			self.update = function(){

			};

			self.destroy = function(post){
				CommentsResource.delete(post);
				_.remove(self.index, post);
			};

		};

		return Comments;
	}

})();