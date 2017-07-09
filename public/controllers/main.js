angular.module('traineeApp')
  .controller('welcomeController', function ($scope, $timeout, $interval, adminServices) {
    $scope.welcome = "Welcome to Trainee Management System"
    $scope.redirect = "Redicting";

    var redirecting = function () {
      $scope.redirect += "."

    }
    var interval = $interval(redirecting, 500);
    setTimeout(function () {
      adminServices.checkForUserLogin("home", "signin");
      $interval.cancel(interval);
    }, 3000);
  })


  // signin
  .controller('signinController', function ($scope, $location, $state, adminServices) {
    adminServices.checkForUserLogin("home");
    $scope.userInfo = {
      username: "",
      password: ""
    };

    function loginUser() {
      var User = adminServices.loginUser($scope.userInfo);
    };
    $scope.signin = function () {
      loginUser()
    };
  })


  // signup
  .controller('signupController', function ($scope, $element, $timeout, $interval, traineeServices, adminServices) {
    adminServices.checkForUserLogin("signup", "loginWarning");
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    $scope.userInfo = {
      batch: "",
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      client: {
        name: "",
        date: dateTime,
      },
    };
    $scope.batchList = ['java', 'dotnet', 'javascript', 'lamp']
    $scope.clients = ['Barcays', 'JPMC', 'AT&T', 'ADP', 'JEI', 'Comcast', 'Samsung'];
    $scope.reset = function () {
      for (key in $scope.userInfo) {
        $scope.userInfo[key] = "";
      };
    };
    $scope.myDropCallBack = function (event, ui) {
      var obj = ui.draggable.scope();


      if ($scope.userInfo.client.name) {
        $scope.userInfo.client.name += obj.l + "; ";
      } else {
        $scope.userInfo.client.name = obj.l + "; ";
      }
      $("li[name*='" + obj.l + "']").remove();
    };

    $scope.addTraineeMessage = false;
    $scope.addTrainee = function () {

      traineeServices.addTrainee($scope.userInfo).then(function (result) {

        if (result.data.message) {
          $scope.addTraineeMessage = result.data.message;

          $scope.redirect = "Redicting";

          var redirecting = function () {
            $scope.redirect += "."

          }

          var interval = $interval(redirecting, 500);
          setTimeout(function () {
            adminServices.checkForUserLogin("home", "signin");

            $interval.cancel(interval);
          }, 2500);
        }
      });
    };
  })



  // home
  .controller('homeController', function ($scope, $location, adminServices) {
    $scope.admin = JSON.parse(sessionStorage.getItem("admin"));
    adminServices.checkForUserLogin("home", "loginWarning");
    $scope.logout = function () {


      sessionStorage.removeItem("admin");
      sessionStorage.removeItem("trainees");
      // sessionStorage.removeItem("messages");
      $location.path("signin");
    }

  })


  // monitor
  .controller('monitorController', function ($scope, $location, $state, adminServices, traineeServices) {
    adminServices.checkForUserLogin("monitor", "loginWarning");
    $scope.trainees = "";
    traineeServices.getAllTrainees().then(function (result) {

      $scope.trainees = result.data.result;
    });
    $scope.selected = function (trainee) {

      if (trainee) {
        $state.go("monitor_details", {
          username: trainee.username,
          id: trainee._id,
        });
      }
    }
    $scope.back = function () {
      $state.go("home", {
        username: "admin"
      })
    };
    $scope.top = function () {
      $('html,body').scrollTop(0);
    };
  })

  .controller('monitorDetailsController', function ($scope, $location, $state, adminServices, traineeServices) {
    adminServices.checkForUserLogin2();
    $scope.userinfo = {
      clients: "",
      name: "",
      batch: "",
      date: "",

    }

    traineeServices.getTrainee($state.params.id, { id: $state.params.id }).then(function (result) {
      $scope.userinfo.clients = result.data.result[0].client_calls.split(";")
      $scope.userinfo.clients = $scope.userinfo.clients.filter(function (x) { return (x !== (undefined || '' || " ")) });
      $scope.userinfo.len = $scope.userinfo.clients.length;
      $scope.userinfo.name = result.data.result[0].firstname + '  ' + result.data.result[0].lastname;
      $scope.userinfo.batch = result.data.result[0].batch;
      $scope.userinfo.date = result.data.result[0].client_call_date;

    })
  })


  // loginWarning
  .controller('loginWarningController', function ($scope, $location) {
    setTimeout(function () {

      $location.path("home");
    }, 300);

  })

  .controller('topnav_afterController', function ($scope, $location) {
    $scope.logout = function () {

      sessionStorage.removeItem("admin");
      sessionStorage.removeItem("trainees");
      // sessionStorage.removeItem("messages");
      $location.path("signin");
    }
  })
