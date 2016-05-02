module.exports = function($http){
	var urlBase = "http://mahjongmayhem.herokuapp.com"
	var factory = {};

	var Games = [
		{"_id":"571781bd2c154f1100f89523","createdBy":{"_id":"te.hoff@student.avans.nl","name":"Gebruiker2","__v":0},"createdOn":"2016-04-20T13:18:53.109Z","gameTemplate":{"_id":"Ox","__v":0,"id":"Ox"},"__v":0,"players":[{"_id":"te.hoff@student.avans.nl","name":"Timo Hoff","__v":0}],"maxPlayers":32,"minPlayers":2,"state":"open","id":"571781bd2c154f1100f89523"}, 
		{"_id":"571781812c154f1100f89492","createdBy":{"_id":"te.hoff@student.avans.nl","name":"Gebruiker1","__v":0},"createdOn":"2016-04-20T13:17:53.071Z","gameTemplate":{"_id":"Ox","__v":0,"id":"Ox"},"__v":0,"players":[{"_id":"hallo@student.avans.nl","name":"Test Game","__v":0}],"maxPlayers":32,"minPlayers":2,"state":"playing","id":"571781812c154f1100f89492"}, 
		{"_id":"57177d402c154f1100f89401","createdBy":{"_id":"te.hoff@student.avans.nl","name":"Gebruiker3","__v":0},"createdOn":"2016-04-20T12:59:44.842Z","gameTemplate":{"_id":"Ox","__v":0,"id":"Ox"},"__v":0,"players":[{"_id":"test@student.avans.nl","name":"Paul VS Quinn","__v":0}],"maxPlayers":32,"minPlayers":2,"state":"open","id":"57177d402c154f1100f89401"}
	];

	factory.getGames = function (filter = '') {
        return $http.get(urlBase + "/Games" + filter);
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