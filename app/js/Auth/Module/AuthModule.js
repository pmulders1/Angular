require('angular/angular');
var authModule = angular.module('webs6.auth', []);

var authRoute = require("../Route/AuthRoutes");
var authService = require("../Services/AuthService");
var authController = require('../Controllers/AuthController');

authModule.factory('AuthService', authService);
authModule.controller('AuthController', authController);

authModule.config(authRoute);

module.exports = authModule;