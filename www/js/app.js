// Ionic Starter App
angular.module('starter', ['ionic', 'aw_nantes.controllers', 'aw_nantes.services', 'aw_nantes.filters', 'aw_nantes.directives'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',
        resolve: {
            init: function(NantesService) {
                return NantesService.init(); // init the SNCF gare list
            }
        }
    })

    .state('app.categories', {
        url: '/categories',
        views: {
            'menuContent': {
                templateUrl: 'templates/categories.html',
                controller: 'CategoriesCtrl'
            }
        }
    })

    .state('app.single', {
        url: '/categories/:categorieCode',
        views: {
            'menuContent': {
                templateUrl: 'templates/categorie.html',
                controller: 'CategorieCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/categories');
});
