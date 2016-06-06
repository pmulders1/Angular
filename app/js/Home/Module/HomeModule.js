require('angular/angular');
var homeModule = angular.module('webs6.home', []);

var homeRoute = require("../Route/HomeRoutes");
var homeController = require('../Controllers/HomeController');

homeModule.controller('HomeController', ['$scope', homeController]);
homeModule.config(homeRoute);

module.exports = homeModule;