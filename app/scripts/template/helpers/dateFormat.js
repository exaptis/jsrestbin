define([
    'handlebars'
], function (Handlebars) {
    'use strict';

    Handlebars.registerHelper('dateFormat', function (context, options) {
        return new Date(context).toUTCString();
    });
});