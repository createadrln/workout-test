angular
    .module('workout')
    .controller("IndexController", function ($scope, $localStorage) {
        $scope.localWorkouts = $localStorage.localWorkouts;
        $scope.showSpinner = false;

        supersonic.data.channel('localWorkouts').subscribe( function(localWorkouts) {
            $scope.$apply(function() {
                $scope.localWorkouts = localWorkouts;
            });
        });

    });