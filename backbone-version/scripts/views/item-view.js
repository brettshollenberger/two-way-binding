var ItemView = Backbone.View.extend({
    events: {
        "click [remove-item]": "remove"
    },
    initialize: function(options) {
        this.$scope     = options.$scope;
        this.model      = options.model;
        this.collection = options.collection;
        this.template   = options.template;
    },
    remove: function() {
        this.collection.remove(this.model);
    },
    render: function() {
        var rendered = this.template(this.$scope);
        $(this.el)
            .addClass('item')
            .attr('cid', this.model.cid)
            .html(rendered);
        return this;
    }
});
