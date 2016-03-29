angular
    .module('exercise')
    .controller("NewExerciseStep2Controller", function ($scope, $localStorage, supersonic) {

        $scope.exercise = $localStorage.newExercise;
		$scope.exercise.sets = 1;
        $scope.exercise.reps_message = null;

        $scope.increaseSetQty = function() {
    		$scope.exercise.sets++;
        };

        $scope.decreaseSetQty = function() {
    		$scope.exercise.sets--;
        };

        $scope.updateRepMessage = function() {
            if ($scope.exercise.reps == 'fixed') {
                $scope.exercise.reps = 'fixed';
                $scope.exercise.reps_message = 'Your reps are the same throughout the set!'
            } else if ($scope.exercise.reps == 'range') {
                $scope.exercise.reps = 'range';
                $scope.exercise.reps_message = 'Your reps are in a range!'
            } else if ($scope.exercise.reps == 'series') {
                $scope.exercise.reps = 'series';
                $scope.exercise.reps_message = 'Your reps are in a series!'
            } else {
                $scope.exercise.reps_message = 'There is a problem with your selection!'
            }
        };

        $scope.addToExerciseStep2 = function() {
            var view = new supersonic.ui.View("exercise#newExerciseStep3");
            supersonic.ui.layers.push(view);
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });

