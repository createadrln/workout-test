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
                    var exerciseGroup = getIndexOfId($scope.localExercises, exercise.id);
                    if (exerciseGroup.reps == 'fixed') {
                        exercises.push({
                            'id' : exerciseGroup.id,
                            'name' : exerciseGroup.name,
                            'technique' : exerciseGroup.technique,
                            'reps' : 'fixed',
                            'sets' : exerciseGroup.sets,
                            'reps_fixed' : exerciseGroup.reps_fixed,
                            'reps_fixed_weight' : exerciseGroup.reps_fixed_weight,
                            'weight_unit' : exerciseGroup.weight_unit
                        });
                    }
                    if (exerciseGroup.reps == 'series') {
                        exercises.push({
                            'id' : exerciseGroup.id,
                            'name' : exerciseGroup.name,
                            'technique' : exerciseGroup.technique,
                            'reps' : 'series',
                            'set_count' : exerciseGroup.set_count,
                            'reps_series' : exerciseGroup.reps_series,
                            'weight_unit' : exerciseGroup.weight_unit
                        });
                    }
                });
                $scope.exercises = exercises;
            });
        });

        supersonic.data.channel('localExercises').subscribe( function(localExercises) {
            $scope.$apply(function() {
                var exercises = [];
                angular.forEach($scope.localWorkout.exercises, function (exercise) {
                    var exerciseGroup = getIndexOfId(localExercises, exercise.id);
                    if (exerciseGroup.reps == 'fixed') {
                        exercises.push({
                            'id' : exerciseGroup.id,
                            'name' : exerciseGroup.name,
                            'technique' : exerciseGroup.technique,
                            'reps' : 'fixed',
                            'sets' : exerciseGroup.sets,
                            'reps_fixed' : exerciseGroup.reps_fixed,
                            'reps_fixed_weight' : exerciseGroup.reps_fixed_weight,
                            'weight_unit' : exerciseGroup.weight_unit
                        });
                    }
                    if (exerciseGroup.reps == 'series') {
                        exercises.push({
                            'id' : exerciseGroup.id,
                            'name' : exerciseGroup.name,
                            'technique' : exerciseGroup.technique,
                            'reps' : 'series',
                            'sets' : exerciseGroup.sets,
                            'reps_series' : exerciseGroup.reps_series,
                            'weight_unit' : exerciseGroup.weight_unit
                        });
                    }
                });
                $scope.exercises = exercises;
            });
        });

        var _refreshViewData = function () {
            var exercises = [];
            $scope.localWorkout = getIndexOfId($localStorage.localWorkouts, $scope.dataId);
            angular.forEach($scope.localWorkout.exercises, function (exercise) {
                var exerciseGroup = getIndexOfId($localStorage.localExercises, exercise.id);
                if (exerciseGroup.reps == 'fixed') {
                    exercises.push({
                        'id' : exerciseGroup.id,
                        'name' : exerciseGroup.name,
                        'technique' : exerciseGroup.technique,
                        'reps' : 'fixed',
                        'sets' : exerciseGroup.sets,
                        'reps_fixed' : exerciseGroup.reps_fixed,
                        'reps_fixed_weight' : exerciseGroup.reps_fixed_weight,
                        'max_weight' : exerciseGroup.max_weight,
                        'weight_unit' : exerciseGroup.weight_unit
                    });
                }
                if (exerciseGroup.reps == 'series') {
                    exercises.push({
                        'id' : exerciseGroup.id,
                        'name' : exerciseGroup.name,
                        'technique' : exerciseGroup.technique,
                        'reps' : 'series',
                        'sets' : exerciseGroup.sets,
                        'reps_series' : exerciseGroup.reps_series,
                        'max_weight' : exerciseGroup.max_weight,
                        'weight_unit' : exerciseGroup.weight_unit
                    });
                }
            });
            $scope.exercises = exercises;
            $scope.showSpinner = false;
        };

        removeBtn = new supersonic.ui.NavigationBarButton({
            title: 'Remove',
            onTap: function() {
                removeWorkout();
            },
            styleId: 'remove'
        });

        supersonic.ui.navigationBar.update({
            title: '',
            buttons: {
                right: [removeBtn]
            }
        }).then(supersonic.ui.navigationBar.show());

        // Iterate From Array //
        $scope.getCount = function(num) {
            return new Array(num);
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

        function removeWorkout() {
            var index = getIndexOfIdCnt($localStorage.localWorkouts, $scope.dataId);
            $scope.localWorkouts.splice(index, 1);
            $localStorage.localWorkouts = $scope.localWorkouts;
            supersonic.data.channel('localWorkouts').publish($localStorage.localWorkouts);
            supersonic.ui.layers.pop();
        }
        
    });