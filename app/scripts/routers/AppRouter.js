define([
    'controllers/BinController',
    'controllers/RequestController',
    'controllers/NavigationController'
], function (BinController, RequestController, NavigationController) {
    'use strict';

    var binController = new BinController(),
        requestController = new RequestController(),
        navigationController = new NavigationController(),

        AppRouter = Backbone.Marionette.AppRouter.extend({
            appRoutes: {
                'bins': 'listBins',
                'bins/:binId/requests': 'listRequests',
                'bins/:binId/requests/latest': 'listLatestRequest',
                'static/:page': 'showStaticPage'
            }
        }),

        API = {
            listBins: function () {
                binController.listBins();
            },
            listRequests: function (binId) {
                this.listBins();
                requestController.listRequests(binId);
            },
            listLatestRequest: function (binId) {
                this.listBins();
                requestController.listLatestRequest(binId);
            },
            showStaticPage: function (page) {
                this.listBins();
                navigationController.showPage(page);
            }
        };

    return {
        initialize: function (App) {
            App.on('bins:list', function () {
                App.navigate('bins');
                API.listBins();
            });

            App.on('requests:list', function (binId) {
                App.navigate('bins/' + binId + '/requests');
                API.listRequests(binId);
            });

            App.on('requests:listLatest', function (binId) {
                App.navigate('bins/' + binId + '/requests/latest');
                API.listLatestRequest(binId);
            });

            App.on('navigation:showPage', function (page) {
                App.navigate('static/' + page);
            });

            App.addInitializer(function () {
                return new AppRouter({
                    controller: API
                });
            });
        }
    };
});