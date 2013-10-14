'use strict';

//var async = require('async');
//var hbs = require('express-hbs');

var express = require('express');
var mongoose = require('mongoose');
var baucis = require('baucis');

var http = require('http');
var path = require('path');
var config = require('./config.js');
var conf = new config();

// Connect to the Mongo instance
mongoose.connect(conf.mongodb.connection, conf.mongodb.options);
var db = mongoose.connection;

/* ==============================
 COMMON UTILS
 ============================== */

var Utils = {
    merge: function (a, b) {
        for (var i in b) {
            a[i] = b[i];
        }
        return a;
    }
};

/* ==============================
 SCHEMA
 ============================== */

// Create schema
var Request = mongoose.Schema({
    createdAt: {
        type: Date,
        'default': Date.now
    },
    binId: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    ip: {
        type: String
    },
    headers: {},
    content: {},
    cookies: {}
});

var Bin = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    createdAt: {
        type: Date,
        'default': Date.now
    }
});

// Register the schema
var RequestModel = mongoose.model('request', Request);
var BinModel = mongoose.model('bin', Bin);

/* ==============================
 MIDDLEWARE
 ============================== */

Request.pre('save', function (next) {
    console.log('A Request was saved to Mongo: %s.', this.get('type'));
    next();
});

Bin.pre('save', function (next) {
    console.log('A Bin was saved to Mongo: %s.', this.get('name'));
    next();
});

Bin.post('remove', function (next) {
    console.log('A Bin was deleted from Mongo: %s.', this.get('name'));
    next();
});


/* ==============================
 API ROUTE
 ============================== */

var requestController = baucis.rest({
    singular: 'request',
    basePath: '/:binId/requests'
});

var binController = baucis.rest({
    singular: 'bin'
});


binController.use(requestController);

/* ==============================
 CONTROLLER
 ============================== */

requestController.query('head get put', function (request, response, next) {
    request.baucis.query.where('binId', request.params.binId);
    next();
});


/* ==============================
 CONTROLLER
 ============================== */

var handler = {};
handler.recordRequest = function (httpRequest, response) {
    return BinModel.findById(httpRequest.params.binId, function (err, bin) {

        httpRequest.cookies = {};

        if (httpRequest.headers.cookie) {
            var cookies = httpRequest.headers.cookie.split(';');

            cookies.forEach(function (cookie) {
                var data = cookie.trim().split('=');
                httpRequest.cookies[data[0]] = data[1];
            });

            delete httpRequest.headers.cookie;
        }

        var request = new RequestModel({
            type: httpRequest.method,
            headers: httpRequest.headers,
            content: Utils.merge(httpRequest.body, httpRequest.query),
            cookies: httpRequest.cookies,
            ip: httpRequest.ip,
            binId: bin.get('id')
        });


        return request.save(function (err) {
            if (!err) {
                return response.send(201, request);
            }

            return response.send(500);
        });
    });
};

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    var app = express();
    app.configure(function () {
        app.set('port', 9000);
        app.set('view engine', 'handlebars');
        app.set('views', __dirname + '../app/scripts/views');
    });

//    app.use(express.urlencoded());
    app.use('/api/v1', baucis({ swagger: true }));
    app.use(express.bodyParser())

    app.get('/api/v1/bins/:binId/record', handler.recordRequest);
    app.put('/api/v1/bins/:binId/record', handler.recordRequest);
    app.post('/api/v1/bins/:binId/record', handler.recordRequest);
    app.delete('/api/v1/bins/:binId/record', handler.recordRequest);

    // simple log
    app.use(function (req, res, next) {
        console.log('%s %s', req.method, req.url);
        next();
    });

    // mount static
    app.use(express.static(path.join(__dirname, '../app')));
    app.use(express.static(path.join(__dirname, '../.tmp')));
    app.use('/swagger-gui', express.static(path.join(__dirname, '../swagger-gui')));

    // route index.html
    app.get('/', function (req, res) {
        res.sendfile(path.join(__dirname, '../app/index.html'));
    });

    // route swagger-gui/index.html
    app.get('/swagger-gui', function (req, res) {
        res.sendfile(path.join(__dirname, '../swagger-gui/index.html'));
    });

    // start server
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express App started!');
    });
});


