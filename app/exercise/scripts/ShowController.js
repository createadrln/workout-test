angular
    .module('exercise')
    .controller("ShowController", function ($scope, $Exercise, supersonic) {
        $scope.exercise = null;
        $scope.showSpinner = true;
        $scope.dataId = undefined;

        var _refreshViewData = function () {
            Exercise.find($scope.dataId).then( function (exercise) {
                $scope.$apply( function () {
                    $scope.exercise = exercise;
                    $scope.showSpinner = false;
                });
            });
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
            $scope.exercise.delete().then( function () {
                supersonic.ui.layers.pop();
            });
        }
    });