module.exports = function($http){
	var urlBase = "http://mahjongmayhem.herokuapp.com"
	var factory = {};

	var Games = [
	];

	factory.getGames = function (filter = '') {
        Games = $http.get(urlBase + "/Games" + filter);
        console.log(Games);
        return Games;
        //return Games;
    };

    factory.addGame = function(newGame){
    	Games.push(newGame);
    }

    factory.addUser = function(_id, user){
    	for(var i = 0; i < Games.length; i++){
    		if(Games[i]._id == _id){
    			Games[i].players.push(user);
    		}
    	}
    }

    factory.getGameById = function(_id){
    	for(var i = 0; i < Games.length; i++){
    		if(Games[i]._id == _id){
    			return Games[i];
    		}
    	}
    }

	return factory;
};