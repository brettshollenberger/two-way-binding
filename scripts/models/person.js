var app    = app || {};
app.models = {};
app.models.Person = (function() {
  return function Person(attributes) {
      this.id   = _.uniqueId();
      this.name = attributes.name;
  }
})();
