(function () {
'use strict';

angular.module('restaurant')
.service('NewsletterService', NewsletterService);


NewsletterService.$inject = ['$http','ApiPath']
function NewsletterService($http,ApiPath) {
  var service = this;

  service.getItem = function(short_name) {
    var url = ApiPath + "/menu_items/" + short_name + ".json";
    return $http({
        url: url
      });
  };

  service.saveUser = function(user) {
    service.signeduser = user;
    service.signeduser.image = ApiPath+"/images/"+user.short_name+".jpg";
    //console.log("Debug service.signeduser=",service.signeduser);
  };

  service.getUser = function() {
    return service.signeduser;
  };
}

})();
