angular
    .module('exercise')
    .controller("NewController", function ($scope, $localStorage, supersonic) {
        $scope.exercise = {};

        if ($localStorage.localExercises) {
            if ($localStorage.localExercises != 'null') {
                $scope.localExercises = $localStorage.localExercises;
            } else {
                $scope.localExercises = [];
            }
        } else {
            $scope.localExercises = [];
        }

        $scope.weight_units = [
            { 'id' : 0, 'unit' : 'Select Weight Units...' },
            { 'id' : 1, 'unit' : 'lbs' },
            { 'id' : 2, 'unit' : 'kgs' },
            { 'id' : 3, 'unit' : 'None' }
        ];
        $scope.exercise.weight_unit =  $scope.weight_units[0];

        $scope.pushToHistory = [];
        $scope.addToHistory = function (exercise) {
            $scope.pushToHistory.push({
                'history_date' : new Date().toISOString() ,
                'sets' : exercise.setgoal,
                'reps' : exercise.repgoal,
                'weight' : exercise.weight,
                'weight_unit' : exercise.weight_unit.unit
            });
        };

        $scope.submitForm = function () {
            $scope.showSpinner = true;
            $scope.localExercises.push({
                'id' : generateUUID(),
                'name' : $scope.exercise.name,
                'setgoal' : $scope.exercise.setgoal,
                'repgoal' : $scope.exercise.repgoal,
                'weight' : $scope.exercise.weight,
                'weight_unit' : $scope.exercise.weight_unit,
                'tags' : $scope.exercise.tags,
                'history' : $scope.pushToHistory
            });
            $localStorage.localExercises = $scope.localExercises;
            supersonic.data.channel('localExercises').publish($localStorage.localExercises);
            supersonic.ui.modal.hide();
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });

