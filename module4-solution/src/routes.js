(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/categories/templates/home.template.html'
  })

  // Categories page
  .state('mainList', {
    url: '/main-list',
    templateUrl: 'src/categories/templates/main-categories.template.html',
    controller: 'MenuCategoriesController as mainList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
              console.log("Retrieving all categories");
              return MenuDataService.getAllCategories()
                .then(function (categories) {
                  console.log("Retrieved",categories.data);
                  return categories.data;
                });
            }]

    }
  })

  // Menu Items page
  .state('itemList', {
    url: '/item-list/{itemId}',
    templateUrl: 'src/items/templates/main-items.template.html',
    controller: 'ItemDetailController as itemList',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              console.log("Retrieving menu items for category short name",$stateParams.itemId);
              return MenuDataService.getItemsForCategory($stateParams.itemId)
                .then(function (items) {
                  console.log("Retrieved",items.data);
                  return items.data;
                });
            }]
    }
  });
}

})();
