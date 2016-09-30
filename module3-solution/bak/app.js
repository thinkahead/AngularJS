(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'menuList.html'
    scope: {
      menu: '=myMenu',
      onRemove: '&'
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchFor = ""

  var promise = MenuSearchService.getMenuItems();

  promise.then(function (response) {
    menu.items = response.data.menu_items;
    console.log("Received items",menu.items);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  menu.getMatchedMenuItems = function () {
    return MenuSearchService.getMenuForSearchTerm(menu.items,menu.searchFor);
  };

  menu.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMenuItems = function () {
    console.log("Submitting request");
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    console.log("Received response");
    return response;
  };

  var itemsToDisplay = [];

  service.getMenuForSearchTerm = function (items,searchTerm) {
    console.log(items[0]);
    for (var i in items) 
        if (i.description.find(searchTerm)>=0)
            itemsToDisplay.add(i);
    return itemsToDisplay;
  };

  service.removeItem = function (itemIdex) {
    itemsToDisplay.splice(itemIdex, 1);
  };

}

})();
