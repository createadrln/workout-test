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

        $scope.openModal = function(location, type) {
            var modalView = new supersonic.ui.View(location + '#' + type);
            var options = {
                animate: true
            };
            supersonic.ui.modal.show(modalView, options);
        };

    });