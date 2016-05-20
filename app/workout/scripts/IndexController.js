angular
    .module('workout')
    .controller("IndexController", function ($scope, $localStorage, supersonic) {
        $scope.showSpinner = false;

        supersonic.data.channel('localWorkouts').subscribe(function (localWorkouts) {
            $scope.$apply(function () {
                $scope.localWorkouts = localWorkouts;
            });
        });

        settingsBtn = new supersonic.ui.NavigationBarButton({
            title: '',
            onTap: function() {
                var settingsView = new supersonic.ui.View("info#index");
                supersonic.ui.layers.push(settingsView);
            },
            styleId: 'settings'
        });

        supersonic.ui.navigationBar.update({
            title: '',
            buttons: {
                right: [settingsBtn]
            }
        }).then(supersonic.ui.navigationBar.show());

        /*SQL LITE STORAGE FOR USER DATA*/
        // document.addEventListener("deviceready", onDeviceReady, false);
        // function onDeviceReady() {

        // var flexFileDb = window.sqlitePlugin.openDatabase({name: "flexfile.data", createFromLocation: 1});  // Database Var //
        var flexFileDb = null;  // Database Var //
        if (!$localStorage.localExercises && !$localStorage.localWorkouts) { // If No Days or Exercises or Workouts //
            if (flexFileDb.localExercises || flexFileDb.localWorkouts) {  // If SQL Exercises or Workouts Exist //
                if (!$localStorage.localWorkouts && flexFileDb.localWorkouts) {  // If No Local Workouts and SQL Workouts Exist //
                    $localStorage.localWorkouts = flexFileDb.localWorkouts;  // Local Workouts equals SQL Workouts //
                }
                if (!$localStorage.localExercises && flexFileDb.localExercises) {  // If No Local Exercises and SQL Exercises Exist //
                    $localStorage.localExercises = flexFileDb.localExercises;  // Local Exercises equals SQL Exercises //
                }
            } else {  // If SQL Exercises or Workouts Do Not Exist //
                $scope.initializeWorkouts = [];
                $localStorage.localWorkouts = $scope.initializeWorkouts;  // Initialize Days //
                $scope.localWorkouts = $localStorage.localWorkouts;  // Initialize Days //
                // flexFileDb.localDays = $localStorage.localDays;  // Save Local To DB //
                // flexFileDb.localWorkouts = $localStorage.localWorkouts;  // Save Local To DB //
                // flexFileDb.localExercises = $localStorage.localExercises;  // Save Local To DB //
            }
        } else { // If Local Exercises or Workouts //
            $scope.localWorkouts = $localStorage.localWorkouts;
            // flexFileDb.localDays = $localStorage.localDays;  // Save Local To DB //
            // flexFileDb.localWorkouts = $localStorage.localWorkouts;  // Save Local To DB //
            // flexFileDb.localExercises = $localStorage.localExercises;  // Save Local To DB //
        }

        $scope.showSpinner = false;

        // }

    });