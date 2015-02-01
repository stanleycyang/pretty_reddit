(function(){
  
  angular
    .module('app')
    .config(config)
    .run(run);

  function config($routeProvider){
      $routeProvider

      .when('/', {
        title: "preddit: your daily source of awesome",
        templateUrl: "index.html",
        controller: 'maincontroller',
        controllerAs: 'main'
      })

      .when('/login', {
        title: "Login",
        templateUrl: "login.html",
        controller: 'maincontroller',
        controllerAs: 'main'     
      })
      
      .when('/profile/:id', {
        templateUrl: "profile.html"
      })      

      .when('/edit/', {
        templateUrl: "edit.html"
      })            

      .otherwise({
        redirectTo: '/'
      });  
  }

  function run($location, $rootScope){      
      var changeRoute = function(event, current, previous) {        
          return $rootScope.title = current.$$route.title;          
      };
      $rootScope.$on('$routeChangeSuccess', changeRoute);

  }


}).call(this);
