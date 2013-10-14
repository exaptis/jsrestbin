define([
    'backbone'
],
    function (Backbone) {
        'use strict';

        /* Return a model class definition */
        return Backbone.Model.extend({
            __name__: "BinModel",

            idAttribute: "_id",

            defaults: {
                isActive: false
            },

            initialize: function () {
                console.log("initialize a Binmodel model");
            }

        });
    });
