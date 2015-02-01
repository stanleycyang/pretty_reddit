(function(){

	angular
		.module('app')
		.controller('maincontroller', maincontroller);

	function maincontroller(){
		
		$("#signup").on('shown.bs.modal', function(){
			$(this).find("[autofocus]:first").focus();
		});		

	}

}).call(this);