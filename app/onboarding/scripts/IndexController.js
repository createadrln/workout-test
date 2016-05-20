angular
    .module('onboarding')
    .controller('IndexController', function($scope, $localStorage, supersonic) {

        $localStorage.localExercises = null;
        $localStorage.localWorkouts = null;
        // alert($localStorage.localExercises, $localStorage.localWorkouts);

        $scope.initialView = true;
        if ($localStorage.localExercises || $localStorage.localWorkouts) {
            if ($localStorage.localExercises.length > 0 || $localStorage.localWorkouts.length > 0) {
                $scope.initialView = false;
            }
        }

    });
