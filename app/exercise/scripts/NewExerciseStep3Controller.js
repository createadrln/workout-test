angular
    .module('exercise')
    .controller("NewExerciseStep3Controller", function ($scope, $localStorage, supersonic) {

        $scope.exercise = $localStorage.newExercise;
        $scope.exercise.reps_fixed = 1;
        $scope.exercise.rep_range_start = 1;
        $scope.exercise.rep_range_end = 1;
        
        /*Rep Fixed Toggles*/
        $scope.increaseFixedRepQty = function() {
            $scope.exercise.reps_fixed++;
        }

        $scope.decreaseFixedRepQty = function() {
            $scope.exercise.reps_fixed--;
        }

        /*Rep Range Toggles*/
        $scope.increaseRepRangeStartQty = function() {
            $scope.exercise.rep_range_start++;
        }

        $scope.decreaseRepRangeStartQty = function() {
            $scope.exercise.rep_range_start--;
        }

        $scope.increaseRepRangeEndQty = function() {
            $scope.exercise.rep_range_end++;
        }

        $scope.decreaseRepRangeEndQty = function() {
            $scope.exercise.rep_range_end--;
        }

        /*Rep Series Toggles*/
        $scope.getCount = function(num) {
            return new Array(num);   
        }

        for(set = 0; set < $scope.exercise.sets; set++ ) {
            // $scope.exercise.rep_series_ + parseInt(set) = 1;
        }

        $scope.increaseRepSeriesQty = function($index) {
            // $scope.exercise.rep_series_+$index++;
        }

        $scope.decreaseRepSeriesQty = function($index) {
    		// $scope.exercise.rep_series_+$index--;
        }
    
        $scope.addToExerciseStep3 = function() {

        }

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });

