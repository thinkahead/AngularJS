(function () {
'use strict';

angular.module('restaurant')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['NewsletterService'];
function SignUpController(NewsletterService) {
  var signupCtrl = this;

  signupCtrl.$onInit = function () {
    signupCtrl.report = "";
  };

  signupCtrl.submit = function () {
    signupCtrl.report = "";
    NewsletterService.getItem(signupCtrl.user.short_name)
    .success(function (result) {
      NewsletterService.saveUser(signupCtrl.user);
      signupCtrl.report = "Your information has been saved.";
    })
    .error(function (result) {
      signupCtrl.report = "No such menu number exists.";
    });
  };
}

})();
