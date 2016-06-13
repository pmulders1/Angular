module.exports = function($scope, GameService, SocketService, $stateParams) {
	var self = this;

	self.game = '';
    self.game.tiles = [];
    self.game.players = [];
	self.username = window.localStorage['username'];

	self.succesMessage = '';
	self.errorMessage = '';

	self.matchtiles = [];
	self.possibleMatches = [];
    self.selected = [];

    SocketService.connect($stateParams.id);

    SocketService.listenStart(function(){
        self.game.state = 'playing';
        self.getGameData();
        self.succesMessage = "Game has started!";
    });

    SocketService.listenEnd(function(){
        self.game.state = 'end';
        self.getGameData();
        self.errorMessage = "Game has ended!";
    });

    SocketService.listenPlayerJoined(function(data){
        self.game.players.push(data);
    });

    SocketService.listenMatch(function(data){
        self.getGameData();
    });

    GameService.getGameById($stateParams.id, function(response){
        
        if(response.status == 200){
        	self.game = response.data;

            if(self.game.state != 'open'){
                self.getGameData();
            }
        } else {
            self.errorMessage = response.data.message;
        }
    });

    self.getGameData = function(){
        GameService.getOpenOrClosedMatches($stateParams.id, function(response){
            self.game.tiles = response.data;

            self.getNumberOfPossibleMatches();

            self.getMatchedTiles();
        }, 'false');
    }

    self.getNumberOfPossibleMatches = function(){
        // TODO AANPASSEN!!
        var clickAbleTiles = [];
        self.possibleMatches = [];
        var count = 0;

        angular.forEach(self.game.tiles, function(value, index){
            if(self.canClick(value)){
                clickAbleTiles.push(value);
            }
        });
        for(var i = 0; i < clickAbleTiles.length; i++){
            for(var j = 0; j < clickAbleTiles.length; j++){
                if(i == j) continue;

                if((clickAbleTiles[i].tile.matchesWholeSuit && clickAbleTiles[j].tile.matchesWholeSuit && clickAbleTiles[i].tile.suit == clickAbleTiles[j].tile.suit) || (clickAbleTiles[i].tile.suit == clickAbleTiles[j].tile.suit && clickAbleTiles[i].tile.name == clickAbleTiles[j].tile.name)){
                    if(self.possibleMatches.indexOf(clickAbleTiles[i]._id) == -1 && self.possibleMatches.indexOf(clickAbleTiles[j]._id) == -1){
                        self.possibleMatches.push(clickAbleTiles[i]._id);
                        self.possibleMatches.push(clickAbleTiles[j]._id);
                    }
                }
            }
        }
    }

    self.getMatchedTiles = function(){
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
    }

    self.startGame = function(_id){
    	GameService.startGame(_id, function(response){
            if(response.status == 200){
                self.succesMessage = "Game has started!";
            } else {
                self.errorMessage = response.data.message;
            }
    	});
    }
    self.CheckMatch = function(tile){
        if(self.selected.indexOf(tile) >= 0){
            tile.clicked = "";
            self.selected.shift();
        }else{
            if(self.canClick(tile)){
                tile.clicked = "clicked";
                self.selected.push(tile);
                if(self.selected.length == 2){
                    self.matchTiles(self.selected);
                }
            } else {
                tile.clicked = "";
            }
        }
    }
    self.canClick = function(tile){
        var check = true;
        var currentPlayer = false;

        for (var i = 0; i < self.game.players.length; i++) {
            if(self.game.players[i]._id == self.username){
                currentPlayer = true;
            }       
        }

        if(!currentPlayer){
            check = false;
        } else {
            var left = false;
            var right = false;
            var top = false;

            angular.forEach(self.game.tiles, function(value, index){
                if(value.xPos == tile.xPos - 2 && (value.yPos >= tile.yPos - 1 && value.yPos <= tile.yPos + 1) && value.zPos == tile.zPos){
                    left = true;
                }

                // Rechts
                if(value.xPos == tile.xPos + 2 && (value.yPos >= tile.yPos - 1 && value.yPos <= tile.yPos + 1) && value.zPos == tile.zPos){
                    right = true;
                }

                // Boven/Op
                if((value.xPos >= tile.xPos - 1 && value.xPos <= tile.xPos + 1) && (value.yPos >= tile.yPos - 1 && value.yPos <= tile.yPos + 1) && value.zPos == tile.zPos + 1){
                    top  = true;
                }
                
            });

            if((left && right) || top) {
                check = false;
            }
        }
        return check;
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

    self.changeMatch = function(index){ 
        $scope.match = index < 0 ? undefined : self.game.players[index]._id;
    }

    $scope.search = function(model){
        if($scope.match == undefined){
            return true;
        }
        return model.player.foundBy == $scope.match ? true : false;
    }
}