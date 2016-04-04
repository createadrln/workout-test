angular
    .module('exercise')
    .controller("NewExerciseStep3Controller", function ($scope, $localStorage, supersonic) {

        $scope.exercise = $localStorage.newExercise;

        //Rep Fixed Settings and Functions//

        // $scope.exercise.reps_fixed = 1;
        //
        // $scope.increaseFixedRepQty = function() {
        //     $scope.exercise.reps_fixed++;
        // };
        //
        // $scope.decreaseFixedRepQty = function() {
        //     $scope.exercise.reps_fixed--;
        // };

        //Rep Range Settings and Functions//

        // $scope.exercise.rep_range_start = 1;
        // $scope.exercise.rep_range_end = 1;
        //
        // $scope.increaseRepRangeStartQty = function() {
        //     $scope.exercise.rep_range_start++;
        // };
        //
        // $scope.decreaseRepRangeStartQty = function() {
        //     $scope.exercise.rep_range_start--;
        // };
        //
        // $scope.increaseRepRangeEndQty = function() {
        //     $scope.exercise.rep_range_end++;
        // };
        //
        // $scope.decreaseRepRangeEndQty = function() {
        //     $scope.exercise.rep_range_end--;
        // };

        //Rep Series Settings and Functions//

        // if ($scope.exercise.reps == 'series') {
        //     $scope.exercise.reps_series = {};
        //     for(var set = 0; set < $scope.exercise.sets; set++ ) {
        //         $scope.exercise.reps_series['reps_series' + '_' + set] = 1;
        //     }
        // }

        $scope.getCount = function(num) {
            return new Array(num);   
        };

        // $scope.increaseRepSeriesQty = function($index) {
        //     $scope.exercise.reps_series['reps_series' + '_' + $index]++;
        // };
        //
        // $scope.decreaseRepSeriesQty = function($index) {
        //     $scope.exercise.reps_series['reps_series' + '_' + $index]++;
        // };

        //Exercise History//

        $scope.exercise.history = {};
        $scope.addToHistory = function () {
            $scope.exercise.history = {
                'history_date': new Date().toISOString(),
                // 'sets' : exercise.setgoal,
                // 'reps' : exercise.repgoal,
                // 'maxweight' : exercise.maxweight,
                // 'weight' : exercise.weight,
                'weight_unit': $scope.exercise.weight_unit
            };
        };

        //Form Actions//

        $scope.submitForm = function() {
            // $scope.showSpinner = true;
            $scope.addToHistory();
            $localStorage.localExercises.push($scope.exercise);
            // supersonic.data.channel('localExercises').publish($localStorage.localExercises);
            // supersonic.ui.modal.hide();
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });