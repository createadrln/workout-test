angular
    .module('workout')
    .controller("ShowController", function ($scope, $localStorage, supersonic) {
        $scope.showSpinner = true;
        $scope.dataId = undefined;
        $scope.localWorkouts = $localStorage.localWorkouts;
        $scope.localExercises = $localStorage.localExercises;

        supersonic.data.channel('localWorkouts').subscribe( function(localWorkouts) {
            $scope.$apply(function() {
                var exercises = [];
                $scope.localWorkouts = localWorkouts;
                $scope.localWorkout = getIndexOfId(localWorkouts, $scope.dataId);
                angular.forEach($scope.localWorkout.exercises, function (exercise) {
                    var exerciseGroup = getIndexOfId($localStorage.localExercises, exercise.id);
                    exercises.push({ 'order' : exercise.order, 'id' : exerciseGroup.id, 'name' : exerciseGroup.name, 'reps' : exerciseGroup.repgoal, 'weight' : exerciseGroup.weight });
                });
                $scope.exercises = exercises;
            });
        });

        var _refreshViewData = function () {
            var exercises = [];
            $scope.localWorkout = getIndexOfId($localStorage.localWorkouts, $scope.dataId);
            angular.forEach($scope.localWorkout.exercises, function (exercise) {
                var exerciseGroup = getIndexOfId($localStorage.localExercises, exercise.id);
                exercises.push({ 'order' : exercise.order, 'id' : exerciseGroup.id, 'name' : exerciseGroup.name, 'reps' : exerciseGroup.repgoal, 'weight' : exerciseGroup.weight });
            });
            $scope.exercises = exercises;
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

        $scope.remove = function (id) {
            $scope.showSpinner = true;
            $scope.workout.delete().then( function () {
                supersonic.ui.layers.pop();
            });
        };

    });