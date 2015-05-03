angular
  .module('exercise')
  .controller("IndexController", function ($scope, Exercise, supersonic) {
    $scope.exercises = null;
    $scope.showSpinner = true;

    Exercise.all().whenChanged( function (exercises) {
        $scope.$apply( function () {
          $scope.exercises = exercises;
          $scope.showSpinner = false;
        });
    });
  });