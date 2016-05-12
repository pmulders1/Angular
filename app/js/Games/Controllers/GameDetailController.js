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
    	GameService.getGameTiles(self.game._id).then(function(response){
    		self.game.tiles = response;
    	});
    	GameService.getMatchedTiles($stateParams._id,'false').then(function(response){
			self.possibleMatches = response.length;
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

    		GameService.matchTiles(_id, data).then(function(response){
    			self.succesMessage = "Tiles are a match!";
    		}, function(err){
    			self.errorMessage = err.data.message;
    		});

    		GameService.getMatchedTiles(_id,'false').then(function(response){
				self.possibleMatches = response.length;
			});

    		self.matchtiles = [];
    	} else {
    		self.matchtiles.push(_tileid);
    	}
    }
}