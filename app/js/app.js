require('angular/angular');

// Create your app
var app = angular.module('WEBS6', []);
var gameFactory = require('./Games/Services/GameFactory');
var gameController = require('./Games/Controllers/GameController');

app.factory('GameFactory', ['$http', gameFactory]);
app.controller('GameController', ['$scope', 'GameFactory', gameController]);