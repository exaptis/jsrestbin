define([
    'backbone',
    'hbs!tmpl/item/EmptyBinsItemViewTemplate'
],
    function (Backbone, EmptyBinsItemViewTemplate) {
        'use strict';

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({

            tagName: 'li',

            template: EmptyBinsItemViewTemplate,

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {},

            initialize: function () {
                console.log("initialize a EmptyBinsItemView ItemView");
            },

            /* on render callback */
            onRender: function () {
            }
        });

    });
