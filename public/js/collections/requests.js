/*global define, Backbone */

define([
    'models/request'
], function (Request) {
    'use strict';
    var RequestCollection = Backbone.Collection.extend({

        model: Request,

        initialize: function (models, options) {
            this.query = options.query;
        },

        url: function () {
            return this.query;
        }
    });

    return RequestCollection;
});