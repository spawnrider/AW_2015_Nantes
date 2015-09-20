angular.module('aw_nantes.directives', [])
.directive('dividerCollectionRepeat', function($parse) {
    return {
        priority: 1001,
        compile: compile
    };

    function compile (element, attr) {
        var height = attr.itemHeight || '73';
        attr.$set('itemHeight', 'gare.isDivider ? 37 : ' + height);
        element.children().attr('ng-hide', 'gare.isDivider');
        element.prepend(
            '<div class="item item-divider ng-hide" ng-show="gare.isDivider" ng-bind="gare.divider"></div>'
        );
    }
})
