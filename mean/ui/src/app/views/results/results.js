(function(){
	'use strict';

	angular.module('app')
        .config( function initRoutes( $stateProvider ) {
            $stateProvider
            .state( 'results', {
                url: '/results?q',
                views: {
                    "main": {
                        controller: 'ResultsController',
                        templateUrl: 'views/results/results.tpl.html'
                    }
                },
                resolve: {
                    countyData: function(Restangular, $stateParams) {
                        return Restangular.one('api').customGET('search',{'q':$stateParams.q});
                    }
                }
            })
            ;
        })
        .controller( 'ResultsController', ResultsController);

        function ResultsController($scope, Restangular, countyData) {
            $scope.countyData = countyData;
            console.log($scope.countyData);

        }
})();

