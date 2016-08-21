var server = require('./server.js');
var startupArgs = require('./config/config.js');
var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var extend = require('extend');

process.argv.forEach(function (val, index, array) {
    //console.log(index + ': ' + val);
});

var customArgs = {
    serveSSL: false //heroku will server ssl, local needs to serve it.
}

var startupType = process.argv[2];

//set startup args by type
switch (startupType.toLowerCase()) {
    case 'dev':
        customArgs = require('./config/config.local.js');
        //this server has to serve SSL
        customArgs.serveSSL = true;
        //disable ssl error
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        break;
    case 'qa':
        customArgs = require('./config/config.qa.js');
        break;
    case 'uat':
        customArgs = require('./config/config.uat.js');
        break;
    case 'prod':
        customArgs = require('./config/config.prod.js');
        break;
    default:
        console.error('Unknown startup type: ' + startupType);
        process.exit(1);
        break;
}

//merge default and custom configs
extend(startupArgs, customArgs);

//add global values to startupArgs


//start the server
server.start(startupArgs);