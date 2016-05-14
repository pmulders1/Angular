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
		GameService.getGames()

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
		self.succesMessage = '';
		self.errorMessage = '';

		GameService.addUser(_id).then(function(response){
			self.succesMessage = "You joined the game with id: " + _id;
		}, function(err){
			self.errorMessage = err.data.message;
		});
	}

	self.addGame = function(Game){
		self.succesMessage = '';
		self.errorMessage = '';

		GameService.addGame(Game).then(function(response){
			self.succesMessage = "Game has been succesfully created!";
		}, function(err){
			self.errorMessage = err.data.message;
		});
	}

	self.applySearchFilter = function(term){
		console.log(term);
	}
}