var CollectionView = Backbone.View.extend({
    tagName: 'div',
    events: {
        "click .item": "makeActiveItem"
    },
    initialize: function(options) {
        this.$scope     = options.$scope;
        this.collection = options.collection;
        this.template   = options.template;
        this.options    = options;
        this.__bindings = {};
        _.each(this.collection.models, function(item) {
            var itemView = this.insertNewItemNode(item);
            this.watchItem(item, itemView);
        }, this);
        this.watchCollection();
    },
    render: function() {
        return this;
    },
    makeActiveItem: function(e) {
        this.collection.activeItem = this.modelFor(e.currentTarget);
        this.collection.trigger('makeActiveItem', this.collection.activeItem);
    },
    insertNewItemNode: function(model) {
        var childScope = {},
            options = {
                model: model,
                collection: this.collection,
                template: this.template,
                $scope: childScope
            }
        childScope[this.options.childScopePropName] = model.attributes;
        childScope.__proto__ = this.$scope;
        
        var itemView = new ItemView(options);
        $(this.el).append(itemView.render().el);
        this.__bindings[model.cid] = itemView;
        return itemView;
    },
    modelFor: function(element) {
        var cid = $(element).attr('cid');
        
        return _.find(this.collection.models, function(model) {
            return model.cid == cid;
        });
    },
    bindingFor: function(item) {
        return this.__bindings[item.cid].$el;
    },
    removeItemNode: function(item) {
        var node = this.bindingFor(item);
        node.remove();
        return node;
    },
    watchCollection: function() {
        var _self = this;
        app.watch(this.collection.models, function(changed, array, eventName) {
            if (eventName == 'push') _self.insertNewItemNode(changed);
            if (eventName == 'splice') _self.removeItemNode(changed);
        });
    },
    watchItem: function(item, itemView) {
        var _self = this;
        app.watch(item.attributes, function(changed, element, eventName) {
            itemView.render();
        });
    }
});
