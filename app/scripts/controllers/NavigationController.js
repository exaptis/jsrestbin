define([
    'Communicator',
    'views/item/NavigationItemView',
    'views/item/GenericStaticPageItemView'
],
    function (Communicator, NavigationItemView, GenericStaticPageItemView) {
        'use strict';

        return Backbone.Marionette.Controller.extend({

            initialize: function () {
                console.log('initialize a Navigation Controller');
                Communicator.mediator.on('app:start', this.showNavigation, this);
            },

            showNavigation: function () {
                var navigationItemView = this.getNavigationItemView();

                navigationItemView.on('navigation:showPage', this.showStaticPage, this);

                this.getApplication().navigation.show(navigationItemView);
            },

            showStaticPage: function (pageName) {
                $.when(this.loadStaticPage(pageName)).done(function (pageContent) {
                    var genericStaticPageItemView = new GenericStaticPageItemView({ content: pageContent});
                    this.getApplication().content.show(genericStaticPageItemView);
                }.bind(this));
            },

            loadStaticPage: function (pageName) {
                var defeered = $.Deferred();

                require(['text!tmpl/static/' + pageName + '.html'], function (page) {
                    defeered.resolve(page);
                });

                return defeered.promise();
            },

            getNavigationItemView: function () {
                return new NavigationItemView();
            },

            getApplication: function () {
                return require('application');
            }
        });
    });
