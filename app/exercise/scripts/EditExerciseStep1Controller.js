angular
    .module('exercise')
    .controller("EditExerciseStep1Controller", function ($scope, $localStorage, supersonic) {
        $scope.exercise = getIndexOfId($localStorage.localExercises, steroids.view.params.id);
        $scope.button_title = 'Continue';
        $scope.showSpinner = false;
        
        // Load Selected Workout Technique //
        $scope.selectedTrainingTechnique = $scope.exercise.technique;
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
        $scope.exercise.technique = getIndexOfId($scope.techniques, $scope.selectedTrainingTechnique.id);

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
                $localStorage.paramId = steroids.view.params.id;
                var view = new supersonic.ui.View("exercise#editExerciseStep2");
                supersonic.ui.layers.push(view);
            }
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });