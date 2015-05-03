angular
    .module('exercise')
    .controller("NewController", function ($scope, Exercise, supersonic) {
        $scope.exercise = {};

        $scope.submitForm = function () {
            $scope.showSpinner = true;
            newexercise = new Exercise($scope.exercise);
            newexercise.save().then( function () {
                supersonic.ui.modal.hide();
            });
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        }

    });