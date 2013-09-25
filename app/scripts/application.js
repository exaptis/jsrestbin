define([
    'backbone',
    'Communicator',
    'routers/AppRouter',
    'regions/ModalRegion',
],

    function (Backbone, Communicator, AppRouter, ModalRegion) {
        'use strict';

        var App = new Backbone.Marionette.Application();

        /* Add application regions here */
        App.addRegions({
            'bins': '#bins',
            'content': '#content',
            'navigation': '#navigation',
            'modal': ModalRegion
        });

        AppRouter.initialize(App);

        /* Add initializer here */
        App.addInitializer(function () {
            Communicator.mediator.trigger('app:start');
        });

        App.on('initialize:after', function afterInitialization() {
            this.startHistory();

            if (!this.getCurrentRoute()) {
                App.trigger('bins:list');
            }
        });

        return App;
    });
