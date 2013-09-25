define([
    'backbone',
    'hbs!tmpl/item/BinItemViewTemplate'
],
    function (Backbone, BinItemViewTemplate) {
        'use strict';

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({

            initialize: function () {
                console.log('initialize a BinItemView');
            },

            tagName: 'li',

            template: BinItemViewTemplate,

            ui: {},

            events: {
                'click a.delete': 'deleteBin',
                'click a.edit': 'editBin',
                'click a.select': 'listBinRequests',
                'click a.latest': 'listLatestBinRequest'
            },

            modelEvents: {
                'change:isActive': 'toggleActiveItemState'
            },

            deleteBin: function (e) {
                e.preventDefault();
                this.trigger('bin:delete', this.model);
            },

            editBin: function (e) {
                e.preventDefault();
                this._selectBin();
                this.trigger('bin:edit', this.model);
            },

            listBinRequests: function (e) {
                e.preventDefault();
                this._selectBin();
                this.trigger('bin:requests:list', this.model.id);
            },

            listLatestBinRequest: function (e) {
                e.preventDefault();
                this._selectBin();
                this.trigger('bin:requests:listLatest', this.model.id);
            },

            toggleActiveItemState: function () {
                this.$el.toggleClass('active', this.model.get('isActive'));
            },

            _selectBin: function () {
                this.trigger('bin:select', this.model);
            },

            /* on render callback */
            onRender: function () {
            }
        });

    });
