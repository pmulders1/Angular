module.exports = function($routeProvider) {

    $routeProvider
        .when('/authcallback', {
            templateUrl : './js/Player/Views/PlayerProfile.html',
            controller  : 'PlayerController'
        });
};