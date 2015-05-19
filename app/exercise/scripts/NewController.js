angular
    .module('exercise')
    .controller("NewController", function ($scope, Exercise, supersonic) {
        $scope.exercise = {};

        $scope.pushToHistory = [];
        $scope.addToHistory = function (exercise) {
            $scope.pushToHistory.push({ 'history_date' : new Date().toISOString() , 'reps' : exercise.repgoal, 'weight' : exercise.weight });
        };

        $scope.submitForm = function () {
            $scope.showSpinner = true;
            $scope.exercise.history = $scope.pushToHistory;
            newexercise = new Exercise($scope.exercise);
            newexercise.save().then( function () {
                supersonic.ui.modal.hide();
            });
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        }

    });