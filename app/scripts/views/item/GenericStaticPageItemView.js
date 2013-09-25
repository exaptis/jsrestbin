define([], function () {
    'use strict';

    /* Return a ItemView class definition */
    return Backbone.Marionette.ItemView.extend({

        initialize: function (options) {
            console.log('initialize a GenericStaticPage ItemView');
            this.content = options.content;
        },

        render: function () {
            this.$el.html(this.content);
        }
    });

});
