/*

TODO: 
- Gametemplates ophalen
- Css verbeteren
	- applicatie centreren
	- Messages verbeteren
- Lijst van games zien hoeveel players en max players.
- Lijst van games button uitzetten als je niet mag joinen.
- Profile/Homepage
- Services ombouwen + de aanroepende functies
- TESTS!!!

Vragen
- We krijgen de directive niet aan de praat, de template wordt niet gevonden geeft een 404 not found terug
- Er komt een fout op bij het runnen van npm test -> angular not found. Wat moeten we doen om dit op te lossen?
- Een match is gemaakt maar het bord is nog hetzelfde moeten mogen we het scherm gewoon refreshen?
- Sockets example
- Sass krijgen we niet geinstalleerd.
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

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthService');
});