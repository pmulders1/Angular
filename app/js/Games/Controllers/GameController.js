var Game = require('../Models/Game');

module.exports = function($scope, GameService, $stateParams){
	var self = this;
	self.games = [];
	self.status;
	self.gameId = $stateParams.gameId;
	
	self.succesMessage = '';
	self.errorMessage = '';

	self.game = {
		"templateName": "","minPlayers": 0,"maxPlayers": 0
		//"_id":"","createdBy":{},"createdOn":"","gameTemplate":{},"__v":0,"players":[],"maxPlayers":0,"minPlayers":0,"state":"open"
	}

	getGames();

	function getGames(){

		GameService.getGames(function(response){
			if(response.status == '200'){
				for(var i = 0; i < response.data.length; i++){
					var game = new Game(response.data[i]);
					self.games.push(game);
				}
			} else {
				self.status = 'Unable to load customer data: ' + error.message;
			}
		});
	}

	self.addUser = function(_id){
		self.succesMessage = '';
		self.errorMessage = '';

		GameService.addUser(_id, function(response){
			if(response.status == 200){
				self.succesMessage = "You joined the game with id: " + _id;
			} else {
				self.errorMessage = response.data.message;
			}
		});
	}

	self.addGame = function(Game){
		self.succesMessage = '';
		self.errorMessage = '';

		GameService.addGame(Game, function(response){
			if(response.status == 200){
				self.succesMessage = "Game has been succesfully created!";
			} else {
				self.errorMessage = response.data.message;
			}
		});
	}
}