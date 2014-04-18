app.directive = function(selector, ddo) {
    if (ddo === void 0) return;
    
    _.defaults(ddo, {
        restrict: 'A',
        scope: {}
    });
    
    setSelector();
    setAttributes();
    executeLinkingFunction();
    
    function setSelector() {
        if (ddo.restrict == 'A') ddo.element = $('[' + selector + ']');
    }
    
    function setAttributes() {
        ddo.attributes = {};
        _.each(ddo.element[0].attributes, function(v, k) {
            var key  = ddo.element[0].attributes[k].name;
            var value = ddo.element[0].attributes[k].value;
            ddo.attributes[key] = value;
        });
    }
    
    function executeLinkingFunction() {
        if (_.isFunction(ddo.link)) {
            ddo.link(ddo.scope, ddo.element, ddo.attributes);
        }
    }
}
