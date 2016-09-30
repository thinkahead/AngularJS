(function () {
'use strict';

angular.module('NarrowItDownController', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.factory('NarrowItDownFactory', NarrowItDownFactory)
.directive('foundItems', NarrowItDownDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")

function NarrowItDownDirective() {
  var ddo = {
    templateUrl: 'menuList.html',
    scope: {
      items: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: NarrowItDownDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function NarrowItDownDirectiveController() {
  var list = this;

  list.error = function () {
    return false;
  };
}


NarrowItDownController.$inject = ['NarrowItDownFactory','MenuSearchService'];
function NarrowItDownController(NarrowItDownFactory,MenuSearchService) {
  var list = this;

  // Use factory to create new shopping list service
  var menuList = NarrowItDownFactory();

  list.items = menuList.getItems();
  var origTitle = "Menu List";
  list.searchTerm = "";
  list.title = origTitle + " Search:" + list.searchTerm + " ("+ list.items.length + " items)";

  list.addItem = function () {
    var promise = MenuSearchService.getMenuItems();
    this.lastRemoved = ""
    promise.then(function (response) {
      menuList.clear();
      var tempitems = response.data.menu_items;
      console.log("Received items",tempitems);
    
      tempitems.forEach( function(tempitem) { 
         //console.log(tempitem.name+", "+tempitem.short_name+", "+tempitem.description); //console.log(tempitem);
         if (list.searchTerm!="")
             if (tempitem.name.toLowerCase().indexOf(list.searchTerm.toLowerCase())>=0 || tempitem.short_name.toLowerCase().indexOf(list.searchTerm.toLowerCase())>=0 || tempitem.description.toLowerCase().indexOf(list.searchTerm.toLowerCase())>=0)
                 menuList.addItem(tempitem.name+", "+tempitem.short_name+", "+tempitem.description); 
         list.items = menuList.getItems();
         list.title = origTitle + " Search: " + list.searchTerm + " ("+ list.items.length + " items)";
      });
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }

  list.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
    menuList.removeItem(itemIndex);
    list.title = origTitle + " Search: " + list.searchTerm + " modified ("+ list.items.length + " items)";
  };

  //list.addItem();

}


// If not specified, maxItems assumed unlimited
function NarrowItDownService(maxItems) {
  var service = this;

  // List of menu items
  var items = [];

  service.addItem = function (searchTerm) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: searchTerm
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.clear = function () {
    items.splice(0,items.length);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


function NarrowItDownFactory() {
  var factory = function (maxItems) {
    return new NarrowItDownService(maxItems);
  };

  return factory;
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
}



})();
