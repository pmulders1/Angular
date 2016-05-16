module.exports = function($http){
	var urlBase = "http://mahjongmayhem.herokuapp.com"
	var service = {};

	service.getGames = function (filter = '') {
        return $http.get(urlBase + "/Games" + filter);
    };

    service.addGame = function(newGame){
        return $http.post(urlBase + "/Games", newGame).then(function(response){
            return response.data;
        });
    }

    service.addUser = function(_id){
    	return $http.post(urlBase + "/Games/"+ _id + "/Players").then(function(response){
            return response.data;
        });
    }

    service.getGameById = function(_id){
    	return $http.get(urlBase + "/Games/" + _id).then(function(response){
            return response.data;
        });
    }

    service.getGameTiles = function(_id){
        return $http.get(urlBase + "/Games/" + _id + "/Tiles").then(function(response){
            return response.data;
        }); 
    }

    service.startGame = function(_id){
        return $http.post(urlBase + "/Games/" + _id + "/Start").then(function(response){
            return response.data;
        });
    }

    service.postMatchTiles = function(_id, data){
        return $http.post(urlBase + "/Games/" + _id + "/Tiles/matches", data).then(function(response){
            return response.data;
        }); 
    }

    service.getOpenOrClosedMatches = function(_id, filter = ''){
        return $http.get(urlBase + "/Games/" + _id + "/Tiles?matched=" + filter).then(function(response){
            return response.data;
        }); 
    }

    service.getMatchedTiles = function(_id){
        return $http.get(urlBase + "/Games/" + _id + "/Tiles/matches").then(function(response){
            return response.data;
        });
    }

	return service;
};