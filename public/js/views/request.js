/*global define, Backbone, _ */

define([
    'text!/templates/request/item.html'
], function (RequestTemplate) {
    'use strict';
    var RequestView = Backbone.View.extend({

        template: _.template(RequestTemplate),
        tag: 'div',
        className: 'row-fluid request',

        initialize: function () {

        },

        render: function () {
            var content = this.template({ request: this.model });
            this.$el.html(content);
            return this;
        }

    });

    return RequestView;
});
