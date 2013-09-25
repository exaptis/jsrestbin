/*global Backbone*/

define([], function () {
    'use strict';
    (function (Backbone) {
        _.extend(Backbone.Marionette.Application.prototype, {
            /**
             * Navigate to given route
             *
             * @param route
             * @param options
             */
            navigate: function (route, options) {
                Backbone.history.navigate(route, options || {});
            },

            /**
             * Return the current route
             *
             * @returns {String}
             */
            getCurrentRoute: function () {
                return Backbone.history.fragment;
            },

            /**
             * Initialize Backbones history object
             */
            startHistory: function () {
                if (Backbone.history) {
                    Backbone.history.start();
                }
            }
        });
    }(Backbone));
});