angular
    .module('day')
    .controller("ShowController", function ($scope, Day, supersonic) {
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
                    workoutLen = setDayWorkoutIds.workouts.length,
                    workouts = [];

                for (var key in setDayWorkoutIds.workouts) {
                    var updateWorkouts = function(key) {
                        if (key <= workoutLen) {
                            return supersonic.data.model('Workout')
                                .find(setDayWorkoutIds.workouts[key])
                                .then(function (workout) {
                                    alert(key);
                                    var workoutInfo = ({"key": key, "title": workout.title, "exercise": workout.exercise});
                                    workouts.push(workoutInfo);
                                });
                        }
                    }(key)
                }

                updateWorkouts();

                //if (key == setDayWorkoutIds.workout.length - 1) {
                //    setDayWorkoutInfo["workouts"] = workouts;
                //    return setDayWorkoutInfo;
                //}

                //angular.forEach(setDayWorkoutIds.workouts, function(workout, key) {
                //    supersonic.data.model('Workout')
                //        .find(setDayWorkoutIds.workouts[key])
                //        .then(function (workout) {
                //            var workoutInfo = ({"title": workout.title, "exercise": workout.exercise});
                //            workouts.push(workoutInfo);
                //        });
                //});

                setDayWorkoutInfo["workouts"] = updateWorkouts;
                return setDayWorkoutInfo;

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