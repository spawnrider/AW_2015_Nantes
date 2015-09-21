angular.module('aw_nantes.directives', [])
.directive('dividerCollectionRepeat', function($parse) {
    return {
        priority: 1001,
        compile: compile
    };

    function compile (element, attr) {
        var height = attr.itemHeight || '100';
        attr.$set('itemHeight', 'categorie.isDivider ? 37 : ' + height);
        element.children().attr('ng-hide', 'categorie.isDivider');
        element.prepend(
            '<div class="item item-divider ng-hide" ng-show="categorie.isDivider" ng-bind="categorie.divider"></div>'
        );
    }
})
