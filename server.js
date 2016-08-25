function start(args) {
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var express = require('express');
    var fs = require('fs');
    var http = require('http');
    var https = require('https');
    var mongoose = require('mongoose');

    var app = express();

    app.on('mount', function (parent) {
        console.log('onMount');
    });

    app.use(bodyParser.urlencoded({
        extended:true
    }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    //setup session config (options passaed from start.js)
    app.use(args.session);

    //setup mongoDB connection
    mongoose.connect('mongodb://localhost/c52node');
    var db = mongoose.connection;

    //API Router
    var apiRouter = express.Router();
    app.use('/api', apiRouter);
    require('./routes/apiRoutes.js').__init({
        router: apiRouter,
        startArgs: args
    });

    //set the server options
    var options = {
        hostname: args.hostname
    };

    //look for certificate settings - use them if provided
    if (args.pfxPath) {
        options.pfx = fs.readFileSync(args.pfxPath);
        options.passphrase = args.pfxPass;
    }

    //set up server/listener
    var server;
    if (args.serveSSL) {
        server = https.createServer(options, app).listen(args.port, function () {
            console.log('HTTPS app listening at:'.bold.cyan, JSON.stringify(server.address()).bold.blue, '\n');
        });
    } else {
        server = http.createServer(app).listen(args.port, function () {
            console.log('HTTP app listening at:'.bold.cyan, JSON.stringify(server.address()).bold.blue, '\n');
        });
    }
};

exports.start = start;