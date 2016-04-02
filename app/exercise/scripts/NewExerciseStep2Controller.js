angular
    .module('exercise')
    .controller("NewExerciseStep2Controller", function ($scope, $localStorage, supersonic) {

        $scope.exercise = $localStorage.newExercise;
		$scope.exercise.sets = 1;

        $scope.increaseSetQty = function() {
    		$scope.exercise.sets++;
        };

        $scope.decreaseSetQty = function() {
    		$scope.exercise.sets--;
        };

        $scope.addToExerciseStep2 = function() {
            var view = new supersonic.ui.View("exercise#newExerciseStep3");
            supersonic.ui.layers.push(view);
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });

