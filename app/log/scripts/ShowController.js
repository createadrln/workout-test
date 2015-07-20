angular
  .module('log')
  .controller("ShowController", function ($scope, Log, supersonic) {
    $scope.log = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Log.find($scope.dataId).then( function (log) {
        $scope.$apply( function () {
          $scope.log = log;
          $scope.showSpinner = false;
        });
      });
    }

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
      $scope.log.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });