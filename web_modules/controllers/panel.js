var async = require('async'), actions = require('actions');
module.exports = ['$scope', '$timeout', function($scope, $timeout) {
  var active = true,
    fix = function() {},
    normal,
    keyAction = function() {
      fix();
    };


  var vars = {};

  jQuery(document).keypress(keyAction);
  $scope.$on('$destroy', function() {
    active = false;
    jQuery(document).off('keypress', keyAction);
  });



  var myActions = $scope.actions = angular.copy(actions);

  $scope.active = 0;
  $scope.speed = 1000;
  async.during(
    function(callback) {
      return callback(null, active);
    },
    function(next) {
      normal = $timeout(function() {
        if ((myActions.length - 1) === $scope.active) $scope.active = -1;
        $scope.active++;
        next();
        vars.active = true;
      }, $scope.speed);
      fix = function() {
        vars.active = false;
        $timeout.cancel(normal);
        $timeout(function() {
          live.emit('message', angular.copy(myActions[$scope.active]));
          $scope.active = 0;
          next();
        });

      };
    },
    function(err) {
      console.log('done', err);
    }
  );



}];
