define([
    'backbone',
    'views/item/RequestItemView',
    'views/item/RequestEmptyItemView',
    'hbs!tmpl/composite/RequestCompositeViewTemplate'
],
    function (Backbone, RequestItemView, RequestEmptyItemView, RequestCompositeViewTemplate) {
        'use strict';

        /* Return a CompositeView class definition */
        return Backbone.Marionette.CompositeView.extend({

            itemView: RequestItemView,
            emptyView: RequestEmptyItemView,

            template: RequestCompositeViewTemplate,

            ui: {
                requestList: '#requestList'
            },

            initialize: function (options) {
                console.log('initialize a Request CompositeView');

                this.on('itemview:bin:select', this._selectBin, this);
                this.binId = options.binId;
            },

            serializeData: function () {
                return {
                    remoteUrl: document.location.origin + '/bins/' + this.binId
                };
            },

            appendHtml: function (collectionView, itemView) {
                this.ui.requestList.prepend(itemView.el);
            },

            /* on render callback */
            onRender: function () {
            }
        });

    });