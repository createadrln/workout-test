angular
    .module('day')
    .controller("OrderController", function ($scope, $localStorage, supersonic) {
        $scope.day = getIndexOfId($localStorage.localDays, steroids.view.params.id);
        $scope.localWorkouts = $scope.day.workouts;

        $scope.showSpinner = false;

        $scope.updateOrder = function (workouts) {
            $scope.workoutUpdate = workouts;
        };

        $scope.submitForm = function() {
            $scope.showSpinner = true;
            $scope.day.workouts = $scope.workoutUpdate;
            $localStorage.localDays[getIndexOfIdCnt($localStorage.localDays, steroids.view.params.id)] = $scope.day;
            supersonic.data.channel('localDays').publish($localStorage.localDays);
            supersonic.ui.modal.hide();
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        }

    });
