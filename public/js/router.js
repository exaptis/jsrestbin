/*global define, Backbone, _, $ */

define([
    'collections/bins',
    'views/bins',
    'views/create',
    'views/navigation'
], function (BinsCollection, BinsView, CreateView, NavigationView) {
    'use strict';
    var AppRouter = Backbone.Router.extend({
            routes: {
                "": "index",
                "api/bins/:reference/requests": "findRequests",
                "api/bins/:reference/requests/latest": "findLatestRequest"
            },

            views: {
                bins: {},
                create: {}
            },

            collections: {
                bins: {}
            },

            initialize: function () {
                this.collections.bins = new BinsCollection([], {
                    query: "api/bins"
                });

                this.views.bins = new BinsView({
                    collection: this.collections.bins
                });

                $('#bins').html(this.views.bins.render().el);

                this.views.create = new CreateView({
                    el: '#createBin',
                    collection: this.collections.bins
                });

                this.views.navigation = new NavigationView({
                    el: '#navigation',
                    target: '#content'
                });

                this.views.navigation.loadPage('home');
            }
        }),

        initialize = function () {
            var app_router = new AppRouter();

            app_router.on('route:index', function () {
                console.log('ROUTE::INDEX');
            });

            app_router.on('route:findRequests', function (id) {
                console.log('ROUTER::FIND REQUESTS');
                //this.collections.markBinAsActive(id);
            });

            app_router.on('route:findLatestRequest', function (id) {
                console.log('ROUTE::FIND LATEST REQUESTS');
                //this.collections.markBinAsActive(id);
            });
        };

    Backbone.history.start();

    return {
        initialize: initialize
    };
});