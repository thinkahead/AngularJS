(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

// 'items' is injected through state's resolve
ItemDetailController.$inject = ['items']
function ItemDetailController(items) {
  var itemDetail = this;
  itemDetail.menu_items = items.menu_items;
  itemDetail.category_name = items.category.name;
}

})();
