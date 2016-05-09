var authModule = angular.module('webs6.auth', []);

var authRoute = require("../Route/AuthRoutes");
var authController = require('../Controllers/AuthController');

authModule.controller('AuthController', ['$scope', '$routeParams', authController]);
authModule.config(authRoute);

module.exports = authModule;