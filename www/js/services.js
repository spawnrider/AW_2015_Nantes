angular.module('aw_nantes.services', ['ngResource'])

.factory('AgendaService', function($http, $rootScope, $filter) {
        var categorieURL = "https://gist.githubusercontent.com/spawnrider/a61877d43331bb51b6a8/raw";
        var agendaNantes = categorieURL +"/746a54d71dec617a2057f5377d23ebec4a006a70/cap_aws2015_nantes_calendar.json";
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

        var getNantesAgenda = function() {
            console.log('AgendaService->getNantesAgenda called');

            var serv = $http.get(agendaNantes).
            success(function(data, status) {
                return data;
            });

            return serv;
        };

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
            getByProperty: getByProperty,
            getNantesAgenda: getNantesAgenda
        };
    })
    .factory('OSMService', function($http, $rootScope, $filter) {
        var serviceURL = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDnAMPxbsTTNgdHBoUEeQY9na74kCYqxbs&address=";
        var getLatLong = function(q) {
            // http://api.loire-atlantique.fr:80/opendata/1.0/event/count?catIds=p2_100735
            console.log('OSMService->getLatLong called for ' + q);

            var serv = $http.get(serviceURL + q).
            then(function(ret) {
                console.log("Adresse : "+q);
                console.log(ret.data.results[0].geometry.location);
                if (ret.data.results[0].geometry.location)
                    return ret.data.results[0].geometry.location;
                else return null;
            });

            return serv;
        }

        return {
            getLatLong: getLatLong
        };
    });
