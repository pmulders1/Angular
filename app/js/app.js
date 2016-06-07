/*

TODO: 
- Css verbeteren
	- applicatie centreren
	- Messages verbeteren
- Profile/Homepage
- TESTS!!!

Vragen
- We krijgen de directive niet aan de praat, de template wordt niet gevonden geeft een 404 not found terug
- Er komt een fout op bij het runnen van npm test -> angular not found. Wat moeten we doen om dit op te lossen?
- Een match is gemaakt maar het bord is nog hetzelfde moeten mogen we het scherm gewoon refreshen?
- Sockets example
- Match comparer
- Moeten wij zelf een functie canJoinGame maken? want zover wij weten krijgen we al een goede response terug.
- uit de rubic: 
	Maak hier slechts gebruik van 1 lijst van tegels per game.
	Als gebruiker wil ik verschillende lobby's van games (leeg, spectate, history)
	Als gebruiker wil ik een tab binnen een game zien met het gameboard
	Als gebruiker wil ik een tab binnen een game zien met alle gespeelde zetten
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