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

	describe('canCreateGame', function(){
		it('should return false when game template is not given', function(){
			//Arange
			var game = {
				templateName: undefined,
				minPlayers: 1,
				maxPlayers: 1
			}
			//Act
			gameCtrl.addGame(game);
			//Assert
			expect(gameCtrl.errorMessage).to.be.equal("There is an error in one of the input fields. Please try again!");
		});

		it('should return false when minPlayers is lower then 1', function(){
			//Arange
			var game = {
				templateName: "Ox",
				minPlayers: 0,
				maxPlayers: 1
			}
			//Act
			gameCtrl.addGame(game);
			//Assert
			expect(gameCtrl.errorMessage).to.be.equal("There is an error in one of the input fields. Please try again!");
		});

		it('should return false when maxPlayers is lower then 1', function(){
			//Arange
			var game = {
				templateName: "Ox",
				minPlayers: 1,
				maxPlayers: 0
			}
			//Act
			gameCtrl.addGame(game);
			//Assert
			expect(gameCtrl.errorMessage).to.be.equal("There is an error in one of the input fields. Please try again!");
		});

		it('should return false when maxPlayers is lower then minPlayers', function(){
			//Arange
			var game = {
				templateName: "Ox",
				minPlayers: 2,
				maxPlayers: 1
			}
			//Act
			gameCtrl.addGame(game);
			//Assert
			expect(gameCtrl.errorMessage).to.be.equal("There is an error in one of the input fields. Please try again!");
		});
	});
});