module.exports = function (session) {
    var redis = require('redis');
    var redisStore = require('connect-redis')(session);
    var url = require('url');

    var redisUrl = url.parse('redis://127.0.0.1:6379');
    var client = redis.createClient(redisUrl.port, redisUrl.hostname);

    var settings = {
        debug: false,
        pfxPath: null, //use in local config for https './certificates/c52.pfx'
        pfxPass: null, //use in local config for https 'passwd'
        hostname: 'c52-local.church52.org',
        port: process.env.PORT | 5000,
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
    return settings;
};