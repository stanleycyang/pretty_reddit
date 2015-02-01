(function(){
  
  angular
    .module('app')
    .config(config)
    .run(run);

  function config($routeProvider, $locationProvider){
      
      // Get rid of hash in our url
      $locationProvider.html5Mode({enabled:true, requireBase:true});

      // Define our routes
      $routeProvider

      .when('/', {
        title: "preddit: your daily source of awesome",
        templateUrl: "index.html",
        controller: 'MainController',
        controllerAs: 'main'
      })

      .when('/login', {
        title: "Login",
        templateUrl: "login.html",
        controller: 'MainController',
        controllerAs: 'main'     
      })
      
      .when('/post/:id', {
        templateUrl: "post.html"
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
