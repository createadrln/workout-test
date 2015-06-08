angular
    .module('exercise')
    .controller("EditController", function ($scope, $localStorage, supersonic) {
        $scope.exercise = getIndexOfId($localStorage.localExercises, steroids.view.params.id);
        $scope.showSpinner = false;

        $scope.addToHistory = function (exercise) {
            $scope.updateHistory = exercise.history;
            $scope.pushToHistory = ({ 'history_date' : new Date().toISOString() , 'reps' : exercise.repgoal , 'weight' : exercise.weight });
            $scope.updateHistory.push($scope.pushToHistory);
        };

        $scope.submitForm = function() {
            $scope.showSpinner = true;
            $scope.exercise.history = $scope.updateHistory;
            $localStorage.localExercises[getIndexOfIdCnt($localStorage.localExercises, steroids.view.params.id)] = $scope.exercise;
            supersonic.data.channel('localExercises').publish($localStorage.localExercises);
            supersonic.ui.modal.hide();
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });