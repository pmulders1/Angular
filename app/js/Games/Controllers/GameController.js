var Game = require('../Models/Game');

module.exports = function($scope, GameFactory, $routeParams){
	$scope.games = [];
	$scope.status;
	$scope.message = "test"
	$scope.gameId = $routeParams.gameId;
	

	$scope.game = {
		"_id":"","createdBy":{},"createdOn":"","gameTemplate":{},"__v":0,"players":[],"maxPlayers":0,"minPlayers":0,"state":"open"
	}

	getGames();

	function getGames(){
		GameFactory.getGames(/*'?state=open'*/)

		.then(function (response) {

			for(var i = 0; i < response.data.length; i++){
				console.log('controller', response.data[i]);
				var game = new Game(response.data[i]);
				$scope.games.push(game);
			}
			console.log($scope.games);
		}, function (error) {
		    $scope.status = 'Unable to load customer data: ' + error.message;
		});
	}

	$scope.addUser = function(_id){
		var user = {"_id":"te.hoff@student.avans.nl","name":"Harry","__v":0};
		GameFactory.addUser(_id, user);
	}

	$scope.addGame = function(Game){
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