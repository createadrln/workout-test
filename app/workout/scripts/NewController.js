angular
    .module('workout')
    .controller("NewController", function ($scope, Workout, supersonic) {
        $scope.workout = {};

        supersonic.data.model('Exercise').findAll().then( function(exercises) {
            $scope.$apply( function () {
                $scope.exercises = exercises;
            });
        });

        $scope.checkedExercises = [];

        $scope.toggleCheck = function (exercise) {
            if ($scope.checkedExercises.indexOf(exercise.id) === -1) {
                $scope.checkedExercises.push({'exercise' : [exercise.id], 'order' : '0'});
            } else {
                $scope.checkedExercises.splice($scope.checkedExercises.indexOf(exercise.id), 1);
            }
        };

        $scope.submitForm = function () {
            $scope.showSpinner = true;
            $scope.workout.exercises = $scope.checkedExercises;
            newworkout = new Workout($scope.workout);
            newworkout.save().then( function () {
                supersonic.ui.modal.hide();
            });
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        }

    });