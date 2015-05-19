angular
    .module('workout')
    .controller("EditController", function ($scope, Workout, supersonic) {
        //$scope.storage = $localStorage;
        $scope.workout = null;
        $scope.exercises = null;
        $scope.showSpinner = true;

        // Fetch an object based on id from the database
        Workout.find(steroids.view.params.id).then( function (workout) {

            $scope.$apply(function() {
                $scope.workout = workout;
                $scope.showSpinner = false;

                supersonic.data.model('Exercise').findAll().then( function(exercises) {
                    $scope.$apply( function () {
                        $scope.exercises = exercises;
                        $scope.predicate = '-name';
                    });
                });

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

        $scope.submitForm = function() {
            $scope.showSpinner = true;
            $scope.workout.exercises = $scope.checkedExercises;
            $scope.workout.save().then( function () {
                supersonic.ui.modal.hide();
            });
        }

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        }

    });
