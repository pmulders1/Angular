require('angular/angular');
require('angular-route/angular-route');

// Create your app
var app = angular.module('WEBS6', ['ngRoute']);


var gameFactory = require('./Games/Services/GameFactory');
var gameController = require('./Games/Controllers/GameController');
var homeController = require('./Home/Controllers/HomeController');
var gameModel = require('./Games/Models/Game');

// Factorys registreren
app.factory('GameFactory', ['$http', gameFactory]);

// configure our routes
app.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/home', {
            templateUrl : './js/Home/Views/Home.html',
            controller  : 'HomeController'
        })

        .when('/games', {
            templateUrl : './js/Games/Views/GameListView.html',
            controller  : 'GameController'
        })

        .when('/games/add', {
            templateUrl : './js/Games/Views/GameCreateView.html',
            controller  : 'GameController'
        })

        .when('/games/:gameId', {
            templateUrl : './js/Games/Views/GameDetailView.html',
            controller  : 'GameDetailController'
        });
});

// Controllers registreren
app.controller('HomeController', ['$scope', homeController]);
app.controller('GameController', ['$scope', 'GameFactory', '$routeParams', gameController]);
app.controller('GameDetailController', ['$scope', 'GameFactory', '$routeParams',
  function($scope, GameFactory, $routeParams) {
    var game = GameFactory.getGameById($routeParams.gameId);
    $scope.game = game;
    console.log(game);
  }]);