angular
    .module('day')
    .controller("ShowController", function ($q, $scope, Day, supersonic) {
        $scope.showSpinner = true;
        $scope.dataId = undefined;

        var _refreshViewData = function () {

            var loadDayInformation = function (dataId) {
                return Day
                    .find(dataId)
                    .then(function (day) {
                        return day;
                    });
            };

            var getWorkoutIds = function (day) {

                var setDayWorkoutIds = ({"day" : day.day}),
                    workoutIds = [];

                for (var key in day.workout) {
                    var workout = day.workout[key];
                    workoutIds.push(workout);
                }

                setDayWorkoutIds["workouts"] = workoutIds;
                return setDayWorkoutIds;

            };

            var loadWorkoutInformation = function (setDayWorkoutIds) {

                var setDayWorkoutInfo = ({"day" : setDayWorkoutIds.day}),
                    workouts = [];

                for (var i = 0; i < setDayWorkoutIds.workouts.length; i++) {
                    loadWorkoutId(setDayWorkoutIds.workouts[i])
                        .then(function(workout){
                            var exerciseArr = [];
                            angular.forEach(workout.exercise, function(exerciseId) {
                                exerciseArr.push(
                                    loadExerciseId(exerciseId)
                                    .then(function(exercise) {
                                        return $q.when({'name' : exercise.name});
                                    })
                                )
                            });

                            workouts.push({'title' : workout.title, 'exercises' : exerciseArr});
                            return $q.when(workouts);
                        });
                }

                setDayWorkoutInfo["workouts"] = workouts;
                return setDayWorkoutInfo;

                function loadWorkoutId(workoutId) {
                    return supersonic.data.model('Workout').find(workoutId)
                }

                function getWorkoutData(workout) {
                    return {'order' : workout.order, 'title' : workout.title, 'exercises' : workout.exercise};
                }

                function loadExerciseId(exerciseId) {
                    return supersonic.data.model('Exercise').find(exerciseId)
                }

                function getExerciseData(exercise) {
                    return {'order' : exercise.order, 'name' : exercise.name, 'reps' : exercise.reps};
                }

            };

            loadDayInformation($scope.dataId)
                .then( getWorkoutIds )
                .then( loadWorkoutInformation )
                .then ( function(day) {
                    $scope.$apply(function () {
                        $scope.day = day;
                        $scope.showSpinner = false;
                    });
                }

            );

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
            $scope.day.delete().then( function () {
                supersonic.ui.layers.pop();
            });
        };

    });