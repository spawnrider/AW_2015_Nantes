// Ionic Starter App
angular.module('starter', ['ionic', 'uiGmapgoogle-maps','aw_nantes.controllers', 'aw_nantes.services', 'aw_nantes.filters', 'aw_nantes.directives'])

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

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.navBar.alignTitle("center");
})
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',
        resolve: {
            init: function(AgendaService) {
                return AgendaService.init();
            }
        }
    })

    .state('app.agenda', {
        url: '/agenda',
        views: {
            'menuContent': {
                templateUrl: 'templates/agenda.html',
                controller: 'AgendaCtrl'
            }
        }
    })

    .state('app.single', {
        url: '/agenda/:eventId',
        views: {
            'menuContent': {
                templateUrl: 'templates/event.html',
                controller: 'EventCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/agenda');
});
