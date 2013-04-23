/*global define, Backbone, $ */

define([], function () {
    'use strict';
    var NavigationView = Backbone.View.extend({

        initialize: function () {
            this.$target = $(this.options.target);
        },

        events: {
            "click a": "navigate"
        },

        navigate: function (e) {

            var $nav = $(e.target);

            if ($nav.data('target')) {

                $('#navigation a').each(function () {
                    $(this).parent().toggleClass('active', this === e.target);
                });

                this.loadPage($nav.data('target'));

                e.preventDefault();
            }

            return this;
        },

        loadPage: function (name) {
            var self = this;
            require(['text!/templates/pages/' + name + '.html'], function (page) {
                self.$target.html(page);
            });
        }

    });

    return NavigationView;
});