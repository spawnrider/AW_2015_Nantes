angular.module('aw_nantes.controllers', ['aw_nantes.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, NantesService) {
    console.log("Controller AppCtrl");
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
})

.controller('CategoriesCtrl', function($scope, NantesService) {
    console.log("Controller CategoriesCtrl");
    $scope.categories = NantesService.getList();
})

.controller('CategorieCtrl', function($scope, $stateParams, NantesService) {
    categorieCode = $stateParams.categorieCode;
    console.log("Controller CategorieCtrl : "+categorieCode);

    $scope.content = NantesService.getByProperty('categorieCode', categorieCode);
    console.log('Current categorie : ' + JSON.stringify($scope.content));
})
