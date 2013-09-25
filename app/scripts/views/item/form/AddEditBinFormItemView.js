define([
    'rivets',
    'hbs!tmpl/item/form/AddEditBinFormItemViewTemplate'
],
    function (Rivets, AddEditBinFormItemViewTemplate) {
        'use strict';

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({

            initialize: function () {
                console.log('initialize a AddEditForm ItemView');
            },

            template: AddEditBinFormItemViewTemplate,

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {
                'submit': 'saveBin'
            },

            saveBin: function (e) {
                e.preventDefault();
                this.trigger('bin:save', this.model);
                this.trigger('close');
            },

            onRender: function () {
                Rivets.bind(this.el, {bin: this.model});

            }

        });

    });
