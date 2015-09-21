angular.module('aw_nantes.controllers', ['aw_nantes.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, AgendaService) {
    console.log("Controller AppCtrl");
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
})

.controller('AgendaCtrl', function($scope, AgendaService) {
    console.log("Controller AgendaCtrl");
    $scope.categories = AgendaService.getList();
})

.controller('EventCtrl', function($scope, $stateParams, AgendaService) {
    eventId = $stateParams.eventId;
    console.log("Controller EventCtrl : "+eventId);

    $scope.event = AgendaService.getByProperty('id', eventId);
    console.log('Current event : ' + JSON.stringify($scope.event));
})
