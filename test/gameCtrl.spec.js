describe("GameCtrl", function(){

	var gameFactory;
	var scope;
	var gameCtrl;

	beforeEach(function(){
		module("WEBS6");
		
		inject(function($rootScope, $controller, $injector){
			scope = $rootScope.$new();
			gameFactory = $injector.get("GameFactory");
			gameCtrl = $controller("GameController", {$scope: scope});


		});
	});

	describe("getGames", function(){

		it("should return 2 games", function(){

			// // Arrange
			// gameCtrl.getGames();
			// // Act

			// // Assert
			// gameCtrl.games
		});

		it("should call addGame once", function(){
			var game = { 
				"templateName": "Ox","minPlayers": 1,"maxPlayers": 2
			}

			gameFactory.addGame = sinon.stub();
			gameFactory.addGame.withArgs(game).returns({
				templateName: game.templateName, minPlayers: game.minPlayers, maxPlayers: game.maxPlayers
			});

			var actual = gameCtrl.addGame(game);

			expect(actual.templateName).to.equal(game.templateName);
			expect(actual.minPlayers).to.equal(game.minPlayers);
			expect(actual.maxPlayers).to.equal(game.maxPlayers);
		});
	});
});