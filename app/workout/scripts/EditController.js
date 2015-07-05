angular
    .module('workout')
    .controller("EditController", function ($scope, $localStorage, supersonic) {
        $scope.workout = getIndexOfId($localStorage.localWorkouts, steroids.view.params.id);

        if ($localStorage.localExercises) {
            $scope.localExercises = $localStorage.localExercises;
        } else {
            $scope.localExercises = null;
        }

        $scope.showSpinner = false;

        /* Load Toggled Exercises Into Array */
        $scope.checkedExercises = [];
        var checkedExerciseCnt = 0;

        if ($scope.workout.exercises) {
            angular.forEach($scope.workout.exercises, function(exercise){
                checkedExerciseCnt++;
                $scope.checkedExercises.push({
                    'id': exercise.id,
                    'title': exercise.name,
                    'order': checkedExerciseCnt
                });
            });
        }

        $scope.getIndexOfId = function(array, id) {
            for (var i=0; i<array.length; i++) {
                if (array[i].id==id) return array[i];
            }
            return -1;
        };

        $scope.toggleCheck = function (exercise) {
            if (getIndexOfId($scope.checkedExercises, exercise.id) === -1) {
                checkedExerciseCnt++;
                $scope.checkedExercises.push({
                    'id' : exercise.id,
                    'name' : exercise.name,
                    'order' : checkedExerciseCnt
                });
            } else {
                checkedExerciseCnt--;
                $scope.checkedExercises.splice(getIndexOfIdCnt($scope.checkedExercises, exercise.id),1);
            }
            return checkedExerciseCnt;
        };

        $scope.submitForm = function() {
            $scope.showSpinner = true;
            $scope.workout.exercises = $scope.checkedExercises;
            $localStorage.localWorkouts[getIndexOfIdCnt($localStorage.localWorkouts, steroids.view.params.id)] = $scope.workout;
            supersonic.data.channel('localWorkouts').publish($localStorage.localWorkouts);
            supersonic.ui.modal.hide();
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        }

    });
