(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.dishes = "";
  $scope.message = "";

  $scope.checkIfTooMuch = function () {
    $scope.message=calculateIfTooMuch($scope.dishes);
  };

  function calculateIfTooMuch(string) {
    string = string.trim();
    if (string==="")
      return "Please enter data first";
    //console.log(string.match(/,/g));
    var count = (string.match(/,/g) || []).length;
    return count<=2?"Enjoy!":"Too much!"
  }

};


})();
