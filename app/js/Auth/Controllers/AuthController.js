module.exports = function($scope, AuthService, $stateParams, $state){
	var self = this;

	self.login = function(){
		if(!AuthService.isLoggedIn()){
			if($stateParams.token != undefined && $stateParams.username != undefined){
				window.localStorage['token'] = $stateParams.token;
				window.localStorage['username'] = $stateParams.username;
			}
		}
		
		$state.go('games');
	}

	self.login();
}