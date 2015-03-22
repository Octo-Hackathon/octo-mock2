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
            $scope.housingData = {"total":104061,"vacancy":{"number":30881,"percent":29},"occupancy":{"number":73180,"percent":70},"rentalOccupancy":{"number":34135,"percent":32},"ownerOccupancy":{"number":53071,"percent":50}};
            $scope.populationData = {"race":{"white":{"number":156153,"percent":85.67},"black":{"number":17105,"percent":9.38},"americanIndianAlaskaNative":{"number":1216,"percent":0.67},"asian":{"number":1348,"percent":0.74},"nativeHawaiian":{"number":89,"percent":0.05},"otherRace":{"number":3631,"percent":1.99},"twoOrMore":{"number":2723,"percent":1.49}},"sex":{"male":{"number":89196,"percent":48.94},"female":{"number":93069,"percent":51.06}},"total":182265};

            $scope.barData1 = {
                labels: ['Male', 'Female'],
                series: [
                    [$scope.populationData.sex.male.number, $scope.populationData.sex.female.number]
                ]
            };

            $scope.barData2 = {
                labels: ['White', 'Black', 'americanIndianAlaskaNative', 'asian', 'nativeHawaiian', 'otherRace', 'twoOrMore'],
                series: [
                    [
                     $scope.populationData.race.white.number,
                     $scope.populationData.race.black.number,
                     $scope.populationData.race.americanIndianAlaskaNative.number,
                     $scope.populationData.race.asian.number,
                     $scope.populationData.race.nativeHawaiian.number,
                     $scope.populationData.race.otherRace.number,
                     $scope.populationData.race.twoOrMore.number
                    ]
                ]
            };

            $scope.barData3 = {
                labels: ['Homeowners', 'Renters'],
                series: [
                    [
                     $scope.housingData.ownerOccupancy.number,
                     $scope.housingData.rentalOccupancy.number
                    ]
                ]
            };

            $scope.barData4 = {
                labels: ['Occupied', 'Vacant'],
                series: [
                    [
                     $scope.housingData.occupancy.number,
                     $scope.housingData.vacancy.number
                    ]
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
         
        }
})();

