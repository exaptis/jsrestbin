define([
    'backbone'
],
    function (Backbone) {
        'use strict';

        /* Return a Region class definition */
        return Backbone.Marionette.Region.extend({
            el: "#modal",

            constructor: function () {
                console.log("initialize a Modal Region");
                _.bindAll(this);
                Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
                this.on("show", this.showModal, this);
            },

            getEl: function (selector) {
                var $el = $(selector);
                $el.on("hidden", this.close);
                return $el;
            },

            showModal: function (view) {
                view.on("close", this.hideModal, this);
                this.$el.modal('show');
            },

            hideModal: function () {
                this.$el.modal('hide');
            }
        });
    });