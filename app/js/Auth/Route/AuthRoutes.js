module.exports = function($stateProvider, $locationProvider) {

    $stateProvider
        .state('authcallback', {
        	//template: ' ',
        	url: '/authcallback?:username&:token',
            templateUrl: './js/Games/Views/GameListView.html',
            controller  : 'AuthController'
        });
};