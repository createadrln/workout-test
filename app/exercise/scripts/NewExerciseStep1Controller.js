angular
    .module('exercise')
    .controller("NewExerciseStep1Controller", function ($scope, $localStorage, supersonic) {
        $scope.exercise = {};
        $localStorage.newExercise = null;

        $scope.addToExerciseStep1 = function() {
            $localStorage.newExercise = $scope.exercise;            
            var view = new supersonic.ui.View("exercise#newExerciseStep2");
            supersonic.ui.layers.push(view);
        }


        // $scope.submitForm = function () {
        //     $scope.showSpinner = true;
        //     $scope.localExercises.push({
        //         'id' : generateUUID(),
        //         'name' : $scope.exercise.name,
        //         'setgoal' : $scope.exercise.setgoal,
        //         'repgoal' : $scope.exercise.repgoal,
        //         'maxweight' : $scope.exercise.maxweight,
        //         'weight' : $scope.exercise.weight,
        //         'weight_unit' : $scope.exercise.weight_unit,
        //         'tags' : $scope.exercise.tags,
        //         'history' : $scope.pushToHistory
        //     });
        //     $localStorage.localExercises = $scope.localExercises;
        //     supersonic.data.channel('localExercises').publish($localStorage.localExercises);
        //     supersonic.ui.modal.hide();
        // };

        $scope.cancel = function () {
            supersonic.ui.modal.hide();
        };

    });

