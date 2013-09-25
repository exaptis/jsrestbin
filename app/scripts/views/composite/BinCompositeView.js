define([
    'backbone',
    'views/item/BinItemView',
    'views/item/BinEmptyItemView',
    'hbs!tmpl/composite/BinCompositeViewTemplate'
],
    function (Backbone, Binitemview, BinEmptyItemView, BinCompositeViewTemplate) {
        'use strict';

        /* Return a CompositeView class definition */
        return Backbone.Marionette.CompositeView.extend({

            itemView: Binitemview,
            itemViewContainer: '#binList',
            emptyView: BinEmptyItemView,

            template: BinCompositeViewTemplate,

            events: {
                'click #binNew': 'binNew'
            },

            initialize: function () {
                console.log('initialize a Bin CompositeView');
                this.on('itemview:bin:select', this._selectBin, this);
            },

            _selectBin: function (childView, bin) {
                console.log('select bin');
                this.collection.each(function toggleBinActiveStatus(currentBin) {
                    currentBin.set('isActive', (currentBin === bin));
                });
            },

            binNew: function (e) {
                console.log('new bin');

                e.preventDefault();
                this.trigger('bin:new');
            },

            /* on render callback */
            onRender: function () {
            }
        });

    });