(function () {
'use strict';
angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.numberMenuItems = 0;
  $scope.checkList = function () {
    if(typeof($scope.lunchMenuList) == 'undefined' || $scope.lunchMenuList.trim() == "") {
      $scope.message = "Please enter data first";
      $scope.msgColor = "red";
      $scope.fieldColor = "has-error"
    } else {
      $scope.msgColor = "green";
      $scope.fieldColor = "has-success"
      if (countMenuItems() <= 3) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
      }
    }
  };

  function countMenuItems() {
    return $scope.lunchMenuList.trim().split(",").length;
  }
}

})();

