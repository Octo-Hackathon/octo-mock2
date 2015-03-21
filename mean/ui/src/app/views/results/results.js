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

        function ResultsController($scope, Restangular, countyData, $state) {
            $scope.countyData = countyData;

            $scope.search = function () {
                Restangular.one('api').customGET('search',{'q':$scope.query})
                .then(function(result) {
                    $state.transitionTo('results', {'q':$scope.query});
                }, function() {
                    // Show error on screen
                });
            };

        }
})();

