angular
    .module('exercise')
    .controller("IndexController", function ($scope, $localStorage, Exercise, supersonic) {
        $scope.exercises = null;
        $scope.showSpinner = true;

        supersonic.data.channel('locExCh').subscribe( function(locExerciseTest) {
            $scope.$apply(function() {
                $scope.locExercises = locExerciseTest;
            });
        });

        Exercise.all().whenChanged( function (exercises) {
            $scope.$apply( function () {
                $scope.locExercises = $localStorage.locExercises;
                $scope.exercises = exercises;
                $scope.showSpinner = false;
            });
        });
    });