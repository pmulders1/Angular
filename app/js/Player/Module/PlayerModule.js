var playerModule = angular.module('webs6.player', []);

var playerController = require('../Controllers/PlayerController');

playerModule.controller('PlayerController', ['$scope', '$routeParams', playerController]);

module.exports = playerModule;