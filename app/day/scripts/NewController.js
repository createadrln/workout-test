angular
    .module('day')
    .controller("NewController", function ($scope, supersonic) {
        $scope.day = {};

        $scope.checkedWorkouts = [];

        $scope.toggleCheck = function (workout) {
            if ($scope.checkedWorkouts.indexOf(workout.id) === -1) {
                $scope.checkedWorkouts.push(workout.id);
            } else {
                $scope.checkedWorkouts.splice($scope.checkedWorkouts.indexOf(workout.id), 1);
            }
        };

        $scope.submitForm = function () {
            $scope.showSpinner = true;
            $scope.day.workouts = $scope.checkedWorkouts;
            var newDay = new Day($scope.day);
            newDay.save().then( function () {
                supersonic.ui.modal.hide();
            });
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        }

    });