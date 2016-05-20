angular
    .module('exercise')
    .controller("EditExerciseStep2Controller", function ($scope, $localStorage, supersonic) {

        $scope.exercise = $localStorage.newExercise;
        
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
                $localStorage.newExercise = $scope.exercise;
                var view = new supersonic.ui.View("exercise#editExerciseStep3");
                supersonic.ui.layers.push(view);
            }
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });