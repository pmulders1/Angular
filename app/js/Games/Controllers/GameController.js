var Game = require('../Models/Game');

module.exports = function($scope, GameService, $stateParams){
	var self = this;
	self.games = [];
	self.status;
	self.gameId = $stateParams.gameId;
	

	self.game = {
		"templateName": "","minPlayers": 0,"maxPlayers": 0
		//"_id":"","createdBy":{},"createdOn":"","gameTemplate":{},"__v":0,"players":[],"maxPlayers":0,"minPlayers":0,"state":"open"
	}

	getGames();

	function getGames(){
		GameService.getGames('?state=open')

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
		GameService.addUser(_id, user);
	}

	self.addGame = function(Game){
		GameService.addGame(Game);
	}

	
}