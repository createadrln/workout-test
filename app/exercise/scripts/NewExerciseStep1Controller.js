angular
    .module('exercise')
    .controller("NewExerciseStep1Controller", function ($scope, $localStorage, supersonic) {
        $scope.exercise = {};
        $scope.exercise.id = generateUUID();

        if (!$localStorage.localExercises) {
            $localStorage.localExercises = [];
        }

        $localStorage.newExercise = null;

        $scope.addToExerciseStep1 = function() {
            $localStorage.newExercise = $scope.exercise;
            var view = new supersonic.ui.View("exercise#newExerciseStep2");
            supersonic.ui.layers.push(view);
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });

