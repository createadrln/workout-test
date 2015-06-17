angular
    .module('exercise')
    .controller("EditController", function ($scope, $localStorage, supersonic) {
        $scope.exercise = getIndexOfId($localStorage.localExercises, steroids.view.params.id);
        $scope.showSpinner = false;

        $scope.selectedTechnique = $scope.exercise.technique;
        $scope.techniques = [
            { 'id' : 1, 'name' : 'General Training' },
            { 'id' : 2, 'name' : 'Pyramid' },
            { 'id' : 3, 'name' : 'Super Set' },
            { 'id' : 4, 'name' : 'Circuit' },
            { 'id' : 5, 'name' : 'Drop Set' },
            { 'id' : 6, 'name' : 'Negative Set' },
            { 'id' : 7, 'name' : 'Rest Pause Set' },
            { 'id' : 8, 'name' : 'Static Hold' }
        ];
        $scope.exercise.technique = getIndexOfId($scope.techniques, $scope.selectedTechnique.id);

        $scope.selectedWeightUnit = $scope.exercise.weight_unit;
        $scope.weight_units = [
            { 'id' : 1, 'unit' : 'lbs' },
            { 'id' : 2, 'unit' : 'kgs' }
        ];
        $scope.exercise.weight_unit = getIndexOfId($scope.weight_units, $scope.selectedWeightUnit.id);

        $scope.addToHistory = function (exercise) {
            $scope.updateHistory = exercise.history;
            $scope.pushToHistory = ({
                'history_date' : new Date().toISOString(),
                'technique' : $scope.exercise.technique,
                'sets' : exercise.setgoal ,
                'reps' : exercise.repgoal ,
                'weight' : exercise.weight
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