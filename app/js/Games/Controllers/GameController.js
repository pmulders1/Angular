var Game = require('../Models/Game');

module.exports = function($scope, GameFactory, $routeParams){
	var self = this;
	self.games = [];
	self.status;
	self.message = "test"
	self.gameId = $routeParams.gameId;
	

	self.game = {
		"_id":"","createdBy":{},"createdOn":"","gameTemplate":{},"__v":0,"players":[],"maxPlayers":0,"minPlayers":0,"state":"open"
	}

	getGames();

	function getGames(){
		GameFactory.getGames('?state=open')

		.then(function (response) {

			for(var i = 0; i < response.data.length; i++){
				var game = new Game(response.data[i]);
				self.games.push(game);
			}
		}, function (error) {
		    self.status = 'Unable to load customer data: ' + error.message;
		});
	}

	self.addUser = function(_id){
		var user = {"_id":"te.hoff@student.avans.nl","name":"Harry","__v":0};
		GameFactory.addUser(_id, user);
	}

	self.addGame = function(Game){
		console.log('hi')
		var newGame = {};

		newGame.createdBy = {"_id":"te.hoff@student.avans.nl","name":"Gebruiker2","__v":0}
		newGame.createdOn = new Date()
		newGame.gameTemplate = {"_id":"Ox","__v":0,"id":"Ox"};

		newGame.minPlayers = Game.minPlayers;
		newGame.maxPlayers = Game.maxPlayers;
		newGame.state = Game.state;

		GameFactory.addGame(newGame);
	}
}