angular
  .module('log')
  .controller("IndexController", function ($scope, Log, supersonic) {
    $scope.logs = null;
    $scope.showSpinner = true;

    Log.all().whenChanged( function (logs) {
        $scope.$apply( function () {
          $scope.logs = logs;
          $scope.showSpinner = false;
        });
    });
  });