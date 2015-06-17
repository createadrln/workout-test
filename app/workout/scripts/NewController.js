angular
    .module('workout')
    .controller("NewController", function ($scope, $localStorage, supersonic) {
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
        $scope.workout.technique =  $scope.techniques[0];

        $scope.checkedExercises = [];
        var checkedExerciseCnt = 0;
        $scope.toggleCheck = function (exercise) {
            if (getIndexOfIdCnt($scope.checkedExercises, exercise.id) === -1) {
                checkedExerciseCnt++;
                $scope.checkedExercises.push({
                    'id' : exercise.id,
                    'name' : exercise.name,
                    'order' : checkedExerciseCnt
                });
            } else {
                checkedExerciseCnt--;
                $scope.checkedExercises.splice($scope.localExercises.indexOf(exercise.id), 1);
            }
            return checkedExerciseCnt;
        };

        $scope.submitForm = function () {
            $scope.showSpinner = true;
            $scope.localWorkouts.push({
                'id' : generateUUID(),
                'title' : $scope.workout.title,
                'rest' : $scope.workout.notes,
                'technique' : $scope.workout.technique,
                'notes' : $scope.workout.notes,
                'tags' : $scope.workout.tags,
                'exercises:' : $scope.checkedExercises
            });
            $localStorage.localWorkouts = $scope.localWorkouts;
            supersonic.data.channel('localWorkouts').publish($localStorage.localWorkouts);
            supersonic.ui.modal.hide();
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });