module.exports = function($stateProvider) {

    $stateProvider

        .state('gamedetail', {
        	url: '/gamedetail/:id',
            params: {'id': null },
            templateUrl : './js/Games/Views/GameDetailView.html',
            controller  : 'GameDetailController as gDetailController'
        })
};