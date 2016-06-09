/*

TODO: 
- Profile/Homepage -> doorsturen naar login + tonen dat iemand is ingelogd
- Sockets
- Refreshen viewelementen
	- Gameboard
	- Matches
	- Details van game
	- GameListview
- Uitstraling van game detail views
- Filters op matches
- Error message over inloggen bij click op tile

TOEVOEGING
- Hints eventueel

Vragen

*/

require('angular/angular');
//require('angular-route/angular-route');
require('angular-ui-router/release/angular-ui-router');

// Create your app
var app = angular.module('webs6', [
    'ui.router',
    'webs6.home',
    'webs6.game',
    'webs6.auth',
    'webs6.gamedetail'
]);

require('./Home/Module/HomeModule');
require('./Games/Module/GameModule');
require('./Auth/Module/AuthModule');
require('./Games/Module/GameDetailModule');

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthService');
});

app.directive('tile', function(){
	return{
		restrict: 'E',
		templateUrl: "./js/Directives/tileTemplate.html",
		scope: {
			tile: "=",
			onSelect: "=?"
		},
		controller: function($scope){
			var self = this;
			self.canClick = function(tile){
				self.onSelect(tile);
			}
		},
		controllerAs: 't',
        bindToController: true
	}
});