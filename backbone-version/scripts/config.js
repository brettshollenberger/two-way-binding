var app = app || {};

app.config = {
    render: function($scope) {
        var compiled = app.config.compile($scope);
        return $('[bb-app]').html(compiled);
    },
    compile: function($scope) {
        var html = $('[bb-app]');
        html     = compileBBRepeat(html)($scope);
        return html;
    },
    templateEngine: {
        name: 'Handlebars',
        compile: function(html) {
            return Handlebars.compile(html);
        }
    }
}
