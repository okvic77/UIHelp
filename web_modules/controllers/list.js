var messageListView = require('jade!views/messages.jade');



module.exports = function($stateProvider) {
  $stateProvider
    .state('inicio', {
      url: "/",
      templateProvider: function() {
        return messageListView();
      },
      controller: ['$scope', '$timeout', function($scope, $timeout) {
        $scope.messages = messages.toJSON();
        messages.on('update', function() {
          $timeout(function() {
            $scope.messages = messages.toJSON();
          });
        });
      }]
    });
};
