require('angular/angular');
require('angular-route/angular-route');

// Create your app
var app = angular.module('webs6', [
    'ngRoute',
    'webs6.game',
    'webs6.player',
    'webs6.home',
    'webs6.auth',
    'webs6.gamedetail'
]);

require('./Games/Module/GameModule');
require('./Player/Module/PlayerModule');
require('./Home/Module/HomeModule');
require('./Auth/Module/AuthModule');
require('./Games/Module/GameDetailModule');