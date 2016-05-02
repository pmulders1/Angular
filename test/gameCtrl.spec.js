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

			// Arrange

			// Act

			// Assert
			gameCtrl.games
		});

	});
});