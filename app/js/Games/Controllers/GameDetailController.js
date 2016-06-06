module.exports = function($scope, GameService, $stateParams) {
	var self = this;

	self.game = '';
	self.username = window.localStorage['username'];

	self.succesMessage = '';
	self.errorMessage = '';

	self.matchtiles = [];
	self.possibleMatches = 0;

    GameService.getGameById($stateParams.id, function(response){

        if(response.status == 200){
        	self.game = response.data;

            GameService.getOpenOrClosedMatches($stateParams.id, function(response){
                self.game.tiles = response;
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
}