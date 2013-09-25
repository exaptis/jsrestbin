/*global Backbone*/

define([], function () {
    'use strict';
    (function (Backbone) {

        /**
         * A utility function for easily making requests to a Baucis API.  Supply Baucis
         * options such as `select` or `populate` in the first parameter, and regular
         * Backbone fetch options as the second parameter.
         *
         * @param options
         * @param fetchOptions
         * @returns {*}
         */
        function baucisFetch(options, fetchOptions) {
            fetchOptions = _.clone(fetchOptions || {});
            fetchOptions.data = {};

            if (options) {
                Object.keys(options).forEach(function (key) {
                    var value = options[key];
                    if (typeof value === 'object') fetchOptions.data[key] = JSON.stringify(value);
                    else fetchOptions.data[key] = value;
                });
            }

            return this.fetch(fetchOptions);
        }

        _.extend(Backbone.Model.prototype, {
            baucis: baucisFetch
        });

        _.extend(Backbone.Collection.prototype, {
            baucis: baucisFetch
        });
    }(Backbone));
});
