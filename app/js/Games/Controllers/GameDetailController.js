module.exports = function($scope, GameService, $stateParams) {
	var self = this;

	self.game = '';
	self.username = window.localStorage['username'];

	self.succesMessage = '';
	self.errorMessage = '';

	self.matchtiles = [];
	self.possibleMatches = 0;
    self.selected = null;

    GameService.getGameById($stateParams.id, function(response){

        if(response.status == 200){
        	self.game = response.data;

            GameService.getOpenOrClosedMatches($stateParams.id, function(response){
                self.game.tiles = response.data;
            }, 'false');

        	GameService.getOpenOrClosedMatches($stateParams.id, function(response){
    			self.possibleMatches = response.length;
    		},'false');

            GameService.getMatchedTiles($stateParams.id, function(response){
                self.game.matched = [];
                for(var i = 0; i < response.data.length; i+=2){
                    var match = {
                        "tile1":response.data[i].tile,
                        "tile2":response.data[i+1].tile,
                        "player":response.data[i].match
                    }
                    self.game.matched.push(match);
                }
            });
        } else {
            self.errorMessage = response.data.message;
        }
    });

    self.startGame = function(_id){
    	GameService.startGame(_id, function(response){
            if(response.status == 200){
                self.succesMessage = "Game has started!";
            } else {
                self.errorMessage = response.data.message;
            }
    	});
    }

    self.matchTiles = function(_id, _tileid){
    	self.succesMessage = '';
		self.errorMessage = '';

    	if(self.matchtiles.length > 0){
    		var data = {
    			tile1Id: self.matchtiles[0],
    			tile2Id: _tileid
    		}

    		GameService.postMatchTiles(_id, data, function(response){
                if(response.status == 200){
                    self.succesMessage = "Tiles are a match!";
                } else {
                    self.errorMessage = response.data.message;
                }
    		});

    		GameService.getOpenOrClosedMatches(_id, function(response){
				self.possibleMatches = response.length;
			}, 'false');

    		self.matchtiles = [];
    	} else {
    		self.matchtiles.push(_tileid);
    	}
    }

    self.canClick = function(tile){
        if(tile.clicked != "" && tile.clicked != null){
            tile.clicked = "";
            self.selected = null;
        }else{
            tile.clicked = "clicked";
            angular.forEach(self.game.tiles, function(value, index){
                
                // Links
                if(value.xPos == tile.xPos - 2 && (value.yPos >= tile.yPos - 1 && value.yPos <= tile.yPos + 1) && value.zPos == tile.zPos){
                    tile.clicked = "";
                    return;
                }

                // Rechts
                if(value.xPos == tile.xPos + 2 && (value.yPos >= tile.yPos - 1 && value.yPos <= tile.yPos + 1) && value.zPos == tile.zPos){
                    tile.clicked = "";
                    return;
                }

                // Boven/Op
                if((value.xPos >= tile.xPos - 1 && value.xPos <= tile.xPos + 1) && (value.yPos >= tile.yPos - 1 && value.yPos <= tile.yPos + 1) && value.zPos == tile.zPos + 1){
                    tile.clicked = "";
                    return;
                }
            });

            if(self.selected != null){
                console.log("twee");
            }else{
                self.selected = tile;
            }
        }
    }
}