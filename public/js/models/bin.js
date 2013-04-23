/*global define, Backbone */

define([], function () {
    'use strict';
    var Bin = Backbone.Model.extend({

        idAttribute: "reference",

        defaults: {
            isActive: false
        }
    });

    return Bin;
});