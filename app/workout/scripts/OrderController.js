angular
    .module('workout')
    .controller("OrderController", function ($scope, $localStorage, Workout, supersonic) {
        $scope.workout = getIndexOfId($localStorage.localWorkouts, steroids.view.params.id);
        $scope.localExercises = $scope.workout.exercises;

        $scope.showSpinner = false;

        $scope.updateOrder = function (exercises) {
            $scope.exerciseUpdate = exercises;
        };

        $scope.submitForm = function() {
            $scope.showSpinner = true;
            $scope.workout.exercises = $scope.exerciseUpdate;
            $localStorage.localWorkouts[getIndexOfIdCnt($localStorage.localWorkouts, steroids.view.params.id)] = $scope.workout;
            supersonic.data.channel('localWorkouts').publish($localStorage.localWorkouts);
            supersonic.ui.modal.hide();
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        }

    });
