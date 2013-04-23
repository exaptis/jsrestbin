/*global define, Backbone */

define([], function () {
    'use strict';
    var CreateView = Backbone.View.extend({

        events: {
            'keypress input#name': 'createNewBin',
            'submit': 'createNewBin'
        },

        createNewBin: function (e) {
            if (e.keyCode === 13 || e.type === "submit") {
                e.preventDefault();

                var $input = this.$el.find('input');

                this.collection.create({
                    name: $input.val(),
                    isActive: true
                }, { wait: true });

                $input.val('');
            }

        }
    });

    return CreateView;
});