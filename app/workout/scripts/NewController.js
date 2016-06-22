angular
    .module('workout')
    .controller("NewController", function ($scope, $localStorage, supersonic) {
        $scope.workout = {};
        $scope.workout.id = generateUUID();
        $scope.localExercises = null;
        $scope.exercise_count = 1;
        $scope.exercise_keys = 0;
        $scope.workout.featured = false;

        if (!$localStorage.localWorkouts) {
            $localStorage.localWorkouts = [];
        }

        if ($localStorage.localExercises) {
            $scope.localExercises = $localStorage.localExercises;
            $scope.exerciseSelectOptions = [];
            for (var i=0; i<$scope.localExercises.length; i++) {
                $scope.exerciseSelectOptions.push({
                    'id' : $scope.localExercises[i].id,
                    'name' : $scope.localExercises[i].name,
                    'tags' : $scope.localExercises[i].tags
                });
            }
            $scope.exerciseSelects = [];
            for (var selects = 0; selects < $scope.exercise_count; selects++) {
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

        // Form Validate //
        $scope.validate = function () {
            return true;
        };

        // Form Submit //
        $scope.submitForm = function() {
            if ($scope.validate()) {
                $scope.showSpinner = true;
                $localStorage.localWorkouts.push($scope.workout);
                supersonic.data.channel('localWorkouts').publish($localStorage.localWorkouts);
                if (steroids.view.params.location == 'onboarding') {
                    alert($scope.exercise.location);
                    var workoutView = new supersonic.ui.View('workout#index');
                    supersonic.ui.layers.push(workoutView);
                } else {
                    supersonic.ui.modal.hide();
                }
            }
        };

        $scope.cancel = function () {
            var workoutView = new supersonic.ui.View("workout#index");
            supersonic.ui.layers.push(workoutView);
        };

    });