define([
    'Communicator',
    'views/composite/RequestsCompositeView'
],
    function (Communicator, RequestsCompositeView) {
        'use strict';

        return Backbone.Marionette.Controller.extend({

            initialize: function () {
                console.log('initialize a RequestController');
            },

            listRequests: function (binId) {
                console.log('do List Requests', binId);

                var requestsPromise = Communicator.reqres.request('requests', {binId: binId});
                $.when(requestsPromise).done(function (requestCollection) {
                    this.whenRequestsCollectionIsFetched(binId, requestCollection);
                }.bind(this));
            },

            listLatestRequest: function (binId) {
                console.log('do List Latest Requests', binId);

                var requestsPromise = Communicator.reqres.request('requests', {binId: binId, fetchLatest: true});
                $.when(requestsPromise).done(function (requestCollection) {
                    console.log(requestCollection);
                    this.whenRequestsCollectionIsFetched(binId, requestCollection);
                }.bind(this));
            },

            whenRequestsCollectionIsFetched: function (binId, requestCollection) {
                var App = this.getApplication(),
                    requestCollectionView = this.getRequestsCompositeView(binId, requestCollection);

                App.content.show(requestCollectionView);
            },

            getRequestsCompositeView: function (binId, collection) {
                return new RequestsCompositeView({binId: binId, collection: collection});
            },

            getApplication: function () {
                return require('application');
            }
        });
    });
