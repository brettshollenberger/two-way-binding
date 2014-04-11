var app              = app || {};
app.controllers      = {};

app.controllers.main = (function(app) {
  var Person = app.models.Person;

  var troy   = new Person({name: "Troy Barnes"} );
  var abed   = new Person({name: "Abed Nadir"} );
  var people = [troy, abed];

  var $scope = {
      people: people
  };
  
  // Compile the DOM
  app.compileBBRepeat($scope);

  $('#new-button').on('click', function() {
      var val = $('#new-member').val();
      var person = new Person({name: val});
      $scope.people.push(person);
      $('#new-member').val('');
  });

  $('#remove-recent').on('click', function() {
      $scope.people.pop();
  });

  return $scope;
})(app);
