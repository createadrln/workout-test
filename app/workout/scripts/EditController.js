angular
    .module('workout')
    .controller("EditController", function ($scope, $localStorage, supersonic) {
        $scope.workout = getIndexOfId($localStorage.localWorkouts, steroids.view.params.id);
        $scope.localExercises = null;
        $scope.showSpinner = false;

        $scope.exercise_count = 0;
        $scope.exercise_keys = 0;
        Object.keys($scope.workout.exercises).forEach(function() {
            $scope.exercise_count++;
            $scope.exercise_keys++;
        });

        if ($localStorage.localExercises) {
            $scope.localExercises = $localStorage.localExercises;
            for (var i=0; i<$scope.exercise_count; i++) {
                $scope.workout.exercises['exercise_' + i].name = getIndexOfId($localStorage.localExercises, $scope.workout.exercises['exercise_' + i].id).name;
            }
            $scope.exerciseSelectOptions = [];
            for (var j=0; j<$scope.localExercises.length; j++) {
                $scope.exerciseSelectOptions.push({
                    'id' : $scope.localExercises[j].id,
                    'name' : $scope.localExercises[j].name
                });
            }
            $scope.exerciseSelects = [];
            for (var selects=0; selects<$scope.exercise_count; selects++) {
                $scope.exerciseSelects.push({
                    'option' : $scope.exerciseSelectOptions
                })
            }
        }

        $scope.addExercise = function () {
            $scope.exerciseSelects.push({
                'option' : $scope.exerciseSelectOptions
            });
            $scope.exercise_count ++;
        };

        $scope.removeExercise = function () {
            if ($scope.exercise_count > 1) {
                $scope.exerciseSelects.pop();
                $scope.exercise_count --;
            }
        };

        /* Submit and Update Workout Data */
        $scope.submitForm = function() {
            $scope.showSpinner = true;
            $localStorage.localWorkouts[getIndexOfIdCnt($localStorage.localWorkouts, steroids.view.params.id)] = $scope.workout;
            supersonic.data.channel('localWorkouts').publish($localStorage.localWorkouts);
            supersonic.ui.modal.hide();
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        }

    });
