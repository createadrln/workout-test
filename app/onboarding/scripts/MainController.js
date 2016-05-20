angular
    .module('onboarding')
    .controller("MainController", function ($scope, $localStorage, supersonic) {
        $scope.showSpinner = false;
        alert('test');
        if ($localStorage.localExercises || $localStorage.localWorkouts) {
            supersonic.ui.initialView.dismiss();
        }
    });