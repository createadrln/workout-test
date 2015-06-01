angular
    .module('exercise')
    .controller("NewController", function ($scope, $localStorage, Exercise, supersonic) {
        $scope.exercise = {};

        $scope.pushToHistory = [];
        $scope.addToHistory = function (exercise) {
            $scope.pushToHistory.push({ 'history_date' : new Date().toISOString() , 'reps' : exercise.repgoal, 'weight' : exercise.weight });
        };

        $scope.submitForm = function () {
            //var view_obj = new supersonic.ui.View("exercise#index");
            //supersonic.ui.layers.replace(view_obj);

            $scope.showSpinner = true;
            $localStorage.locExercises = ({ 'name' : $scope.exercise.name, 'repgoal' : $scope.exercise.repgoal, 'weight' : $scope.exercise.weight });
            supersonic.data.channel('locExCh').publish($localStorage.locExercises);
            supersonic.ui.modal.hide();

            //$scope.exercise.history = $scope.pushToHistory;
            //var newExercise = new Exercise($scope.exercise);
            //newExercise.save().then( function () {
            //    supersonic.ui.modal.hide();
            //});
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        }

    });

