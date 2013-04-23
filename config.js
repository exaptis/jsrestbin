/*global module */

module.exports = function () {
    'use strict';

    switch (process.env.NODE_ENV) {
    case 'development':
        return {
            mongodb: {
                connection: 'mongodb://localhost:27017/restfulbin'
            }
        };

    case 'production':
        return {
            mongodb: {
                connection: 'mongodb://localhost:27017/restfulbin'
            }
        };

    default:
        return {
            mongodb: {
                connection: 'mongodb://localhost:27017/restfulbin'
            }
        };
    }
};