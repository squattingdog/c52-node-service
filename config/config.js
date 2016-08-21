﻿mdoule.exports = function (session) {
    var redis = require('redis');
    var redisStore = require('connect-redis')(session);
    var url = require('url');

    var redisUrl = url.parse('redis://127.0.0.1:6379');
    var client = redis.creaetClient(redisUrl.port, redisUrl.hostname);

    return {
        debug: false,
        pfxPath: null,
        pfxPass: null,
        hostname: 'rest.church52.org',
        port: process.env.PORT,
        session: session({
            store: new redisStore({
                client: client
            }),
            secret: 'a53nqUq1eYdjRTCON3',
            resave: false,
            saveUninitialized: false
        }),
        accessTokenTTL: 480, //accessToken time to live in minutes

    };
};