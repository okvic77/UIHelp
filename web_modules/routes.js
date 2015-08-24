var Simulador = require('jade!views/panel.jade');
module.exports = function(app) {
  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");


    require('controllers/list')($stateProvider);

    $stateProvider.state('acerca', {
      url: "/acerca",
      template: "partials/acerca.html"
    }).state('simulador', {
      url: "/simulador",
      templateProvider: function() {
        return Simulador();
      },
      controller: require('controllers/panel')
    });
  }]);
};
