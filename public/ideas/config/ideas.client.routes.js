angular.module('ideas').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/ideas', {
      templateUrl: 'ideas/views/list-ideas.client.view.html'
    }).when('/ideas/create', {
      templateUrl: 'ideas/views/create-idea.client.view.html'
    }).when('/ideas/:ideaId', {
      templateUrl: 'ideas/views/view-idea.client.view.html'
    }).when('/ideas/:ideaId/edit', {
      templateUrl: 'ideas/views/edit-idea.client.view.html'
    });
  }
]);
