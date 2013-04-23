/*global define, Backbone */

define([], function () {
    'use strict';
    var Request = Backbone.Model.extend({

        idAttribute: "reference",

        defaults: {
            "headers": {},
            "content": {},
            "cookies": {}
        }

    });

    return Request;
});