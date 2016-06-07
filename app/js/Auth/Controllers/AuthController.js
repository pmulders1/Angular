module.exports = function($scope, $stateParams, $state){
	var self = this;
	if(window.localStorage['token'] == undefined && window.localStorage['username'] == undefined){
		if($stateParams.token != undefined && $stateParams.username != undefined){
			window.localStorage['token'] = $stateParams.token;
			window.localStorage['username'] = $stateParams.username;
		}
	}
	
	$state.go('games');
}