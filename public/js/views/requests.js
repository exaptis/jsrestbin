/*global define, Backbone, _ */

define([
    'views/request',
    'text!/templates/bin/info.html'
], function (RequestView, BinInfoTemplate) {
    'use strict';
    var RequestsView = Backbone.View.extend({

        template: _.template(BinInfoTemplate),

        render: function () {
            this.$el.empty();

            this.collection.each(function (request) {

                var requestView = new RequestView({
                    model: request
                });

                this.$el.prepend(requestView.render().el);

            }, this);

            this.$el.prepend(this.template({ binView: this.options.binView }));

            return this;
        }
    });

    return RequestsView;
});