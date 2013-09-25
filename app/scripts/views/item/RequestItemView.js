define([
    'backbone',
    'hbs!tmpl/item/RequestItemViewTemplate'
],
    function (Backbone, RequestItemViewTemplate) {
        'use strict';

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({

            tag: 'div',
            className: 'row-fluid request',
            template: RequestItemViewTemplate,

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {},

            initialize: function () {
                console.log('initialize a RequestItemView');
            },

            /* on render callback */
            onRender: function () {
            }
        });

    });
