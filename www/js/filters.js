angular.module('aw_nantes.filters', [])
    .filter('groupByRegion', function($parse) {
        var dividers = {};

        return function(input) {
            if (!input || !input.length) return;

            var output = [],
                previousRegion,
                currentRegion;

            for (var i = 0, ii = input.length; i < ii && (item = input[i]); i++) {
                currentRegion = item.region;
                if (!previousRegion || currentRegion != previousRegion) {

                    var dividerId = currentRegion.replace(new RegExp(' ', 'g'), '');

                    if (!dividers[dividerId]) {

                        dividers[dividerId] = {
                            isDivider: true,
                            divider: currentRegion
                        };
                    }

                    //console.log(dividers[dividerId]);
                    output.push(dividers[dividerId]);
                }

                output.push(item);
                previousRegion = currentRegion;
            }

            return output;
        };
    })
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
