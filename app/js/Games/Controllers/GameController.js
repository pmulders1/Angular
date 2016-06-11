var Game = require('../Models/Game');

module.exports = function($scope, AuthService,GameService, $stateParams){
	var self = this;
	self.games = [];
	self.gameTemplates = [];
	self.status;
	self.gameId = $stateParams.gameId;
	
	self.userId = AuthService.getUser();

	self.succesMessage = '';
	self.errorMessage = '';

	self.game = {
		"templateName": "","minPlayers": 0,"maxPlayers": 0
	}

	getGames();
	getGameTemplates();

	function getGames(){
		GameService.getGames(function(response){
			if(response.status == 200){
				for(var i = 0; i < response.data.length; i++){
					var game = new Game(response.data[i]);
					self.games.push(game);
				}
			} else {
				self.status = 'Unable to load customer data: ' + error.message;
			}
		});
	}

	function getGameTemplates(){
		GameService.getGameTemplates(function(response){
			if(response.status == 200){
				for(var i = 0; i < response.data.length; i++){
					self.gameTemplates.push(response.data[i]._id);
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

		if(Game.templateName == undefined || Game.maxPlayers < 1 || Game.minPlayers < 1 || Game.maxPlayers < Game.minPlayers){
			self.errorMessage = "There is an error in one of the input fields. Please try again!"
		}else{
			GameService.addGame(Game, function(response){
				if(response.status == 200){
					self.succesMessage = "Game has been succesfully created!";
				} else {
					self.errorMessage = response.data;
				}
			});
		}
	}

	self.changeModel = function(bool){ 
        $scope.model = !bool ? undefined : self.userId;
    }

    $scope.myGames = function(model){
        if($scope.model == undefined){
            return true;
        }
        return model.createdBy._id == $scope.model ? true : false;
    }
}