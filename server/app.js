'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
//var async = require('async');
//var hbs = require('express-hbs');
//var baucis = require('baucis');
var config = require('./config.js');

var app = express(),
    conf = new config();

var mongoose = require('mongoose');


// start mongoose
mongoose.connect(conf.mongodb.connection, conf.mongodb.options);
var db = mongoose.connection;


var Utils = {
    UUID: function () {
        return Math.random().toString(36).substring(12);
    },

    merge: function (a, b) {
        for (var i in b) {
            a[i] = b[i];
        }
        return a;
    }
};

// schemas
var RequestSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        'default': Date.now
    },
    type: { type: String, require: true, unique: false },
    reference: { type: String, require: true, unique: false },
    headers: {},
    content: {},
    cookies: {},
    ip: { type: String, require: false, unique: false }
});


var BinSchema = mongoose.Schema({
    name: { type: String, require: true, unique: true },
    reference: { type: String, require: true, unique: true },
    createdAt: { type: Date, 'default': Date.now },
    requests: [RequestSchema]
});

BinSchema.statics.findByReference = function (reference, cb) {
    this.findOne({ reference: new RegExp(reference, 'i')}, cb);
};


var RequestModel = mongoose.model('request', RequestSchema);

var BinModel = mongoose.model('bin', BinSchema);


// REST api callbacks
var bin = {};

bin.add = function (req, res) {

    var bin = new BinModel({
        name: req.body.name,
        reference: Utils.UUID()
    });

    return bin.save(function (err) {
        if (!err) {
            return res.send(201, bin);
        }

        return res.send(500, err);
    });
};

bin.recordRequest = function (req, res) {
    return BinModel.findByReference(req.params.reference, function (err, bin) {

        req.cookies = {};

        if (req.headers.cookie) {
            var cookies = req.headers.cookie.split(';');

            cookies.forEach(function (cookie) {
                var data = cookie.trim().split('=');
                req.cookies[data[0]] = data[1];
            });

            delete req.headers.cookie;
        }

        var request = new RequestModel({
            type: req.method,
            reference: Utils.UUID(),
            headers: req.headers,
            content: Utils.merge(req.body, req.query),
            cookies: req.cookies,
            ip: req.ip
        });

        bin.requests.push(request);

        return bin.save(function (err) {
            if (!err) {
                return res.send(201, request);
            }

            return res.send(500);
        });
    });
};

bin.findAll = function (req, res) {
    return BinModel.find(function (err, bins) {
        if (!err) {

            Object.keys(bins).forEach(function (key) {
                bins[key].requests = null;
            });

            return res.send(200, bins);
        }

        return res.send(500);
    });
};

bin.findByReference = function (req, res) {
    return BinModel.findByReference(req.params.reference, function (err, bin) {
        if (!err) {
            bin.requests = null;
            return res.send(200, bin);
        }

        return res.send(500);
    });
};

bin.findAllRequests = function (req, res) {
    return BinModel.findByReference(req.params.reference, function (err, bin) {
        if (!err && bin) {
            return res.send(200, bin.requests);
        }

        return res.send(500);
    });
};

bin.findLatestRequest = function (req, res) {
    return BinModel.findByReference(req.params.reference, function (err, bin) {
        if (!err) {
            var requests = [];

            if (bin.requests.length > 0) {
                requests = bin.requests.pop();
            }
            return res.send(200, requests);
        }

        return res.send(500);
    });
};

bin.findRequestById = function (req, res) {
    return BinModel.findByReference(req.params.reference, function (err, bin) {
        if (!err) {
            for (var i = bin.requests.length - 1; i >= 0; i--) {
                if (bin.requests[i]['_id'].toString() === req.params.rid) {
                    return res.send(200, bin.requests[i]);
                }
            }

            return res.send(404);
        }

        return res.send(500);
    });
};

bin.deleteAll = function (req, res) {
    BinModel.remove(function (err) {
        return res.send(err ? 500 : 204);
    });
};

bin.deleteBin = function (req, res) {
    return BinModel.findByReference(req.params.reference, function (err, bin) {
        return bin.remove(function (err) {
            return res.send(err ? 500 : 204);
        });
    });
};

bin.deleteAllRequests = function (req, res) {
    return BinModel.findByReference(req.params.reference, function (err, bin) {
        if (!err) {
            bin.requests = [];
            bin.save();
            return res.send(204);
        }

        return res.send(500);
    });
};

bin.deleteRequest = function (req, res) {
    return BinModel.findByReference(req.params.reference, function (err, bin) {
        if (!err) {
            for (var i = bin.requests.length - 1; i >= 0; i--) {
                if (bin.requests[i]['_id'].toString() === req.params.rid) {
                    bin.requests = bin.requests.splice(i, 1);
                    bin.save();
                    return res.send(204);
                }
            }
            return res.send(404);
        }

        return res.send(500);
    });
};

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {

//    baucis.rest({ singular: 'request' });
//    baucis.rest({ singular: 'bin' });

    var app = express();

    app.configure(function () {
        app.set('port', 9000);
        app.set('view engine', 'handlebars');
        app.set('views', __dirname + '../app/scripts/views');
    });

//    app.use(express.urlencoded());
//    app.use('/api/v1', baucis({ swagger: true }));

    //parse body
    app.use(express.bodyParser())


    app.get('/bins/:reference', bin.recordRequest);
    app.put('/bins/:reference', bin.recordRequest);
    app.post('/bins/:reference', bin.recordRequest);
    app.delete('/bins/:reference', bin.recordRequest);


    // Default
    app.get('/api', function (req, res) {
        res.send(200, 'jsRestBin API is running');
    });

    // ADD
    app.post('/api/v1/bins', bin.add);
    app.post('/api/v1/bins/:reference/requests', bin.recordRequest);

    // VIEW
    app.get('/api/v1/bins', bin.findAll);
    app.get('/api/v1/bins/:reference', bin.findByReference);
    app.get('/api/v1/bins/:reference/requests', bin.findAllRequests);
    app.get('/api/v1/bins/:reference/requests/latest', bin.findLatestRequest);
    app.get('/api/v1/bins/:reference/requests/:rid', bin.findRequestById);

    // DELETE
    app.delete('/api/v1/bins', bin.deleteAll);
    app.delete('/api/v1/bins/:reference', bin.deleteBin);
    app.delete('/api/v1/bins/:reference/requests', bin.deleteAllRequests);
    app.delete('/api/v1/bins/:reference/requests/:rid', bin.deleteRequest);


    // simple log
    app.use(function (req, res, next) {
        console.log('%s %s', req.method, req.url);
        next();
    });

    // mount static
    app.use(express.static(path.join(__dirname, '../app')));
    app.use(express.static(path.join(__dirname, '../.tmp')));


    // route index.html
    app.get('/', function (req, res) {
        res.sendfile(path.join(__dirname, '../app/index.html'));
    });

    // start server
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express App started!');
    });
});


