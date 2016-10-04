(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

// 'items' is injected through state's resolve
ItemDetailController.$inject = ['items']
function ItemDetailController(items) {
  var itemList = this;
  itemList.menu_items = items.menu_items;
  itemList.category_name = items.category.name;
}

})();
