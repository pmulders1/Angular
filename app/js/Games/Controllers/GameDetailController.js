module.exports = function($scope, GameService, $stateParams) {
	var self = this;

	self.game = '';
    self.game.tiles = [];
	self.username = window.localStorage['username'];

	self.succesMessage = '';
	self.errorMessage = '';

	self.matchtiles = [];
	self.possibleMatches = 0;
    self.selected = [];

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
        if(self.selected.indexOf(tile) >= 0){
            tile.clicked = "";
            self.selected.shift();
        }else{
            tile.clicked = "clicked";
            
            angular.forEach(self.game.tiles, function(value, index){
                // Links
                if(value.xPos == tile.xPos - 2 && (value.yPos >= tile.yPos - 1 && value.yPos <= tile.yPos + 1) && value.zPos == tile.zPos){
                    tile.clicked = "";
                }

                // Rechts
                if(value.xPos == tile.xPos + 2 && (value.yPos >= tile.yPos - 1 && value.yPos <= tile.yPos + 1) && value.zPos == tile.zPos){
                    tile.clicked = "";
                }

                // Boven/Op
                if((value.xPos >= tile.xPos - 1 && value.xPos <= tile.xPos + 1) && (value.yPos >= tile.yPos - 1 && value.yPos <= tile.yPos + 1) && value.zPos == tile.zPos + 1){
                    tile.clicked = "";
                }
            });

            if(tile.clicked == "clicked"){
                self.selected.push(tile);
                if(self.selected.length == 2){
                    self.matchTiles(self.selected);
                }
            }
        }
    }
    self.matchTiles = function(matches){
        if((matches[0].tile.matchesWholeSuit && matches[1].tile.matchesWholeSuit && matches[0].tile.suit == matches[1].tile.suit) || (matches[0].tile.suit == matches[1].tile.suit && matches[0].tile.name == matches[1].tile.name)){
            //Mag versturen
            GameService.postMatchTiles(self.game._id, { tile1Id: matches[0]._id, tile2Id: matches[1]._id}, function(response){
                GameService.getOpenOrClosedMatches(self.game_id, function(response){
                    self.game.tiles = response.data;
                }, 'false');
            });
        }else{
            self.errorMessage = "You can't match those tiles! Please try again."
        }
        
        for (var i = 0; i < matches.length; i++) {
            matches[i].clicked = "";
        }
        self.selected = [];
    }
}