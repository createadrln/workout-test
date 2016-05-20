angular
    .module('day')
    .controller("IndexController", function ($scope, $localStorage, supersonic) {
        $scope.showSpinner = true;

        /*SQL LITE STORAGE FOR USER DATA*/
        // document.addEventListener("deviceready", onDeviceReady, false);
        // function onDeviceReady() {

            // var flexFileDb = window.sqlitePlugin.openDatabase({name: "flexfile.data", createFromLocation: 1});  // Database Var //
            var flexFileDb = null;  // Database Var //
            if (!$localStorage.localDays && !$localStorage.localExercises && !$localStorage.localWorkouts) { // If No Days or Exercises or Workouts //
                if (flexFileDb.localDays || flexFileDb.localExercises || flexFileDb.localWorkouts) {  // If SQL Exercises or Workouts Exist //
                    if (!$localStorage.localDays && flexFileDb.localDays) {  // If No Local Days and SQL Days Exist //
                        $localStorage.localDays = flexFileDb.localDays;  // Local Workouts equals SQL Workouts //
                        $scope.localDays = $localStorage.localDays;
                    }
                    if (!$localStorage.localWorkouts && flexFileDb.localWorkouts) {  // If No Local Workouts and SQL Workouts Exist //
                        $localStorage.localWorkouts = flexFileDb.localWorkouts;  // Local Workouts equals SQL Workouts //
                    }
                    if (!$localStorage.localExercises && flexFileDb.localExercises) {  // If No Local Exercises and SQL Exercises Exist //
                        $localStorage.localExercises = flexFileDb.localExercises;  // Local Exercises equals SQL Exercises //
                    }
                } else {  // If SQL Exercises or Workouts Do Not Exist //
                    $scope.initializeLocalDays = [
                        {
                            'id': generateUUID(),
                            'day': 'Sunday',
                            'brief_description': '',
                            'order': 1,
                            'workouts': []
                        },
                        {
                            'id': generateUUID(),
                            'day': 'Monday',
                            'brief_description': '',
                            'order': 2,
                            'workouts': []
                        },
                        {
                            'id': generateUUID(),
                            'day': 'Tuesday',
                            'brief_description': '',
                            'order': 3,
                            'workouts': []
                        },
                        {
                            'id': generateUUID(),
                            'day': 'Wednesday',
                            'brief_description': '',
                            'order': 4,
                            'workouts': []
                        },
                        {
                            'id': generateUUID(),
                            'day': 'Thursday',
                            'brief_description': '',
                            'order': 5,
                            'workouts': []
                        },
                        {
                            'id': generateUUID(),
                            'day': 'Friday',
                            'brief_description': '',
                            'order': 6,
                            'workouts': []
                        },
                        {
                            'id': generateUUID(),
                            'day': 'Saturday',
                            'brief_description': '',
                            'order': 7,
                            'workouts': []
                        }
                    ];
                    $localStorage.localDays = $scope.initializeLocalDays;  // Initialize Days //
                    $scope.localDays = $localStorage.localDays;  // Initialize Days //
                    // flexFileDb.localDays = $localStorage.localDays;  // Save Local To DB //
                    // flexFileDb.localWorkouts = $localStorage.localWorkouts;  // Save Local To DB //
                    // flexFileDb.localExercises = $localStorage.localExercises;  // Save Local To DB //
                }
            } else { // If Local Exercises or Workouts //
                $scope.localDays = $localStorage.localDays;
                // flexFileDb.localDays = $localStorage.localDays;  // Save Local To DB //
                // flexFileDb.localWorkouts = $localStorage.localWorkouts;  // Save Local To DB //
                // flexFileDb.localExercises = $localStorage.localExercises;  // Save Local To DB //
            }

            supersonic.data.channel('localDays').subscribe(function (localDays) {
                $scope.$apply(function () {
                    $scope.localDays = localDays;
                });
            });

            $scope.showSpinner = false;

        // }

    });