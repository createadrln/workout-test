angular
    .module('day')
    .controller("EditController", function ($scope, Day, supersonic) {
        $scope.day = null;
        $scope.checkedWorkouts = null;
        $scope.showSpinner = true;

        //Fetch an object based on id from the database
        Day.find(steroids.view.params.id).then( function (day) {
            $scope.$apply(function() {
                $scope.day = day;
                $scope.showSpinner = false;

                supersonic.data.model('Workout').findAll().then( function(workouts) {
                    $scope.$apply( function () {
                        $scope.workouts = workouts;
                        $scope.predicate = '-name';
                    });
                });

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

        $scope.submitForm = function() {
            $scope.showSpinner = true;
            $scope.day.workout = $scope.checkedWorkouts;
            $scope.day.save().then( function () {
                supersonic.ui.modal.hide();
            });
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        }

    });
