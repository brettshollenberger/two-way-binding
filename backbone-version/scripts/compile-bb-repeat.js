function compileBBRepeat(html) {
  return function($scope) {
    var repeated = html.find('[bb-repeat]');
    _.each(repeated, function(DOMChunk) {
      DOMChunk = $(DOMChunk);
      var repeatedArg         = DOMChunk.attr('bb-repeat'),
      childScopePropName  = repeatedArg.replace(/ in \w+/, ''),
      parentScopePropName = repeatedArg.replace(/\w+ in /, ''),
      collection          = $scope[parentScopePropName],
      templateStr         = DOMChunk[0].innerHTML.toString(),
      templateFn          = app.
      config.
      templateEngine.
      compile(templateStr),
      options;

    if (collection !== void 0) {
      DOMChunk.html('');

      options = {collection: collection, 
        template: templateFn,
      $scope: $scope,
      childScopePropName: childScopePropName,
      parentScopePropName: parentScopePropName}

      collectionView = new CollectionView(options);
      compiledHTML   = collectionView.render().el;

      DOMChunk.html(compiledHTML);
    }
    });
  }
}

