(function(){
    'use strict';
    
    angular
        .module( 'app', [
            'templates-app',
            'templates-common',
            'ui.router',
            'ui.bootstrap',
            'restangular'
        ])

        .config( function initRoutes ($urlRouterProvider, $stateProvider, RestangularProvider, $provide) {
            $urlRouterProvider.otherwise( '/' );
             RestangularProvider.setBaseUrl(location.protocol + '//' + location.hostname + (location.port && ':' + location.port) + location.pathname);
            $provide.decorator('$uiViewScroll', function ($delegate, $stateParams, $location, $document) {
                return function (uiViewElement) {
                    $document.scrollTop(0, 0);
                };
            });             
        })

        .controller( 'AppController', function AppController ($scope, $location,  appName, appVersion) {
            $scope.appName = appName;
            $scope.appVersion = appVersion;
        })
        .constant('appName', 'Octo | Know Your Neighborhood')
        .constant('appVersion', '1.0.0')
        .run( function initApplication () {

        });
})();

