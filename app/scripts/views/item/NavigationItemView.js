define([
    'backbone',
    'hbs!tmpl/item/NavigationItemViewTemplate'
],
    function (Backbone, NavigationItemViewTemplate) {
        'use strict';

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({

            initialize: function () {
                console.log('initialize a Navigation ItemView');
            },

            template: NavigationItemViewTemplate,

            className: 'container-fluid',

            events: {
                'click a': 'navigate'
            },

            navigate: function (e) {
                var $link = $(e.currentTarget);

                this._markAsActive($link);

                if (_.isEmpty($link.attr('href')) || $link.attr('href') === '#') {
                    this.trigger('navigation:showPage', $link.data('target'));
                    e.preventDefault();
                }
            },

            _markAsActive: function ($link) {
                this.$el.find('li').removeClass('active');
                $link.parent().addClass('active');
            },

            /* on render callback */
            onRender: function () {

            }
        });

    });
