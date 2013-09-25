define([
    'backbone'
],
    function (Backbone) {
        'use strict';

        /* Return a model class definition */
        return Backbone.Model.extend({

            __name__: "RequestModel",

            idAttribute: "reference",

            defaults: {
                "headers": {},
                "content": {},
                "cookies": {}
            },

            initialize: function () {
                console.log("initialize a RequestModel");
            }

        });
    });
