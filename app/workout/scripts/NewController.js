angular
    .module('workout')
    .controller("NewController", function ($scope, $localStorage, Workout, supersonic) {
        $scope.workout = {};

        if ($localStorage.localWorkouts) {
            if ($localStorage.localWorkouts != 'null') {
                $scope.localWorkouts = $localStorage.localWorkouts;
            } else {
                $scope.localWorkouts = [];
            }
        } else {
            $scope.localWorkouts = [];
        }

        if ($localStorage.localExercises) {
            $scope.localExercises = $localStorage.localExercises;
        } else {
            $scope.localExercises = null;
        }

        $scope.checkedExercises = [];
        var checkedExerciseCnt = 0;
        $scope.toggleCheck = function (exercise) {
            if (getIndexOfIdCnt($scope.checkedExercises, exercise.id) === -1) {
                checkedExerciseCnt++;
                $scope.checkedExercises.push({'id' : exercise.id, 'name' : exercise.name, 'order' : checkedExerciseCnt });
            } else {
                checkedExerciseCnt--;
                $scope.checkedExercises.splice($scope.localExercises.indexOf(exercise.id), 1);
            }
            return checkedExerciseCnt;
        };

        $scope.submitForm = function () {
            $scope.showSpinner = true;
            $scope.localWorkouts.push({ 'id' : generateUUID(), 'title' : $scope.workout.title, 'notes' : $scope.workout.notes, 'tags' : $scope.workout.tags, exercises: $scope.checkedExercises });
            $localStorage.localWorkouts = $scope.localWorkouts;
            supersonic.data.channel('localWorkouts').publish($localStorage.localWorkouts);
            supersonic.ui.modal.hide();
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });