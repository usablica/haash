var haashApp = angular.module("HaashApp", ['ngRoute']);

haashApp.run(function ($rootScope, $location) {
  $rootScope.location = $location;
});

haashApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {templateUrl: "/static/views/index.html", controller: "HomeController"})
    .when("/:id/:key*", {templateUrl: "/static/views/show.html", controller: "ShowController"})
  .otherwise("/404", {templateUrl: "/static/views/404.html"});

  $locationProvider.html5Mode(true);
}]);

/**
 * Home Controller
 * To encrypt a text
 */
haashApp.controller("HomeController", function ($scope, $http) {
  $scope.encrypt = function () {
    if ($scope.text != null) {
      $scope.loading = true;

      progressJs().start().autoIncrease(3,500);

      var req = {
        method: 'POST',
        url: '/api/encrypt',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $.param({
          text: $scope.text
        })
      };

      $http(req).then(function (obj) {
        $scope.result = {
          success: true,
          key: encodeURIComponent(obj.data.key),
          id: obj.data.id
        };

        $scope.text = null;
        progressJs().end();
        $scope.loading = false;
      }, function() {
        $scope.text = null;
        progressJs().end();
        $scope.loading = false;
      });
    }
  };

});

/**
 * Show Controller
 * To decrypt a cipher
 */
haashApp.controller("ShowController", function ($scope, $http, $routeParams, $location) {
  var key = $routeParams.key;
  var id = $routeParams.id;

  if (!id || !key) $location.path('/');

  progressJs().start().autoIncrease(3,500);

  var req = {
    method: 'GET',
    url: '/api/decrypt/' + id + '/' + key
  };

  $http(req).then(function (obj) {
    $scope.result = {
      success: true,
      text: obj.data.text
    };

    progressJs().end();
    $scope.loading = false;
  }, function() {
    progressJs().end();
    $scope.loading = false;
  });
});
