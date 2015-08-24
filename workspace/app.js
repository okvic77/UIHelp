var model = Backbone.Collection.extend({
  model: Backbone.Model.extend({
    idAttribute: '_id'
  }),
  comparator: function(m) {
    return -Date.parse(m.get('fecha'));
  }
});

window.messages = new model(messages_);


live.on('message', function(data) {
  messages.add(data);
  //messages.sort();
});


var app = angular.module('Interface', ['ngMaterial', 'ui.router', 'angularMoment']);


app.run(['amMoment', function(amMoment) {
  amMoment.changeLocale('es');
}]);
app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
}]);
require('routes')(app);
