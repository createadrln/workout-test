angular
    .module('day')
    .controller("ShowController", function ($q, $scope, $localStorage, Day, supersonic) {
        $scope.showSpinner = true;
        $scope.dataId = undefined;
        $scope.localDays = $localStorage.localDays;
        $scope.localWorkouts = $localStorage.localWorkouts;
        $scope.localExercises = $localStorage.localExercises;

        var _refreshViewData = function () {

            $scope.day = getIndexOfId($localStorage.localDays, $scope.dataId);

            var getWorkoutIds = function () {
                var setDayWorkoutIds = ({ "id" : $scope.day.id, "day" : $scope.day.day, "brief_description" : $scope.day.brief_description }),
                    workoutIds = [];
                for (var key in $scope.day.workout) {
                    var workout = $scope.day.workout[key];
                    workoutIds.push(workout);
                }
                setDayWorkoutIds["workouts"] = workoutIds;
                return setDayWorkoutIds;
            };

            var loadWorkoutInformation = function () {
                var setDayWorkoutIds = getWorkoutIds(),
                    setDayWorkoutInfo = ({"id" : setDayWorkoutIds.id, "day" : setDayWorkoutIds.day, "brief_description" : setDayWorkoutIds.brief_description }),
                    workouts = [];

                for (var i = 0; i < setDayWorkoutIds.workouts.length; i++) {
                    $scope.localWorkout = loadWorkoutId(setDayWorkoutIds.workouts[i].id);
                    var exerciseArr = [];
                    angular.forEach($scope.localWorkout.exercises, function(exercise) {
                        $scope.localExercise = loadExerciseId(exercise.id);
                        exerciseArr.push(getExerciseData($scope.localExercise, exercise.order));
                    });
                    workouts.push({ 'id' : $scope.localWorkout.id, 'order' : $scope.localWorkout.order, 'title' : $scope.localWorkout.title, 'exercises' : exerciseArr });
                }

                setDayWorkoutInfo["workouts"] = workouts;
                return setDayWorkoutInfo;

                function loadWorkoutId(workoutId) {
                    return getIndexOfId($scope.localWorkouts, workoutId);
                }
                function loadExerciseId(exerciseId) {
                    return getIndexOfId($scope.localExercises, exerciseId);
                }
                function getExerciseData(exercise, order) {
                    return {'order' : order, 'name' : exercise.name, 'reps' : exercise.repgoal, 'weight' : exercise.weight };
                }
            };

            $scope.localDay = loadWorkoutInformation();
            $scope.showSpinner = false;

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

        supersonic.data.channel('localDays').subscribe( function(localDays) {
            $scope.$apply(function() {
                $scope.localDays = localDays;
                _refreshViewData();
            });
        });

    });