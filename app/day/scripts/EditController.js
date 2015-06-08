angular
    .module('day')
    .controller("EditController", function ($scope, $localStorage, supersonic) {
        $scope.day = getIndexOfId($localStorage.localDays, steroids.view.params.id);

        if ($localStorage.localWorkouts) {
            $scope.localWorkouts = $localStorage.localWorkouts;
        } else {
            $scope.localWorkouts = null;
        }

        $scope.showSpinner = false;

        /* Load Toggled Workouts Into Array */
        $scope.checkedWorkouts = [];
        var checkedWorkoutCnt = 0;
        $scope.toggleCheck = function (workout) {
            if (getIndexOfIdCnt($scope.checkedWorkouts, workout.id) === -1) {
                checkedWorkoutCnt++;
                $scope.checkedWorkouts.push({'id' : workout.id, 'title' : workout.title, 'order' : checkedWorkoutCnt });
            } else {
                checkedWorkoutCnt--;
                $scope.checkedWorkouts.splice($scope.localWorkouts.indexOf(workout.id), 1);
            }
            return checkedWorkoutCnt;
        };

        $scope.submitForm = function() {
            $scope.showSpinner = true;
            $scope.day.workout = $scope.checkedWorkouts;
            $localStorage.localDays[getIndexOfIdCnt($localStorage.localDays, steroids.view.params.id)] = $scope.day;
            supersonic.data.channel('localDays').publish($localStorage.localDays);
            supersonic.ui.modal.hide();
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });
