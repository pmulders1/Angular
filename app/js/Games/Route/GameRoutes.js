module.exports = function($stateProvider, $locationProvider) {

	$stateProvider

        .state('games', {
            url: '/games',
            templateUrl: './js/Games/Views/GameListView.html',
            controller: 'GameController as gList',
            data: {
                permissions: {
                    only: ['loggedin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('addgame', {
        	url: '/games/add',
            templateUrl : './js/Games/Views/GameCreateView.html',
            controller  : 'GameController as gCreate',
            data: {
                permissions: {
                    only: ['loggedin'],
                    redirectTo: 'login'
                }
            }
        });

};