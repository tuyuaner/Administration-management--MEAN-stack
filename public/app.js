var studentApp = angular.module('traineeApp', ['ui.router','ngDragDrop','ui.bootstrap']); //empty array is for modules that the current module depends on


//----------------------------ui-router----------------------------------
studentApp.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise("/welcome");
    $stateProvider
      .state('welcome',
        {
          url:"/welcome",
          views:{
            "topnav_before":{
              controller:'signinController',
              templateUrl:'views/nav_beforeLogin.html'
            },
            "content":{
              controller:'welcomeController',
              templateUrl:'views/welcome.html'
            }
          }
      })
      .state('signin',
        {
          url:"/signin",
          views:{
            "topnav_before":{
              controller:'signinController',
              templateUrl:'views/nav_beforeLogin.html'
            },
            "content":{
              controller:'signinController',
              templateUrl:'views/sign_in.html'
            }
          }
        })

      .state('home',
        {
          url:"/home/:username",
          //url:"/home/:username",
          views:{
            "topnav_after":{
              controller:'topnav_afterController',
              templateUrl:'/views/nav_afterLogin.html'
            },
            "content":{
              controller:'homeController',
              templateUrl:"/views/home.html"
            }
          },
          // resolve: {
          //   check : function(userServices){
          //
          //     userServices.checkForUserLogin("home","loginWarning");
          //   }
          // }

        })

    .state('signup',
      {
        url:"/admin/addTrainee",
        views:{
          "topnav_after":{
            controller:'topnav_afterController',
            templateUrl:'/views/nav_afterLogin.html'
          },
          "content":{
            controller:'signupController',
            templateUrl:"/views/sign_up.html"
          }
        }

      })
      .state('monitor',
        {
          url:"/admin/monitoring/:username",
          views:{
            "topnav_after":{
              controller:'topnav_afterController',
              templateUrl:'/views/nav_afterLogin.html'
            },
            "content":{
              controller:'monitorController',
              templateUrl:"/views/monitor.html"
            }
          },
        })

        .state('monitor_details',
          {
            url:"/admin/monitoring/:username/:id",
            views:{
              "topnav_after":{
                controller:'topnav_afterController',
                templateUrl:'/views/nav_afterLogin.html'
              },
              "content":{
                controller:'monitorDetailsController',
                templateUrl:"/views/monitor_details.html"
              }
            },
          })


        .state('loginWarning',
          {
            url:"/loginWarning",
            views:{
              "content":{
                controller:'signinController',
                templateUrl:'/views/sign_in.html'
              },
              "topnav_after":{
                controller:'loginWarningController',
                templateUrl:"/views/loginWarning.html"
              }
            }

          })

}]);
