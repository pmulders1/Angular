/*

TODO: 
- Sockets
- Refreshen viewelementen
	- Gameboard
	- Matches
	- Details van game
	- GameListview
- Eindigen van een match
- Laten zien hoeveel matches er mogelijk zijn
- Spritesheets

TOEVOEGING
- Hints eventueel

Vragen

*/

require('angular/angular');
//require('angular-route/angular-route');
require("angular-permission/dist/angular-permission");
require('angular-ui-router/release/angular-ui-router');

// Create your app
var app = angular.module('webs6', [
    'ui.router',
    'webs6.home',
    'webs6.game',
    'webs6.auth',
    'webs6.socket',
    'webs6.gamedetail',
    'permission'
]);

require('./Home/Module/HomeModule');
require('./Games/Module/GameModule');
require('./Auth/Module/AuthModule');
require('./Games/Module/GameDetailModule');
require('./Socket/Module/SocketModule');

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

app.run(function (PermissionStore, AuthService, $state, $rootScope, $window) {
    PermissionStore.definePermission('loggedin', function (permissionName) {
        return AuthService.isLoggedIn();
    });

    if(AuthService.isLoggedIn()){
        $state.go('games');
    } else {
        $window.location.href = 'http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://localhost:3000/%23/authcallback';
    }
});