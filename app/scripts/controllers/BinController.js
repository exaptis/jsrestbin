define([
    'Communicator',
    'models/BinModel',
    'views/composite/BinCompositeView',
    'views/item/form/AddEditBinFormItemView',
    'views/item/form/DeleteBinFormItemView'
],
    function (Communicator, BinModel, BinCompositeView, AddEditBinFormItemView, DeleteBinFormItemView) {
        'use strict';

        return Backbone.Marionette.Controller.extend({

            initialize: function () {
                console.log('initialize a BinController');
            },

            listBins: function () {
                console.log('do List Bins');

                if (!(this.getApplication().bins.currentView instanceof BinCompositeView)) {
                    $.when(this.getBinCollection()).done(this.whenRequestsCollectionIsFetched.bind(this));
                }
            },

            whenRequestsCollectionIsFetched: function (binCollection) {
                var binCollectionView = this.getRequestsCompositeView(binCollection);

                binCollectionView.on('bin:new', this.showNewBinDialog, this);
                binCollectionView.on('bin:filter', this.filterBinView, this);
                binCollectionView.on('itemview:bin:requests:list', this.listRequests, this);
                binCollectionView.on('itemview:bin:requests:listLatest', this.listLatestRequest, this);
                binCollectionView.on('itemview:bin:delete', this.showDeleteBinDialog, this);
                binCollectionView.on('itemview:bin:edit', this.showEditBinDialog, this);

                this.getApplication().bins.show(binCollectionView);
            },

            listRequests: function (childView, binId) {
                console.log('bin::listRequests');
                this.getApplication().trigger('requests:list', binId);
            },

            listLatestRequest: function (childView, binId) {
                console.log('bin::listLatestRequests');
                this.getApplication().trigger('requests:listLatest', binId);
            },

            showDeleteBinDialog: function (childView, bin) {
                var binDeleteFormItemView = this.getBinDestroyItemView(bin);
                binDeleteFormItemView.on('bin:destroy', this.destroyBin, this);

                this.getApplication().modal.show(binDeleteFormItemView);
            },

            showNewBinDialog: function () {
                var binModel = new BinModel(),
                    binAddEditFormItemView = this.getAddEditBinFormItemView(binModel);

                binAddEditFormItemView.on('bin:save', function saveNewBinModel(binModel) {
                    $.when(this.getBinCollection()).done(function (binCollection) {
                        binCollection.create(binModel);
                    });
                }, this);

                this.getApplication().modal.show(binAddEditFormItemView);
            },

            showEditBinDialog: function (childView, binModel) {
                var binModelCopy = binModel.clone(),
                    binAddEditFormItemView = this.getAddEditBinFormItemView(binModelCopy);

                binModelCopy.set('isClone', true);

                binAddEditFormItemView.on('bin:save', function saveExistingBinModel(binModelCopy) {
                    binModel.set('name', binModelCopy.get('name'));
                    binModel.save();
                }, this);

                this.getApplication().modal.show(binAddEditFormItemView);
            },

            filterBinView: function (name, collection) {

            },

            destroyBin: function (bin) {
                bin.destroy();
            },

            getBinCollection: function () {
                return Communicator.reqres.request('bins', undefined, undefined, {cache: true});
            },

            getRequestsCompositeView: function (collection) {
                return new BinCompositeView({collection: collection});
            },

            getBinDestroyItemView: function (model) {
                return new DeleteBinFormItemView({model: model});
            },

            getAddEditBinFormItemView: function (model) {
                return new AddEditBinFormItemView({model: model});
            },

            getApplication: function () {
                return require('application');
            }
        });
    });
