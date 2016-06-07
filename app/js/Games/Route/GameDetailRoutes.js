module.exports = function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('/gamedetail/:id', '/gamedetail/:id/details');
    $stateProvider
        .state('gamedetail', {
        	url: '/gamedetail/:id',
            params: {'id': null },
            templateUrl : './js/Games/Views/GameSingleView.html',
            controller  : 'GameDetailController as gDetailController'
        })
        .state('gamedetail.details', {
        	url: '/details',
            templateUrl : './js/Games/Views/GameDetailView.html'
        })
        .state('gamedetail.board', {
        	url: '/board',
            templateUrl : './js/Games/Views/GameBoardView.html'
        })
        .state('gamedetail.players', {
        	url: '/players',
            templateUrl : './js/Games/Views/GamePlayerView.html'
        })
};