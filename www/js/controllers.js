angular.module('aw_nantes.controllers', ['aw_nantes.services'])

.controller('AppCtrl', function($scope, $state, $ionicModal, $timeout, AgendaService) {
    console.log("Controller AppCtrl");
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
})

.controller('AgendaCtrl', function($scope, $compile, AgendaService, OSMService) {
    console.log("Controller AgendaCtrl");
    $scope.categories = AgendaService.getList();

    $scope.markers = [];

    $scope.categories.forEach(function(cat) {
        cat.background = cat.town.replace(new RegExp(' ', 'g'), '').toLowerCase() + "-" + cat.country.replace(' ', '').toLowerCase() + ".jpg";
    });
})

.controller('CarteCtrl', function($scope, $compile, AgendaService, OSMService) {
    console.log("Controller AgendaCtrl");
    $scope.categories = AgendaService.getList();

    $scope.markers = [];
    $scope.map = {
        center: {
            latitude: 46.52863469527167,
            longitude: 2.43896484375
        },
        zoom: 3
    };

    $scope.categories.forEach(function(cat) {
        if (cat.coord) {
            console.log("Retrieve coord from datasource");
            $scope.markers.push(createMarker(cat, cat.coord.lat, cat.coord.lng));
        } else {
            console.log("Retrieve coord from Google Map service");
            OSMService.getLatLong(cat.town + ", " + cat.country).then(function(data) {
                console.log(data);
                $scope.markers.push(createMarker(cat, data.lat, data.lng));
            });
        }

        cat.background = cat.town.replace(new RegExp(' ', 'g'), '').toLowerCase() + "-" + cat.country.replace(' ', '').toLowerCase() + ".jpg";
    });

    function createMarker(cat, lat, lng) {
        var marker = {
            id: cat.id,
            title: cat.title,
            latitude: lat,
            longitude: lng,
            show: false
        };

        marker['id'] = cat.id;

        return marker;
    };
})

.controller('EventCtrl', function($scope, $stateParams, AgendaService, $ionicHistory) {
    eventId = $stateParams.eventId;
    console.log("Controller EventCtrl : " + eventId);

    $scope.event = AgendaService.getByProperty('id', eventId);
    console.log('Current event : ' + JSON.stringify($scope.event));

    if ($scope.event.town == "Nantes") {
        AgendaService.getNantesAgenda().then(function(result) {
            $scope.eventDetails = result.data
        });
    }

    console.log($ionicHistory.viewHistory());
})

.controller('InfosCtrl', function($scope) {
    console.log("Controller InfosCtrl");
});
