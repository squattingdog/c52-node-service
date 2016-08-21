function start(args) {
    var http = require('http');
    var https = require('https');
    var express = require('express');
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
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

    console.log('server running'.bold.green);
};

exports.start = start;