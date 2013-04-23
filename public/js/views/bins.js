/*global define, Backbone */

define([
    'views/bin'
], function (BinView) {
    'use strict';
    var BinsView = Backbone.View.extend({

        tagName: "ul",
        className: "nav nav-pills nav-stacked",

        initialize: function () {
            this.collection.bind('reset', this.render, this);
            this.collection.bind('add', this.renderBin, this);

            this.collection.fetch();
        },

        render: function () {
            this.$el.empty();

            this.collection.each(function (bin) {
                this.renderBin(bin);
            }, this);

            return this;
        },

        renderBin: function (bin) {

            var binView = new BinView({
                model: bin
            });

            /*
             if(bin.get('isActive') === true) {
             binView.select();
             }
             */

            this.$el.append(binView.render().el);

            return this;
        }


    });

    return BinsView;
});