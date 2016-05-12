var gameDetailModule = angular.module('webs6.gamedetail', []);

var gameDetailRoute = require("../Route/GameDetailRoutes");
var gameService = require('../Services/GameService');
var gameDetailController = require('../Controllers/GameDetailController');

gameDetailModule.factory('GameService', ['$http', gameService]);
gameDetailModule.controller('GameDetailController', ['$scope', 'GameService', '$stateParams', gameDetailController]);
gameDetailModule.config(gameDetailRoute);

module.exports = gameDetailModule;