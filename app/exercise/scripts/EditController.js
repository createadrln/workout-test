angular
    .module('exercise')
    .controller("EditController", function ($scope, $localStorage, supersonic) {
        $scope.exercise = getIndexOfId($localStorage.localExercises, steroids.view.params.id);
        $scope.showSpinner = false;

        $scope.selectedWeightUnit = $scope.exercise.weight_unit;
        $scope.weight_units = [
            { 'id' : 1, 'unit' : 'lbs' },
            { 'id' : 2, 'unit' : 'kgs' },
            { 'id' : 3, 'unit' : 'None' }
        ];
        $scope.exercise.weight_unit = getIndexOfId($scope.weight_units, $scope.selectedWeightUnit.id);

        $scope.addToHistory = function (exercise) {
            $scope.updateHistory = exercise.history;
            $scope.pushToHistory = ({
                'history_date' : new Date().toISOString(),
                'sets' : exercise.setgoal,
                'reps' : exercise.repgoal,
                'weight' : exercise.weight,
                'weight_unit' : exercise.weight_unit.unit
            });
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