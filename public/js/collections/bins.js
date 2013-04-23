/*global define, Backbone */

define([
    'models/bin'
], function (Bin) {
    'use strict';
    var BinCollection = Backbone.Collection.extend({

        model: Bin,

        initialize: function (models, options) {
            this.query = options.query;
        },

        /*
         markBinAsActive: function (reference) {
         this.bin.each(function (bin) {
         if (reference === bin.get('reference')) {
         bin.setActive();
         }
         });
         },
         */

        url: function () {
            return this.query;
        }
    });

    return BinCollection;
});