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

        if ($scope.day.workouts) {
            angular.forEach($scope.day.workouts, function(workout){
                checkedWorkoutCnt++;
                $scope.checkedWorkouts.push({
                    'id': workout.id,
                    'title': workout.title,
                    'order': checkedWorkoutCnt
                });
            });
        }

        $scope.getIndexOfId = function(array, id) {
            for (var i=0; i<array.length; i++) {
                if (array[i].id==id) return array[i];
            }
            return -1;
        };

        $scope.toggleCheck = function (workout) {
            if (getIndexOfId($scope.checkedWorkouts, workout.id) === -1) {
                checkedWorkoutCnt++;
                $scope.checkedWorkouts.push({
                    'id': workout.id,
                    'title': workout.title,
                    'order': checkedWorkoutCnt
                });
            } else {
                checkedWorkoutCnt--;
                $scope.checkedWorkouts.splice(getIndexOfIdCnt($scope.checkedWorkouts, workout.id),1);
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
