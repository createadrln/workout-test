angular
    .module('day')
    .controller("NewController", function ($scope, Day, supersonic) {
        $scope.day = {};

        supersonic.data.model('Workout').findAll().then( function(workouts) {
            $scope.$apply( function () {
                $scope.workouts = workouts;
                $scope.predicate = '-name';
            });
        });

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
            $scope.day.workout = $scope.checkedWorkouts;
            newday = new Day($scope.day);
            newday.save().then( function () {
                supersonic.ui.modal.hide();
            });
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        }

    });