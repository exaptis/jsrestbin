define([
    'backbone',
    'models/RequestModel'
],
    function (Backbone, RequestModel) {
        'use strict';

        /* Return a collection class definition */
        return Backbone.Collection.extend({

            model: RequestModel,

            initialize: function (models, options) {
                console.log('initialize a RequestCollection');

                this.limit = 25;

                if (options) {
                    this.binId = options.binId;
                    this.fetchLatest = options.fetchLatest;
                }
            },

            url: function () {
                return '/api/v1/bins/' + this.binId + '/requests?limit=' + (this.fetchLatest ? 1 : this.limit);
            }
        });
    });
