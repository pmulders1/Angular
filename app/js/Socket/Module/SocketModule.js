require('angular/angular');
var socketModule = angular.module('webs6.socket', []);

var socketService = require("../Services/SocketService");

socketModule.factory('SocketService', socketService);

module.exports = socketModule;