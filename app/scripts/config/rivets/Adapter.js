/*global define, $, Backbone */

define(['rivets'], function (Rivets) {
    'use strict';
    //https://github.com/mikeric/rivets/issues/57
    Rivets.configure({
        templateDelimiters: ['{', '}'],
        adapter: {
            subscribe: function (obj, keypath, callback) {
                if (obj instanceof Backbone.Collection) {
                    obj.on('add remove reset', function () {
                        callback(obj[keypath]);
                    });
                }

                if (obj instanceof Backbone.Model) {
                    obj.on('change:' + keypath, function (m, v) {
                        callback(v);
                    });
                }
            },

            unsubscribe: function (obj, keypath, callback) {
                if (obj instanceof Backbone.Collection) {
                    obj.off('add remove reset', function () {
                        callback(obj[keypath]);
                    });
                }

                if (obj instanceof Backbone.Model) {
                    obj.off('change:' + keypath, function (m, v) {
                        callback(v);
                    });
                }
            },

            read: function (obj, keypath) {
                if (obj instanceof Backbone.Collection) {
                    return obj[keypath];
                }

                if (obj instanceof Backbone.Model) {
                    return obj.get(keypath);
                }
            },

            publish: function (obj, keypath, value) {
                if (obj instanceof Backbone.Collection) {
                    obj[keypath] = value;
                }

                if (obj instanceof Backbone.Model) {
                    obj.set(keypath, value);
                }
            }
        }
    });

    return Rivets;
});