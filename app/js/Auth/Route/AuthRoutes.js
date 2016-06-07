module.exports = function($stateProvider, $locationProvider) {

    $stateProvider
        .state('authcallback', {
        	//template: ' ',
        	url: '/authcallback?:username&:token',
            templateUrl : './js/Auth/Views/PlayerProfile.html',
            controller  : 'AuthController'
        });
};