define([
    'hbs!tmpl/item/form/DeleteBinFormItemViewTemplate'
],
    function (DeleteBinFormItemViewTemplate) {
        'use strict';

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({

            initialize: function () {
                console.log("initialize a DeleteBinForm ItemView");
            },

            template: DeleteBinFormItemViewTemplate,

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {
                'submit': 'deleteBin'
            },

            deleteBin: function (e) {
                e.preventDefault();
                this.trigger('bin:destroy', this.model);
                this.trigger('close');
            }
        });

    });
