module.exports = function($http){
	var urlBase = "http://mahjongmayhem.herokuapp.com"
	var factory = {};

	factory.getGames = function (filter = '') {
        return $http.get(urlBase + "/Games" + filter);
    };

	return factory;
};