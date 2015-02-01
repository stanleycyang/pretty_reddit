(function(){

	angular
		.module('app')
		.factory('CommentsFactory', CommentsFactory);

	CommentsFactory.$inject = ['Resources'];

	function CommentsFactory(Resources){
		var Comments = function(){
			var self = this;

			var CommentsResource = new Resources('posts');
			

			self.create = function(){

			};

			self.update = function(){

			};

			self.destroy = function(){

			};

		};

		return Comments;
	}

})();