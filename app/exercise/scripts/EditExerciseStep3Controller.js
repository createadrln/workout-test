angular
    .module('exercise')
    .controller("EditExerciseStep3Controller", function ($scope, $localStorage, supersonic) {

        $scope.exercise = $localStorage.newExercise;
        $scope.paramId = $localStorage.paramId;
        
        // Front End Functions //

        // Iterate From Array //
        $scope.getCount = function(num) {
            return new Array(num);
        };

        // Range of Numbers //
        $scope.range = function(start, end, distance) {
            var result = [];
            for (var i = start; i <= end; i+=distance) {
                result.push(i);
            }
            return result;
        };

        //Exercise History//
        $scope.addToHistory = function () {
            if ($scope.exercise.reps == 'fixed') {
                $scope.pushToHistory = {
                    'history_date': new Date().toISOString(),
                    'notes': $scope.exercise.notes,
                    'technique': $scope.exercise.technique,
                    'weight_unit': $scope.exercise.weight_unit,
                    'reps': 'fixed',
                    'sets': $scope.exercise.sets,
                    'reps_fixed': $scope.exercise.reps_fixed,
                    'reps_fixed_weight': $scope.exercise.reps_fixed_weight,
                    'max_weight' : $scope.exercise.max_weight,
                    'one_rep_max' : $scope.exercise.one_rep_max
                };
            }
            if ($scope.exercise.reps == 'series') {
                $scope.pushToHistory = {
                    'history_date': new Date().toISOString(),
                    'notes': $scope.exercise.notes,
                    'technique': $scope.exercise.technique,
                    'weight_unit': $scope.exercise.weight_unit,
                    'reps': 'series',
                    'sets': $scope.exercise.sets,
                    'reps_series' : $scope.exercise.reps_series,
                    'max_weight' : $scope.exercise.max_weight,
                    'one_rep_max' : $scope.exercise.one_rep_max
                };
            }
            $scope.exercise.history.push($scope.pushToHistory);
        };
        
        // Form Actions //

        // Form Validate //
        $scope.validate = function () {
            return true;
        };

        // Form Submit //
        $scope.submitForm = function() {
            if ($scope.validate()) {
                $scope.showSpinner = true;
                $scope.addToHistory();
                $localStorage.localExercises[getIndexOfIdCnt($localStorage.localExercises, $scope.paramId)] = $scope.exercise;
                supersonic.data.channel('localExercises').publish($localStorage.localExercises);
                supersonic.ui.modal.hide();
            }
        };

        // Form Cancel //
        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });