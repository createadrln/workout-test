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
        $scope.selectedWorkouts = [];
        var checkedWorkoutCnt = 0;

        //if ($scope.day.workouts.length != 0) {
        //    angular.forEach($scope.day.workouts, function(workout){
        //        checkedWorkoutCnt++;
        //        $scope.checkedWorkouts.push({
        //            'id': workout.id,
        //            'title': workout.title,
        //            'order': checkedWorkoutCnt
        //        });
        //    });
        //    angular.forEach($scope.day.workouts, function(workout){
        //        getIndexOfId($scope.localWorkouts, workout.id)["checked"] = true;
        //    });
        //}

        $scope.toggleCheck = function (workout) {
            if (getIndexOfIdCnt($scope.checkedWorkouts, workout.id) === -1) {
                checkedWorkoutCnt++;
                $scope.checkedWorkouts.push({
                    'id': workout.id,
                    'title': workout.title,
                    'order': checkedWorkoutCnt
                });
            } else {
                checkedWorkoutCnt--;
                $scope.checkedWorkouts.splice($scope.localWorkouts.indexOf(workout.id), 1);
            }
            return checkedWorkoutCnt;
        };

        $scope.submitForm = function() {
            $scope.showSpinner = true;
            $scope.day.workouts = $scope.checkedWorkouts;
            $localStorage.localDays[getIndexOfIdCnt($localStorage.localDays, steroids.view.params.id)] = $scope.day;
            supersonic.data.channel('localDays').publish($localStorage.localDays);
            supersonic.ui.modal.hide();
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });
