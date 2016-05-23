angular
    .module('exercise')
    .controller("NewExerciseStep2Controller", function ($scope, $localStorage, supersonic) {

        $scope.exercise = $localStorage.newExercise;
		$scope.exercise.sets = 1;

        $scope.increaseSetQty = function() {
            $scope.exercise.sets++;
        };

        $scope.decreaseSetQty = function() {
            if ($scope.exercise.sets > 1) {
                $scope.exercise.sets--;
            }
        };

        // Form Validate //
        $scope.validate = function () {
            if (!$scope.exercise.reps) {
                alert('Please select rep format');
                return false;
            } else {
                return true;
            }
        };

        $scope.addToExerciseStep2 = function() {
            if ($scope.validate()) {
                var view = new supersonic.ui.View("exercise#newExerciseStep3");
                supersonic.ui.layers.push(view);
            }
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });

