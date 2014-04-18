Array.prototype = _.extend(Array.prototype, Backbone.Events);

Array.prototype.push=(function(){
  var original = Array.prototype.push;
  return function() {
    this.trigger('push', arguments);
    return original.apply(this,arguments);
  };
})();

Array.prototype.pop=(function() {
  var original = Array.prototype.pop;
  return function() {
    var popped = original.apply(this);
    this.trigger('pop', popped);
    return popped;
  };
})();

Array.prototype.splice=(function() {
  var original = Array.prototype.splice;
  return function() {
    var spliced = original.apply(this, arguments);
    this.trigger('splice', spliced);
    return spliced;
  };
})();

var app   = app || {};
app.watch = (function() {

  function watch(obj, propName, fn) {
      if (fn === void 0 && typeof propName == 'function') {
          fn       = propName;
          propName = undefined;
      }
      if (propName) {
          if (propName.constructor.name == 'String') {
              watchProperty(obj, propName, fn);
              return;
          }
      }
      if (obj.constructor.name == 'Array') {
          watchArray(obj, fn);
          return;
      }
      for (var i in obj) {
          watchProperty(obj, i, fn);
      }
  }

  function watchProperty(obj, propName, fn) {
      var s = obj.__lookupSetter__(propName);
      var g = obj.__lookupGetter__(propName);
      var currentVal;
      if (obj[propName]) currentVal = obj[propName];
      (function(obj, propName, fn) {
          var val = currentVal;
          if (!s && !g) {
              s = function(v) { return val = v; }
              g = function()  { return val; }
          }
          obj.__defineSetter__(propName, function(value) {
              var ret = s(value);
              fn(ret, obj, propName);
              return val;
          });
          obj.__defineGetter__(propName, g);
      })(obj, propName, fn);
  };

  function watchArray(array, fn) {
      array.on('push', function(newElements) {
          _.each(newElements, function(newElement) {
              fn(newElement, array, 'push');
          });
      });
      
      array.on('splice', function(removedElements) {
          _.each(removedElements, function(removedElement) {
              fn(removedElement, array, 'splice');
          });
      });

      array.on('pop', function(removedElement) {
          fn(removedElement, array, 'pop');
      });
  }

  return watch;
})();
