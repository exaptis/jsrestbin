define([
    'backbone',
    'collections/BinCollection',
    'collections/RequestCollection',
],
    function (Backbone, BinCollection, RequestCollection) {
        'use strict';

        var Communicator = Backbone.Marionette.Controller.extend({
            initialize: function () {
                console.log('initialize a Communicator');

                // create a pub sub
                this.mediator = new Backbone.Wreqr.EventAggregator();

                // create a req/res
                this.reqres = new Backbone.Wreqr.RequestResponse();

                // create commands
                this.command = new Backbone.Wreqr.Commands();

                // store resources
                this.resources = {};

                this.registerRequestResponse();
            },

            registerRequestResponse: function () {
                this.reqres.setHandler('bins', this.fetchBinCollection, this);
                this.reqres.setHandler('requests', this.fetchRequestCollection, this);
            },

            fetchBinCollection: function (classOptions, fetchOptions, resourceOptions) {
                return this.getResource('binCollection', this.loadResource(BinCollection, classOptions, fetchOptions), resourceOptions);
            },

            fetchRequestCollection: function (classOptions, fetchOptions, resourceOptions) {
                return this.getResource('requestCollection' + classOptions.binId, this.loadResource(RequestCollection, classOptions, fetchOptions), resourceOptions);
            },

            /**
             * Load and optionally cache resources
             *
             * @param key to identify cache
             * @param promise of the resource being loaded
             * @param options
             *
             * @returns {$.Defeer.promise()}
             */
            getResource: function (key, promise, options) {
                var defer = $.Deferred();

                if (!_.isUndefined(options) && options.cache) {
                    if (this.resources[key]) {
                        console.log('load resource from cache `' + key + '`');
                        defer.resolve(this.resources[key]);
                    } else {
                        $.when(promise).done(function resolveResource(resource) {
                            this.resources[key] = resource;
                            defer.resolve(resource);
                        }.bind(this));
                    }
                } else {
                    return promise;
                }

                return defer.promise();
            }
        });

        return new Communicator();
    });
