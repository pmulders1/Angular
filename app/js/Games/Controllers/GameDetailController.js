module.exports = function($scope, GameService, SocketService, $stateParams) {
	var self = this;

	self.game = '';
    self.game.tiles = [];
    self.game.players = [];
	self.username = window.localStorage['username'];

	self.succesMessage = '';
	self.errorMessage = '';

	self.matchtiles = [];
	self.possibleMatches = 0;
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
        console.log(data);
        console.log(self.game.tiles.length);
        console.log(self.game.tiles.indexOf(data[0]._id));
        for(var i = 0; i < self.game.tiles.length; i++){
            if(self.game.tiles[i]._id == data[0]._id){
                console.log("Splitting first");
                //self.game.tiles.splice(i, 1);
                //delete self.game.tiles[i];
                self.game.tiles[i].matched = true;
                break;
            }
        }
        for(var i = 0; i < self.game.tiles.length; i++){
            if(self.game.tiles[i]._id == data[1]._id){
                console.log("Splitting second");
                //self.game.tiles.splice(i, 1);
                //delete self.game.tiles[i];
                self.game.tiles[i].matched = true;
                break;
            }
        }
        console.log(self.game.tiles);
        //self.getNumberOfPossibleMatches();
        //self.getMatchedTiles();
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
        }, 'false');

        self.getNumberOfPossibleMatches();

        self.getMatchedTiles();
    }

    self.getNumberOfPossibleMatches = function(){
        // TODO AANPASSEN!!
        GameService.getOpenOrClosedMatches($stateParams.id, function(response){
            self.possibleMatches = response.data.length / 2;
        }, 'false');
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