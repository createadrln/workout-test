angular
  .module('log')
  .controller("EditController", function ($scope, Log, supersonic) {
    $scope.log = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Log.find(steroids.view.params.id).then( function (log) {
      $scope.$apply(function() {
        $scope.log = log;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.log.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
