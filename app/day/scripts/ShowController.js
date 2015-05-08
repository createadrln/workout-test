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

                function loadWorkoutId(workoutId) {
                    return supersonic.data.model('Workout').find(workoutId)
                }

                function getWorkoutData(workout, i) {
                    return {'index' : i, 'title' : workout.title, 'exercises' : workout.exercise};
                }

                for (var i = 0; i < setDayWorkoutIds.workouts.length; i++) {
                    loadWorkoutId(setDayWorkoutIds.workouts[i])
                        .then(function(workout){
                            workouts.push(getWorkoutData(workout));
                            return $q.when(workouts);
                        });
                }

                setDayWorkoutInfo["workouts"] = workouts;
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