(function(){
	'use strict';

	angular.module('app')
        .config( function initRoutes( $stateProvider ) {
            $stateProvider
            .state( 'home', {
                url: '/',
                views: {
                    "header": {
                        controller: 'SearchController',
                        templateUrl: 'views/header/header.tpl.html'
                    },
                    "main": {
                        controller: 'HomeController',
                        templateUrl: 'views/home/home.tpl.html'
                    }
                }
            })
            ;
        })
        .controller( 'SearchController', SearchController)
        .controller( 'HomeController', HomeController);

        function SearchController($scope, Restangular, $state) {

            $scope.search = function () {
                Restangular.one('api').customGET('search',{'q':$scope.query})
                .then(function(result) {
                    $state.transitionTo('results', {'q':$scope.query});
                }, function() {
                    // Show error on screen
                });
            };
        }

        function HomeController($scope, Restangular, $state) {
        }
})();

