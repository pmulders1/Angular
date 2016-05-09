module.exports = function($routeProvider) {

    $routeProvider

        // route for the home page
        .when('/home', {
            templateUrl : './js/Home/Views/Home.html',
            controller  : 'HomeController'
        });
};