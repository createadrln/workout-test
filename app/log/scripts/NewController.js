angular
  .module('log')
  .controller("NewController", function ($scope, Log, supersonic) {
    $scope.log = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newlog = new Log($scope.log);
      newlog.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });