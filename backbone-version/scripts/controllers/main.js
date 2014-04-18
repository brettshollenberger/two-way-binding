var Book = Backbone.Model.extend({
    defaults: {
        title: '',
        author: ''
    }
});

var Books = Backbone.Collection.extend({
    model: Book
});

var northanger     = new Book({title: "Northanger Abbey", 
                               author: "Jane Austen"});
        
var mansfield      = new Book({title: "Mansfield Park", 
                               author: "Jane Austen"});
        
var books          = new Books([northanger, mansfield]);
books.activeItem   = new Book();

var $scope = {
    books: books
};

app.config.render($scope);

app.directive('mad-king', {
    restrict: 'A',
    link: function($scope, element, attrs) {
        element.on('click', function() {
            alert('I am the mad king');
        });
    }
});

$scope.books.on('makeActiveItem', function(activeItem) {
    $('#book-title').val(activeItem.get('title'));
    $('#book-author').val(activeItem.get('author'));
    $('#changeBook').show();
    $('#clearForm').show();
    $('#addBook').hide();
});

$('#changeBook').hide();
$('#clearForm').hide();

$('#addBook').on('click', function() {
    var title  = $('#book-title').val();
    var author = $('#book-author').val();
    $scope.books.add([{title: title, author: author}]);
    $('#book-title').val('');
    $('#book-author').val('');
});

$('#changeBook').on('click', function() {
    var book = {
        title: $('#book-title').val(),
        author: $('#book-author').val()
    };
    
    $scope.books.activeItem.set(book);
    clearForm();
});

$('#clearForm').on('click', function() {
    clearForm();
});

function clearForm() {
    $('#book-title').val('');
    $('#book-author').val('');
    $('#changeBook').hide();
    $('#clearForm').hide();
    $('#addBook').show();
    CollectionView.activeItem = new Book();
}
