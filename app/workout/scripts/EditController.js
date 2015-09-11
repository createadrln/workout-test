angular
    .module('workout')
    .controller("EditController", function ($scope, $localStorage, supersonic) {
        $scope.workout = getIndexOfId($localStorage.localWorkouts, steroids.view.params.id);

        /* Get Local Storage Object */
        if ($localStorage.localExercises) {
            $scope.localExercises = $localStorage.localExercises;
        } else {
            $scope.localExercises = null;
        }

        $scope.showSpinner = false;

        /* Load Selected Workout Technique */
        $scope.selectedTrainingTechnique = $scope.workout.technique;
        $scope.techniques = [
            { 'id' : 0, 'name' : 'Select Training Technique...' },
            { 'id' : 1, 'name' : 'General Training' },
            { 'id' : 2, 'name' : 'Pyramid' },
            { 'id' : 3, 'name' : 'Super Set' },
            { 'id' : 4, 'name' : 'Circuit' },
            { 'id' : 5, 'name' : 'Drop Set' },
            { 'id' : 6, 'name' : 'Negative Set' },
            { 'id' : 7, 'name' : 'Rest Pause Set' },
            { 'id' : 8, 'name' : 'Static Hold' }
        ];
        $scope.workout.technique = getIndexOfId($scope.techniques, $scope.selectedTrainingTechnique.id);

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

        /* Get Index of Data Array */
        $scope.getIndexOfId = function(array, id) {
            for (var i=0; i<array.length; i++) {
                if (array[i].id==id) return array[i];
            }
            return -1;
        };

        /* Function To Add Toggled Selections To Data Array */
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

        /* Submit and Update Workout Data */
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
