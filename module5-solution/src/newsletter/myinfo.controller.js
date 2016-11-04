(function () {
'use strict';

angular.module('restaurant')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['NewsletterService'];
function MyInfoController(NewsletterService) {
  var myinfoCtrl = this;

  myinfoCtrl.$onInit = function () {
    myinfoCtrl.user = NewsletterService.getUser();
    if (myinfoCtrl.user) {
      NewsletterService.getItem(myinfoCtrl.user.short_name)
      .success(function (result) {
         myinfoCtrl.item = result;
         //console.log("Debug",result);
      })
      .error(function (result) {
      });
    }
  };
}

})();
