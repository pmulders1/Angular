module.exports = function($routeProvider) {

    $routeProvider

        .when('/games/:gameId', {
            templateUrl : './js/Games/Views/GameDetailView.html',
            controller  : 'GameDetailController'
        })
};