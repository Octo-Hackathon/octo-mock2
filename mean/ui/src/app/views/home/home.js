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

        function SearchController($scope, Restangular, $state, $filter) {
            $scope.hasError = 0;
            $scope.search = function () {
                Restangular.one('api').customGET('search',{'q':$scope.query})
                .then(function(result) {
                    $scope.hasError = 0;
                    $state.transitionTo('results', {'q':$scope.query});
                }, function() {
                    $scope.hasError = 1;
                });
            };

            $scope.getLocation = function(val) {
                $scope.hasError = 0;
                return Restangular.one('api').customGET('autoComplete',{'q':val})
                .then(function(result) {
                    result.results = $filter('unique')(result.results);
                    return result.results.map(function(item){
                        return item;
                    });

                }, function() {
                    
                });
            };     
            $scope.onSelect = function ($item, $model, $label) {
                // Auto search on click
            };
        }

        function HomeController($scope, Restangular, $state) {
        }
})();

