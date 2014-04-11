var app = app || {};
app.compileBBRepeat = (function() {
  return function compileBBRepeat($scope) {
    var repeated = $('[bb-repeat]');
    _.each(repeated, function(DOMChunk) {
      DOMChunk = $(DOMChunk);
      var repeatedArg = DOMChunk.attr('bb-repeat');
      var childScopeName = repeatedArg.replace(/ in \w+/, '');
      var parentScopeName = repeatedArg.replace(/\w+ in /, '');
      var template = DOMChunk[0].innerHTML.toString();
      template = template.replace(/\&lt\;/, '<').replace(/\&gt\;/, '>');
      template = _.template(template);
      var parentScopeProp = $scope[parentScopeName];
      if (parentScopeProp) {
        DOMChunk.html('');

        _.each(parentScopeProp, function(obj) {
          createAndWatch(obj);
        });

        app.watch(parentScopeProp, function(changed, array, eventName) {
          if (eventName == 'push') createAndWatch(changed);
          if (eventName == 'pop') removeAndRemoveWatches(changed);
        });

        function createAndWatch(obj) {
          insertNewDOMNode(obj);
          watchArrayElement(obj);
        }

        function watchArrayElement(element) {
          app.watch(element, function(newVal, obj, attr) {
            _.each(obj.bindings, function(binding) {
              rebind(obj, binding);
            });
          });
        }

        function removeAndRemoveWatches(element) {
          _.each(element.bindings, function(binding) {
            remove(binding);
          });
        }

        function rebind(obj, binding) {
          var DOMNode = convertObjToDOMNode(obj);
          binding.html(DOMNode);
        }

        function remove(binding) {
          binding.remove();
        }

        function insertNewDOMNode(obj) {
          var DOMNode = convertObjToDOMNode(obj);
          DOMChunk.append(DOMNode);
        }

        function convertObjToDOMNode(obj) {
          var childScope = {};
          childScope[childScopeName] = obj;
          var DOMNode = template(childScope);
          DOMNode = $(DOMNode);
          addBindings(obj, DOMNode);
          return DOMNode;
        }

        function addBindings(obj, DOMNode) {
          if (!obj.bindings) {
            Object.defineProperty(obj, 'bindings', {
              enumerable: true,
              configurable: true,
              value: []
            });
          }
          obj.bindings.push(DOMNode);
        }
      }
    });
  }
})();
