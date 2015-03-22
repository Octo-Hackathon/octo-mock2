(function(){
	'use strict';

	angular.module('app')
        .config( function initRoutes( $stateProvider ) {
            $stateProvider
            .state( 'results', {
                url: '/results?q',
                views: {
                    "header": {
                        controller: 'SearchController',
                        templateUrl: 'views/header/header.tpl.html'
                    },
                    "main": {
                        controller: 'ResultsController',
                        templateUrl: 'views/results/results.tpl.html'
                    }
                },
                data:{ pageTitle: 'Inflo | Know Your Neighborhood' },
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
            $scope.barData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                series: [
                    [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
                    [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
                ]
            };
            $scope.barOptions = {
                seriesBarDistance: 15
            };
            $scope.barResponsiveOptions = [
                ['screen and (min-width: 641px) and (max-width: 1024px)', {
                    seriesBarDistance: 10,
                    axisX: {
                        labelInterpolationFnc: function(value) {
                            return value;
                        }
                    }
                }],
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function(value) {
                            return value[0];
                        }
                    }
                }]
            ];
            // pie chart
            $scope.pieData = {
                series: [20, 10, 30, 40]
            };            
        }
})();

