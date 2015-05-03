angular
    .module('exercise')
    .controller("EditController", function ($scope, Exercise, supersonic) {
        $scope.exercise = null;
        $scope.showSpinner = true;

        // Fetch an object based on id from the database
        Exercise.find(steroids.view.params.id).then( function (exercise) {
            $scope.$apply(function() {
                $scope.exercise = exercise;
                $scope.showSpinner = false;
            });
        });

        $scope.submitForm = function() {
            $scope.showSpinner = true;
            $scope.exercise.save().then( function () {
                supersonic.ui.modal.hide();
            });
        }

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        }

    });
