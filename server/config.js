/*global module */

module.exports = function () {
    'use strict';

    switch (process.env.NODE_ENV) {
        case 'development':
            return {
                mongodb: {
                    connection: 'mongodb://localhost:27017/jsrestbin',
                    options: {
                        user: 'jsrestbin',
                        pass: 'changeme'
                    }
                }
            };

        case 'production':
            return {
                mongodb: {
                    connection: 'mongodb://localhost:27017/jsrestbin',
                    options: {
                        user: 'jsrestbin',
                        pass: 'changeme'
                    }
                }
            };

        default:
            return {
                mongodb: {
                    connection: 'mongodb://localhost:27017/jsrestbin',
                    options: {
                        user: 'jsrestbin',
                        pass: 'changeme'
                    }
                }
            };
    }
};