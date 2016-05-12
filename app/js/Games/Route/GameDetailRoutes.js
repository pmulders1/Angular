module.exports = function($stateProvider) {

    $stateProvider

        .state('gamedetail', {
        	url: '/gamedetail',
            templateUrl : './js/Games/Views/GameDetailView.html',
            controller  : 'GameDetailController as gDetailController',
			params: {
				_id: null
			}

        })
};