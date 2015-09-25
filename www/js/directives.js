angular.module('aw_nantes.directives', [])
.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        var content = element.find('a');
        content.css({
            'background-image': 'url(' + url +')',
            'background-position': '0px',
            'background-size' : 'cover'
        });
    };
});

