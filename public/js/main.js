require.config({

    // Define library shortcuts
    paths: {
        'jquery': 'libs/jquery/jquery.min',
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone',
        'bootstrap': 'libs/bootstrap/bootstrap',
        'bootbox': 'libs/bootstrap/bootbox',
        'text': 'libs/require/text',
        'templates': '../templates'
    },

    // Define library dependencies, will make them globally available
    shim: {
        jquery: {
            exports: "$"
        },

        underscore: {
            exports: "_"
        },

        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'

        },

        bootstrap: {
            deps: ['jquery'],
            exports: 'Bootstrap'
        },

        bootbox: {
            deps: ['jquery'],
            exports: 'bootbox'
        },

        app : {
            deps: ['backbone', 'bootstrap', 'bootbox'],
            exports: 'App'
        }

    }
});

require(['app'], function (App) {
    'use strict';
    App.initialize();
});