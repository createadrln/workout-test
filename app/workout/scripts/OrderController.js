angular
    .module('workout')
    .controller("OrderController", function ($scope, Workout, supersonic) {
        //$scope.storage = $localStorage;
        $scope.workout = null;
        $scope.exercises = null;
        $scope.showSpinner = true;

        // Fetch an object based on id from the database
        Workout.find(steroids.view.params.id).then( function (workout) {

            var exercises = [];
            var counter = 0;
            angular.forEach(workout.exercises, function (exerciseGroup) {

                supersonic.data.model('Exercise').find(exerciseGroup.exercise.join()).then(function (exercise) {
                    exercises.push({ 'order' : exerciseGroup.order, 'exercise' : exercise.id, 'name' : exercise.name });
                    if (counter == workout.exercises.length) {
                        $scope.$apply(function () {
                            $scope.workout = workout;
                            $scope.exercises = exercises;
                            $scope.showSpinner = false;
                        });
                    }
                });
                counter++;

            });

        });

        $scope.updateOrder = function (exercises) {
            $scope.exerciseUpdate = exercises;
        };

        $scope.submitForm = function() {

            $scope.showSpinner = true;
            $scope.workout.exercises = $scope.exerciseUpdate;
            $scope.workout.save().then( function () {
                supersonic.ui.modal.hide();
            });
        }

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        }

    });
