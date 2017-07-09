var app = angular.module('traineeApp')
    .directive('traineeDetails', function() {
        return {
            restrict: "E",
            scope: {
                clients: '=',
                name: '=',
                batch: '=',
                date: '=',

            },
            transclude: true, //add some html in your directive
            templateUrl: 'views/details_temp.html',
            link: function($scope) {
                console.log($scope.clients);
            },
            controller: function($scope) {
                $scope.range = function(num) {
                    return new Array(num);
                }

                //  console.log($scope.clients);
            }
        }
    })
