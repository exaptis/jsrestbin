"use strict";

var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    mongoose = require('mongoose'),
    Config = require('./config.js');

var app = express(),
    conf = new Config();

// database


mongoose.connect(conf.mongodb.connection);

// config

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, "public")));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});


// schemas

var RequestSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        'default': Date.now
    },
    type: String,
    reference: String,
    headers: {},
    content: {},
    cookies: {},
    ip: String
});

var BinSchema = mongoose.Schema({
    name: String,
    reference: String,
    createdAt: {
        type: Date,
        'default': Date.now
    },
    requests: [RequestSchema]
});

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


BinSchema.statics.findByReference = function (reference, cb) {
    this.findOne({ reference: new RegExp(reference, 'i')}, cb);
};

// models

var RequestModel = mongoose.model('Requests', RequestSchema);
var BinModel = mongoose.model('Bins', BinSchema);


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

        return res.send(500);
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
            content: Utils.merge(req.body,req.query),
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
            return res.send(200, bin.requests.pop());
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


//TODO ADD API Version Number

app.get('/bins/:reference', bin.recordRequest);
app.put('/bins/:reference', bin.recordRequest);
app.post('/bins/:reference', bin.recordRequest);
app.delete('/bins/:reference', bin.recordRequest);


// Default
app.get('/api', function (req, res) {
    res.send(200, 'jsRestBin API is running');
});

// ADD
app.post('/api/bins', bin.add);
app.post('/api/bins/:reference/requests', bin.recordRequest);

// VIEW
app.get('/api/bins', bin.findAll);
app.get('/api/bins/:reference', bin.findByReference);
app.get('/api/bins/:reference/requests', bin.findAllRequests);
app.get('/api/bins/:reference/requests/latest', bin.findLatestRequest);
app.get('/api/bins/:reference/requests/:rid', bin.findRequestById);

// DELETE
app.delete('/api/bins', bin.deleteAll);
app.delete('/api/bins/:reference', bin.deleteBin);
app.delete('/api/bins/:reference/requests', bin.deleteAllRequests);
app.delete('/api/bins/:reference/requests/:rid', bin.deleteRequest);


// Launch server

app.listen(4242);
