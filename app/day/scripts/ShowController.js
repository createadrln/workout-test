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

                var setDayWorkoutIds = ({"id" : day.id, "day" : day.day}),
                    workoutIds = [];

                for (var key in day.workout) {
                    var workout = day.workout[key];
                    workoutIds.push(workout);
                }

                setDayWorkoutIds["workouts"] = workoutIds;
                return setDayWorkoutIds;

            };

            var loadWorkoutInformation = function (setDayWorkoutIds) {

                var setDayWorkoutInfo = ({"id" : setDayWorkoutIds.id, "day" : setDayWorkoutIds.day}),
                    workouts = [];

                for (var i = 0; i < setDayWorkoutIds.workouts.length; i++) {
                    loadWorkoutId(setDayWorkoutIds.workouts[i])
                        .then(function(workout){
                            var exerciseArr = [];
                            angular.forEach(workout.exercise, function(exerciseId) {
                                loadExerciseId(exerciseId)
                                .then(function(exercise) {
                                    exerciseArr.push(getExerciseData(exercise));
                                    return $q.when(exerciseArr);
                                })
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

    });