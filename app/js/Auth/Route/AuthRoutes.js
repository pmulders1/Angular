module.exports = function($routeProvider) {

    $routeProvider
        .when('/authcallback', {

        	template: ' ',
            //templateUrl : './js/Player/Views/PlayerProfile.html',
            controller  : 'PlayerController'
        });
};