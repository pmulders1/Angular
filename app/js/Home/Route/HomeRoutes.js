module.exports = function($stateProvider) {

    /*$routeProvider

        // route for the home page
        .when('/home', {
            templateUrl : './js/Home/Views/Home.html',
            controller  : 'HomeController'
        });*/

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: './js/Home/Views/Home.html',
            controller: 'HomeController',
        });
};