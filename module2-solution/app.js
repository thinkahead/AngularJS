(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  list1=this
  list1.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.switchItem(itemIndex);
  };
  list1.items = ShoppingListCheckOffService.getItemsToBuy();
}


AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var list2 = this;
  list2.items = ShoppingListCheckOffService.getItemsAlreadyBought();
}


function ShoppingListService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [{"name":"cookies","quantity":10},{"name":"buns","quantity":100},{"name":"chips","quantity":3},{"name":"doughnuts","quantity":12},{"name":"milk bottles","quantity":2},{"name":"cereal boxes","quantity":3}],
      itemsAlreadyBought = [];

  service.switchItem = function (itemIdex) {
    itemsAlreadyBought.push(itemsToBuy[itemIdex]);
    itemsToBuy.splice(itemIdex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsAlreadyBought = function () {
    return itemsAlreadyBought;
  };
}

})();
