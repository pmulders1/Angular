describe("GameCtrl", function(){

	var gameFactory;
	var scope;
	var gameDetailCtrl;

	beforeEach(function(){
		module("webs6");
		
		inject(function($rootScope, $controller, $injector){
			scope = $rootScope.$new();
			gameFactory = $injector.get("GameService");
			gameDetailCtrl = $controller("GameDetailController", {$scope: scope});
		});
	});

	describe("canClickTile", function(){

		it('should return false when two tiles left and right', function(){
			gameDetailCtrl.game = {
				tiles: []
			}

			// Arange
			var tile1 = {
				xPos: 1,
				yPos: 1,
				zPos: 1
			}
			var tile2 = {
				xPos: 3,
				yPos: 1,
				zPos: 1
			}
			var tile3 = {
				xPos: 5,
				yPos: 1,
				zPos: 1
			}

			gameDetailCtrl.game.tiles.push(tile1);
			gameDetailCtrl.game.tiles.push(tile2);
			gameDetailCtrl.game.tiles.push(tile3);

			//Act
			gameDetailCtrl.canClick(tile2);
			//Assert
			expect(tile2.clicked).to.be.equal("");
		});

		it('should return false when one tile on top', function(){
			gameDetailCtrl.game = {
				tiles: []
			}

			// Arange
			var tile1 = {
				xPos: 1,
				yPos: 1,
				zPos: 0
			}
			var tile2 = {
				xPos: 1,
				yPos: 1,
				zPos: 1
			}
			var tile3 = {
				xPos: 1,
				yPos: 1,
				zPos: 2
			}

			gameDetailCtrl.game.tiles.push(tile1);
			gameDetailCtrl.game.tiles.push(tile2);
			gameDetailCtrl.game.tiles.push(tile3);

			//Act
			gameDetailCtrl.canClick(tile2);
			//Assert
			expect(tile2.clicked).to.be.equal("");
		});

		it('should return true when current tile on top', function(){
			gameDetailCtrl.game = {
				tiles: []
			}

			// Arange
			var tile1 = {
				xPos: 1,
				yPos: 1,
				zPos: 0
			}
			var tile2 = {
				xPos: 1,
				yPos: 1,
				zPos: 1
			}
			var tile3 = {
				xPos: 3,
				yPos: 1,
				zPos: 0
			}

			gameDetailCtrl.game.tiles.push(tile1);
			gameDetailCtrl.game.tiles.push(tile2);
			gameDetailCtrl.game.tiles.push(tile3);

			//Act
			gameDetailCtrl.canClick(tile2);
			//Assert
			expect(tile2.clicked).to.be.equal("clicked");
		});

	});
	describe("canMatchTile", function(){ 
		it('should return false when one have WholeSuitFalse on true', function(){
			gameDetailCtrl.game = {
				tiles: []
			}
			gameDetailCtrl.selected = [];

			// Arange
			var tile1 = {
				xPos: 1,
				yPos: 1,
				zPos: 1,
				tile: {
					suit: "Character",
					name: "2",
					matchesWholeSuit: true
				}
			}
			var tile2 = {
				xPos: 3,
				yPos: 1,
				zPos: 1,
				tile: {
					suit: "Character",
					name: "4",
					matchesWholeSuit: false
				}
			}

			gameDetailCtrl.game.tiles.push(tile1);
			gameDetailCtrl.game.tiles.push(tile2);

			gameDetailCtrl.selected.push(tile1);
			gameDetailCtrl.selected.push(tile2);

			//Act
			gameDetailCtrl.matchTiles(gameDetailCtrl.selected);
			//Assert
			expect(gameDetailCtrl.errorMessage).to.be.equal("You can't match those tiles! Please try again.");
		});

		it('should return false when two have WholeSuitFalse on true and suits are different', function(){
			gameDetailCtrl.game = {
				tiles: []
			}
			gameDetailCtrl.selected = [];

			// Arange
			var tile1 = {
				xPos: 1,
				yPos: 1,
				zPos: 1,
				tile: {
					suit: "Character",
					name: "2",
					matchesWholeSuit: true
				}
			}
			var tile2 = {
				xPos: 3,
				yPos: 1,
				zPos: 1,
				tile: {
					suit: "Bamboo",
					name: "4",
					matchesWholeSuit: false
				}
			}

			gameDetailCtrl.game.tiles.push(tile1);
			gameDetailCtrl.game.tiles.push(tile2);

			gameDetailCtrl.selected.push(tile1);
			gameDetailCtrl.selected.push(tile2);

			//Act
			gameDetailCtrl.matchTiles(gameDetailCtrl.selected);
			//Assert
			expect(gameDetailCtrl.errorMessage).to.be.equal("You can't match those tiles! Please try again.");
		});

		it('should return false when two have WholeSuitFalse on false and names are different', function(){
			gameDetailCtrl.game = {
				tiles: []
			}
			gameDetailCtrl.selected = [];

			// Arange
			var tile1 = {
				xPos: 1,
				yPos: 1,
				zPos: 1,
				tile: {
					suit: "Character",
					name: "2",
					matchesWholeSuit: false
				}
			}
			var tile2 = {
				xPos: 3,
				yPos: 1,
				zPos: 1,
				tile: {
					suit: "Character",
					name: "3",
					matchesWholeSuit: false
				}
			}

			gameDetailCtrl.game.tiles.push(tile1);
			gameDetailCtrl.game.tiles.push(tile2);

			gameDetailCtrl.selected.push(tile1);
			gameDetailCtrl.selected.push(tile2);

			//Act
			gameDetailCtrl.matchTiles(gameDetailCtrl.selected);
			//Assert
			expect(gameDetailCtrl.errorMessage).to.be.equal("You can't match those tiles! Please try again.");
		});
	});
});