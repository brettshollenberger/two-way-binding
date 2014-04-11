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
