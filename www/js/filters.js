angular.module('aw_nantes.filters', [])
    .filter('groupByDate', function($parse) {
        var dividers = {};

        return function(input) {
            if (!input || !input.length) return;

            var output = [],
                previousDate,
                currentDate;

            for (var i = 0, ii = input.length; i < ii && (item = input[i]); i++) {
                currentDate = item.date;
                if (!previousDate || currentDate != previousDate) {

                    var dividerId = currentDate;

                    if (!dividers[dividerId]) {
                        console.log("Divider Id "+dividerId);
                        dividers[dividerId] = {
                            isDivider: true,
                            divider: currentDate
                        };
                    }

                    //console.log(dividers[dividerId]);
                    output.push(dividers[dividerId]);
                }

                output.push(item);
                previousDate = currentDate;
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
