define([
    'backbone',
    'models/BinModel'
],
    function (Backbone, Binmodel) {
        'use strict';

        /* Return a collection class definition */
        return Backbone.Collection.extend({

            model: Binmodel,

            initialize: function (models, options) {
                console.log('initialize a BinCollection');
            },

            url: function () {
                return '/api/v1/bins/';
            }

        });
    });
