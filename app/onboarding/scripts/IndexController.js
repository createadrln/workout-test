angular
    .module('onboarding')
    .controller('IndexController', function($scope, $localStorage) {
        $scope.showSpinner = false;

        /*SQL LITE STORAGE FOR USER DATA*/
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            var flexFileDb = window.sqlitePlugin.openDatabase({name: "flexfile.data", createFromLocation: 1});  // Database Var //

            if (!$localStorage.localExercises && !$localStorage.localWorkouts) { // If No Days or Exercises or Workouts //
                if (flexFileDb) {
                    if (flexFileDb.localExercises || flexFileDb.localWorkouts) {  // If SQL Exercises or Workouts Exist //
                        if (!$localStorage.localWorkouts && flexFileDb.localWorkouts) {  // If No Local Workouts and SQL Workouts Exist //
                            $localStorage.localWorkouts = flexFileDb.localWorkouts;  // Local Workouts equals SQL Workouts //
                        }
                        if (!$localStorage.localExercises && flexFileDb.localExercises) {  // If No Local Exercises and SQL Exercises Exist //
                            $localStorage.localExercises = flexFileDb.localExercises;  // Local Exercises equals SQL Exercises //
                        }
                    } else {
                        $localStorage.localExercises = [];
                        $localStorage.localWorkouts = [];
                    }
                } else {
                    $localStorage.localExercises = [];
                    $localStorage.localWorkouts = [];
                }
            } else { // If Local Exercises or Workouts //
                if (flexFileDb) {
                    flexFileDb.localWorkouts = $localStorage.localWorkouts;  // Save Local To DB //
                    flexFileDb.localExercises = $localStorage.localExercises;  // Save Local To DB //
                }
            }

        }

        if ($localStorage.localExercises) {
            $scope.localExerciseCount = $localStorage.localExercises.length;
        }

        if ($localStorage.localWorkouts) {
            $scope.localWorkoutCount = $localStorage.localWorkouts.length;
        }

        $scope.initialView = true;
        if ($localStorage.localExercises || $localStorage.localWorkouts) {
            if ($localStorage.localExercises.length > 0 || $localStorage.localWorkouts.length > 0) {
                $scope.initialView = false;
            }
        }

    });
