angular
    .module('exercise')
    .controller("IndexController", function ($scope, $localStorage, supersonic) {
        $scope.localExercises = $localStorage.localExercises;
        $scope.showSpinner = false;

        supersonic.data.channel('localExercises').subscribe( function(localExercises) {
            $scope.$apply(function() {
                $scope.localExercises = localExercises;
            });
        });

    });