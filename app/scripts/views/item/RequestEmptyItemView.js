define([
    'backbone',
    'hbs!tmpl/item/EmptyRequestsItemViewTemplate'
],
    function (Backbone, EmptyRequestsItemView) {
        'use strict';

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({

            initialize: function () {
                console.log('initialize a EmptyRequests ItemView');
            },

            template: EmptyRequestsItemView,

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {},

            /* on render callback */
            onRender: function () {
            }
        });

    });
