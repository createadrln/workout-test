angular
    .module('exercise')
    .controller("NewExerciseStep1Controller", function ($scope, $localStorage, supersonic) {
        $scope.exercise = {};
        $scope.exercise.id = generateUUID();
        $localStorage.newExercise = null;
        $scope.exercise.location = steroids.view.params.location;
        
        if (!$localStorage.localExercises) {
            $localStorage.localExercises = [];
        }

        $scope.techniques = [
            { 'id' : 0, 'technique_name' : 'Select Training Technique...' },
            { 'id' : 1, 'technique_name' : 'General Training' },
            { 'id' : 2, 'technique_name' : 'Pyramid' },
            { 'id' : 3, 'technique_name' : 'Super Set' },
            { 'id' : 4, 'technique_name' : 'Circuit' },
            { 'id' : 5, 'technique_name' : 'Drop Set' },
            { 'id' : 6, 'technique_name' : 'Negative Set' },
            { 'id' : 7, 'technique_name' : 'Rest Pause Set' },
            { 'id' : 8, 'technique_name' : 'Static Hold' }
        ];
        $scope.exercise.technique =  $scope.techniques[0];

        // Form Actions //

        // Form Validate //
        $scope.validate = function () {
            if (!$scope.exercise.name) {
                alert('Please enter a name');
                return false;
            } else {
                return true;
            }
        };

        // Form Load Next View //
        $scope.addToExerciseStep1 = function() {
            if ($scope.validate()) {
                $localStorage.newExercise = $scope.exercise;
                var view = new supersonic.ui.View("exercise#newExerciseStep2");
                supersonic.ui.layers.push(view);
            }
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });

