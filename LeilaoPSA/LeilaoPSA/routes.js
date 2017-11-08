(function () {
    'use strict';

    angular
        .module('App')
        .config(InicializaRotas);

    InicializaRotas.$inject = ['$routeProvider', '$locationProvider']

    function InicializaRotas($routeProvider, $locationProvider) {

        //$locationProvider.html5Mode(true);
        $routeProvider
            .when('/leilao/:codLeilao?', {
                templateUrl: 'assets/public/leilao/leilaoDetails.html',
            })
            .when('/', {
                templateUrl: 'assets/public/leilao/leilaoGrid.html',
            })
            .otherwise({ redirectTo: '/' });
    }
})();
