/*global Backbone*/

define([], function () {
    'use strict';
    (function (Backbone) {
        _.extend(Backbone.Marionette.Controller.prototype, {
            /**
             * Load Resources via promise
             *
             * @param CollectionClass
             * @param classOptions
             * @param fetchOptions
             * @returns {*}
             */
            loadResource: function (CollectionClass, classOptions, fetchOptions) {
                var defer = $.Deferred(),
                    collection = new CollectionClass([], classOptions);

                collection.fetch(_.extend({}, fetchOptions, {
                    success: function () {
                        defer.resolve(collection);
                    }
                }));

                return defer.promise();
            }
        });
    }(Backbone));
});