angular
  .module('day')
  .controller("IndexController", function ($scope, Day, supersonic) {
    $scope.days = null;
    $scope.showSpinner = true;

    Day.all().whenChanged( function (days) {
        $scope.$apply( function () {
          $scope.days = days;
          $scope.showSpinner = false;
        });
    });
  });