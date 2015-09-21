angular.module('aw_nantes.services', ['ngResource'])

.factory('AgendaService', function($http, $rootScope, $filter) {
    var categorieURL = "https://gist.githubusercontent.com/spawnrider/a61877d43331bb51b6a8/raw";
    var allCategories;

    var setList = function(newObj) {
        console.log('AgendaService->setList called');
        allCategories = newObj;
    }

    var getList = function() {
        console.log('AgendaService->getList called');
        return allCategories;
    }

    var getByProperty = function(property, value) {
        console.log('AgendaService->getByProperty called [' + property + '][' + value + ']');
        return $filter('getByProperty')(property, value, allCategories);
    }

    var getItems = function() {
        console.log('AgendaService->getItems called');

        var serv = $http.get(categorieURL).
        success(function(data, status) {
            return data;
        });

        return serv;
    };

    var getItemsCount = function(catId) {
        // http://api.loire-atlantique.fr:80/opendata/1.0/event/count?catIds=p2_100735
        console.log('AgendaService->getItemsCount called for '+catId);

        var serv = $http.get("http://api.loire-atlantique.fr:80/opendata/1.0/event/count?catIds="+catId).
        success(function(data, status) {
            return data;
        });

        return serv;
    }

    var init = function() {
        console.log('AgendaService->init called');
        allGare = [];

        return getItems().then(function(ret) {
            console.log("Category items was received in AgendaService->init : " + ret.data.length);
            allCategories = ret.data;
        })
    }

    return {
        getList: getList,
        init: init,
        getByProperty: getByProperty
    };
});
