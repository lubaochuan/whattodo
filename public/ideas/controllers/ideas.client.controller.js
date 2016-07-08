angular.module('ideas').controller('IdeasController', ['$scope',
  '$routeParams', '$location', 'Authentication', 'Ideas',
  function($scope, $routeParams, $location, Authentication, Ideas)
  {
    $scope.authentication = Authentication;
    $scope.create = function() {
      var idea = new Ideas({
        name: this.name,
        desc: this.desc
      });
      idea.$save(function(response) {
        $location.path('ideas/' + response._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    
    $scope.find = function() {
      $scope.ideas = Ideas.query();
    };
    
    $scope.findOne = function() {
      $scope.idea = Ideas.get({ideaId: $routeParams.ideaId});
    };
    
    $scope.update = function() {
      $scope.idea.$update(function() {
        $location.path('ideas/' + $scope.idea._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    
    $scope.delete = function(idea) {
      if (idea) {
        idea.$remove(function() {
          for (var i in $scope.ideas) {
            if ($scope.ideas[i] === idea) {
              $scope.ideas.splice(i, 1);
            }
          }
        });
      } else {
        $scope.idea.$remove(function() {
          $location.path('ideas');
        });
      }
    };
  }
]);