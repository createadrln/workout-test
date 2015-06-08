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

        $scope.tags = $localStorage.tags;
        //$scope.loadTags = function(query) {
        //    return $http.get($scope.tags);
        //};

        $scope.pushToHistory = [];
        $scope.addToHistory = function (exercise) {
            $scope.pushToHistory.push({ 'history_date' : new Date().toISOString() , 'reps' : exercise.repgoal, 'weight' : exercise.weight });
        };

        $scope.pushToTags = [];
        $scope.addToHistory = function (exercise) {
            $scope.pushToTags.push({ 'tags' : $scope.exercise.tags });
        };

        $scope.submitForm = function () {
            $scope.showSpinner = true;
            $scope.localExercises.push({ 'id' : generateUUID(), 'name' : $scope.exercise.name, 'repgoal' : $scope.exercise.repgoal, 'weight' : $scope.exercise.weight, 'tags' : $scope.pushToTags, 'history' : $scope.pushToHistory });
            $localStorage.localExercises = $scope.localExercises;
            supersonic.data.channel('localExercises').publish($localStorage.localExercises);
            supersonic.ui.modal.hide();
        };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });

