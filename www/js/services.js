angular.module('aw_nantes.services', ['ngResource'])

.factory('NantesService', function($http, $rootScope, $filter) {
    var allCategories;

    var setList = function(newObj) {
        console.log('NantesService->setList called');
        allCategories = newObj;
    }

    var getList = function() {
        console.log('NantesService->getList called');
        return allCategories;
    }

    var getByProperty = function(property, value) {
        console.log('NantesService->getByProperty called [' + property + '][' + value + ']');
        return $filter('getByProperty')(property, value, allCategories);
    }

    var getItems = function() {
        console.log('NantesService->getItems called');

        var serv = $http.get("/data/categories.json").
        success(function(data, status) {
            return data;
        });

        return serv;
    };

    var getItemsCount = function(catId) {
        // http://api.loire-atlantique.fr:80/opendata/1.0/event/count?catIds=p2_100735
        console.log('NantesService->getItemsCount called for '+catId);

        var serv = $http.get("http://api.loire-atlantique.fr:80/opendata/1.0/event/count?catIds="+catId).
        success(function(data, status) {
            return data;
        });

        return serv;
    }

    var init = function() {
        console.log('NantesService->init called');
        allGare = [];

        return getItems().then(function(ret) {
            console.log("Category items was received in NantesService->init : " + ret.data.length);

            ret.data.forEach(function(categorie){
                getItemsCount(categorie.id).then(function(ret){
                    cat = ret.data[0];
                    console.log("Items for cat "+cat.id+" : "+cat.count);
                    categorie.count = cat.count;
                });
            });

            allCategories = ret.data;
        })
    }

    return {
        getList: getList,
        init: init,
        getByProperty: getByProperty
    };
});
