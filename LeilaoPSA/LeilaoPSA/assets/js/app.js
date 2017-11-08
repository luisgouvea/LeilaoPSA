(function () {
    'use strict';

    angular
        .module('App', ['ngRoute'])
        .config(function ($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                'self'            
            ]);
        })
})();