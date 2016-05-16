module.exports = function($scope, GameService, $stateParams) {
	var self = this;

	self.game = '';
	self.username = window.localStorage['username'];

	self.succesMessage = '';
	self.errorMessage = '';

	self.matchtiles = [];
	self.possibleMatches = 0;

    GameService.getGameById($stateParams._id).then(function(response){
    	self.game = response;

        GameService.getOpenOrClosedMatches(self.game._id, 'false').then(function(response){
            console.log("getOpenOrClosedMatches:");
            console.log(response);
            self.game.tiles = response;
        });

    	GameService.getOpenOrClosedMatches($stateParams._id,'false').then(function(response){
			self.possibleMatches = response.length;
		});
        GameService.getMatchedTiles($stateParams._id).then(function(response){
            self.game.matched = [];
            for(var i = 0; i < response.length; i+=2){
                var match = {
                    "tile1":response[i].tile,
                    "tile2":response[i+1].tile,
                    "player":response[i].match
                }
                self.game.matched.push(match);
            }
        });
    }, function(err){
		self.errorMessage = err.data.message;
    });

    self.startGame = function(_id){
    	GameService.startGame(_id).then(function(response){
    		self.succesMessage = "Game has started!";
    	}, function(err){
    		self.errorMessage = err.data.message;
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

    		GameService.postMatchTiles(_id, data).then(function(response){
    			self.succesMessage = "Tiles are a match!";
    		}, function(err){
    			self.errorMessage = err.data.message;
    		});

    		GameService.getOpenOrClosedMatches(_id,'false').then(function(response){
				self.possibleMatches = response.length;
			});

    		self.matchtiles = [];
    	} else {
    		self.matchtiles.push(_tileid);
    	}
    }
}