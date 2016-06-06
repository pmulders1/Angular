describe("GameCtrl", function(){

	var gameFactory;
	var scope;
	var gameCtrl;

	beforeEach(function(){
		module("webs6");
		
		inject(function($rootScope, $controller, $injector){
			scope = $rootScope.$new();
			gameFactory = $injector.get("GameService");
			gameCtrl = $controller("GameController", {$scope: scope});
		});
	});

	describe('canJoinGame', function(){
		it('should return false when full', function(){

			var game = {
				minPlayers: 2,
				maxplayers: 3,
				players: [{}, {}, {}]
			};

			//act
			var result = gameCtrl.canJoinGame(game);

			expect(result).to.be.false;
		});
		it('should return false when not open');
		it('should return false when not logged in');
		it('should return true when spot free');

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
				then: function(callback){
					callback({templateName: game.templateName, minPlayers: game.minPlayers, maxPlayers: game.maxPlayers })
				}}
			);

			var actual = gameCtrl.addGame(game);

			//expect(gameCtrl.successMsg).to.be.equal("A game has been created");


			expect(actual.templateName).to.equal(game.templateName);
			expect(actual.minPlayers).to.equal(game.minPlayers);
			expect(actual.maxPlayers).to.equal(game.maxPlayers);
		});
	});
});