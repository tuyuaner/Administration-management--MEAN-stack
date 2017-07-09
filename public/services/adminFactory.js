angular.module('traineeApp')
.factory("adminServices",function($state){

  factory = {}

  factory.loginUser = function(info){
    if (info.username === "admin" && info.password === "admin"){
      sessionStorage.setItem("admin",JSON.stringify(info));
      $state.go("home",{
              username: info.username
            });
    }else{
      $state.go("signin");
    }
  }

  factory.checkForUserLogin = function(state, elState=""){
    var user =JSON.parse(sessionStorage.getItem("admin"));
    console.log("check user logged in service ", user);
    if (user){
      $state.go(state,{
              username: user.username
            });
    }else if (elState != ""){
        $state.go(elState);
      }
  };

  factory.checkForUserLogin2 = function(){
    var user =JSON.parse(sessionStorage.getItem("admin"));
    console.log("check user logged in service ", user);
    if (!user){
      $state.go("loginWarning",{

            });

    };
  }


  return factory;




})
