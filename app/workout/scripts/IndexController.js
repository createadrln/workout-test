angular
    .module('workout')
    .controller("IndexController", function ($scope, Workout, supersonic) {
        $scope.workouts = null;
        $scope.showSpinner = true;

        Workout.all().whenChanged( function (workouts) {
            $scope.$apply( function () {
                $scope.workouts = workouts;
                $scope.showSpinner = false;
            });
        });
    });