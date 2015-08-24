var async = require('async'), actions = require('actions');
module.exports = ['$scope', '$timeout', '$mdMedia', function($scope, $timeout, $mdMedia) {


  var active = true,
    fix = function() {},
    normal,
    keyAction = function(e) {
      switch (e.which) {
        case 119:
          fix('up');
          break;
        case 97:
          fix('left');
          break;
        case 100:
          fix('rigth');
          break;
        case 115:
          fix('down');
          break;
        default:
          fix(null);
          break;
      }
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



        switch ($scope.isXY) {
          case true:
            next();
            break;

          default:


            if ((myActions.length - 1) === $scope.active) $scope.active = -1;
            $scope.active++;
            next();
            vars.active = true;


            break;

        }


      }, $scope.speed);
      fix = function(mode) {
        vars.active = false;
        $timeout.cancel(normal);
        $timeout(function() {


          if (!$scope.isXY) {
            live.emit('message', angular.copy(myActions[$scope.active]));
            $scope.active = 0;
          }
          else {


            var is = {
              sm: $mdMedia('sm'),
              md: $mdMedia('md'),
              'gt-md': $mdMedia('gt-md')
            };
            var line;
            if (is.sm || is.md) line = 2;
            else if (is['gt-md']) line = 6;
            switch (mode) {
              case 'up':
                $scope.active = $scope.active - line;
                break;
              case 'down':
                $scope.active = $scope.active + line;
                break;
              case 'rigth':
                $scope.active++;
                break;
              case 'left':
                $scope.active--;
                break;
              default:
                live.emit('message', angular.copy(myActions[$scope.active]));
                break;
            }
            var index = $scope.active + 1;


            if (index >= (myActions.length + line)) {
              $scope.active = 0;
            }

            else if (index > myActions.length) {
              $scope.active = index - myActions.length;
            }

            else if (index <= 0) {
              var base = Math.abs(myActions.length / line) * line;

              $scope.active = base - 2 + index;
              if ($scope.active < 1) $scope.active = base;

            }


            console.log('debug', index, $scope.active, myActions.length);
            //if ($scope.active)


          }

          //$scope.active = 0;
          next();
        });

      };
    },
    function(err) {
      console.log('done', err);
    }
  );



}];
