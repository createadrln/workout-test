angular
    .module('workout')
    .controller("ShowController", function ($scope, Workout, supersonic) {
        $scope.workout = null;
        $scope.exercises = null;
        $scope.showSpinner = true;
        $scope.dataId = undefined;

        var _refreshViewData = function () {
            Workout.find($scope.dataId).then(function (workout) {
                var exercises = [];
                var counter = 0;
                angular.forEach(workout.exercises, function (exerciseGroup) {
                    supersonic.data.model('Exercise').find(exerciseGroup.exercise.join()).then(function (exercise) {
                        exercises.push({ 'order' : exerciseGroup.order, 'name' : exercise.name, 'reps' : exercise.repgoal, 'weight' : exercise.weight });
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
        };

        supersonic.ui.views.current.whenVisible( function () {
            if ( $scope.dataId ) {
                _refreshViewData();
            }
        });

        supersonic.ui.views.current.params.onValue( function (values) {
            $scope.dataId = values.id;
            _refreshViewData();
        });

        $scope.remove = function (id) {
            $scope.showSpinner = true;
            $scope.workout.delete().then( function () {
                supersonic.ui.layers.pop();
            });
        };

    });