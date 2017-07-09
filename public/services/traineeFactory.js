angular.module('traineeApp')

.factory("traineeServices",function($http,$state){
  var traineeFactory = {}

  traineeFactory.getAllTrainees = function(){

    return $http.get('/api/getAllTrainees/');
  }

  traineeFactory.getTrainee = function(_id){

    return $http.get('/api/getTrainee/'+_id);
  }

  traineeFactory.addTrainee = function(info){
    return $http.post('/api/saveTrainee', info);
  }



  return traineeFactory;
});
