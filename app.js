(function () {
'use strict';

angular.module('myFirstApp', [])
.controller('MyFirstController',function ($scope) {
  $scope.name="AAK"
  $scope.sayHello = function () {
    return "Hello Coursera"
  }
});

})();
