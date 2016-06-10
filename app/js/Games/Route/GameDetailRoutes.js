module.exports = function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('/gamedetail/:id', '/gamedetail/:id/details');
    $stateProvider
        .state('gamedetail', {
        	url: '/gamedetail/:id',
            params: {'id': null },
            templateUrl : './js/Games/Views/GameSingleView.html',
            controller  : 'GameDetailController as gDetailController',
            data: {
                permissions: {
                    only: ['loggedin'],
                    redirectTo: 'login'
                }
            }
        })
        .state('gamedetail.details', {
        	url: '/details',
            templateUrl : './js/Games/Views/GameDetailView.html',
            data: {
                permissions: {
                    only: ['loggedin'],
                    redirectTo: 'login'
                }
            }
        })
        .state('gamedetail.board', {
        	url: '/board',
            templateUrl : './js/Games/Views/GameBoardView.html',data: {
                permissions: {
                    only: ['loggedin'],
                    redirectTo: 'login'
                }
            }
        })
        .state('gamedetail.players', {
        	url: '/players',
            templateUrl : './js/Games/Views/GamePlayerView.html',
            data: {
                permissions: {
                    only: ['loggedin'],
                    redirectTo: 'login'
                }
            }
        })
};