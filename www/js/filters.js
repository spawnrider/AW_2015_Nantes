angular.module('aw_nantes.filters', [])
    .filter('getByProperty', function() {
        return function(propertyName, propertyValue, collection) {
            console.log('['+propertyName+']['+propertyValue+']['+collection.length+']');
            var i = 0,
                len = collection.length;
            for (; i < len; i++) {
                if (collection[i][propertyName] == +propertyValue) {
                    return collection[i];
                }
            }
            return null;
        }
    });
