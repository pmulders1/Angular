var gameModule = angular.module('webs6.game', []);

var gameRoute = require("../Route/GameRoutes");
var gameService = require('../Services/GameService');
var gameController = require('../Controllers/GameController');

gameModule.factory('GameService', ['$http', gameService]);
gameModule.controller('GameController', gameController);
gameModule.config(gameRoute);

module.exports = gameModule;