module.exports = function($routeProvider) {

    $routeProvider

        .when('/games', {
            templateUrl : './js/Games/Views/GameListView.html',
            controller  : 'GameController as gList'
        })

        .when('/games/add', {
            templateUrl : './js/Games/Views/GameCreateView.html',
            controller  : 'GameController as gCreate'
        })

        .when('/games/:gameId', {
            templateUrl : './js/Games/Views/GameDetailView.html',
            controller  : 'GameDetailController'
        })
};