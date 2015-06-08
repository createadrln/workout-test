angular
    .module('exercise')
    .controller("ShowController", function ($scope, $localStorage, supersonic) {
        $scope.exercise = null;
        $scope.showSpinner = true;
        $scope.dataId = undefined;
        $scope.localExercises = $localStorage.localExercises;

        supersonic.data.channel('localExercises').subscribe( function(localExercises) {
            $scope.$apply(function() {
                $scope.localExercises = localExercises;
                $scope.localExercise = getIndexOfId(localExercises, $scope.dataId);
            });
        });

        var _refreshViewData = function () {
            $scope.localExercise = getIndexOfId($localStorage.localExercises, $scope.dataId);
            $scope.showSpinner = false;
        };

        supersonic.ui.views.current.whenVisible( function () {
            if ( $scope.dataId ) {
                _refreshViewData();
            }
        });

        supersonic.ui.views.current.params.onValue( function (values) {
            $scope.dataId = values.id;
            _refreshViewData();
        });

        $scope.remove = function (id) {
            $scope.showSpinner = true;
            //removeIndexOfId($localStorage.localExercises, id);
            supersonic.ui.layers.pop();
        };

    });