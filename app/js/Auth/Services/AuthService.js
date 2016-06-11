module.exports = function () {
	return {
		request: request,
		isLoggedIn: isLoggedIn,
		getUser: getUser
	};

	function request(config) {

		config.headers['X-username'] = window.localStorage['username'] != undefined ? window.localStorage['username'] : null;
		config.headers['X-token'] = window.localStorage['token'] != undefined ? window.localStorage['token'] : null;

		return config;
	}

	function isLoggedIn(){
		return window.localStorage['token'] != undefined && window.localStorage['username'] != undefined;
	}

	function getUser(){
		if(isLoggedIn()){
			return window.localStorage['username'];
		}
	}
};