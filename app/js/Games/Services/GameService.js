module.exports = function($http){
	var urlBase = "http://mahjongmayhem.herokuapp.com"
	var service = {};

	service.getGames = function (callback, filter = '') {
        $http.get(urlBase + "/Games" + filter).then(function(response){
            if(callback) callback(response);
        }, function(err){
            if(callback) callback(err);
        });
    };

    service.getGameTemplates = function (callback) {
        $http.get(urlBase + "/GameTemplates").then(function(response){
            if(callback) callback(response);
        }, function(err){
            if(callback) callback(err);
        });
    };

    service.addGame = function(newGame, callback){
        $http.post(urlBase + "/Games", newGame).then(function(response){
            if(callback) callback(response);
        }, function(err){
            if(callback) callback(err);
        });
    }

    service.addUser = function(_id, callback){
    	$http.post(urlBase + "/Games/"+ _id + "/Players").then(function(response){
            console.log(response);
            if(callback) callback(response);
        }, function(err){
            if(callback) callback(err);
        });
    }

    service.getGameById = function(_id, callback){
    	$http.get(urlBase + "/Games/" + _id).then(function(response){
            if(callback) callback(response);
        }, function(err){
            if(callback) callback(err);
        });
    }

    service.getGameTiles = function(_id, callback){
        $http.get(urlBase + "/Games/" + _id + "/Tiles").then(function(response){
            if(callback) callback(response);
        }, function(err){
            if(callback) callback(err);
        });
    }

    service.startGame = function(_id, callback){
        $http.post(urlBase + "/Games/" + _id + "/Start").then(function(response){
            if(callback) callback(response);
        }, function(err){
            if(callback) callback(err);
        });
    }

    service.postMatchTiles = function(_id, data, callback){
        $http.post(urlBase + "/Games/" + _id + "/Tiles/matches", data).then(function(response){
            if(callback) callback(response);
        }, function(err){
            if(callback) callback(err);
        });
    }

    service.getOpenOrClosedMatches = function(_id, callback, filter = ''){
        $http.get(urlBase + "/Games/" + _id + "/Tiles?matched=" + filter).then(function(response){
            if(callback) callback(response);
        }, function(err){
            if(callback) callback(err);
        });
    }

    service.getMatchedTiles = function(_id, callback){
        $http.get(urlBase + "/Games/" + _id + "/Tiles/matches").then(function(response){
            if(callback) callback(response);
        }, function(err){
            if(callback) callback(err);
        });
    }

	return service;
};