var color = require('colour');
console.log('initializing'.cyan);
var server = require('./server.js');
var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);

process.argv.forEach(function (val, index, array) {
    //console.log(index + ': ' + val);
});

var startupType = process.argv[2];
console.log('starting as '.yellow + startupType.yellow + ' instance'.yellow);

//set startup args by type
var extend = require('extend');
var startupArgs = require('./config/config.js')(session);
var customArgs = {
    serveSSL: false //heroku will server ssl, local needs to serve it.
}

switch (startupType.toLowerCase()) {
    case 'dev':
        customArgs = require('./config/config.local.js')(session);
        //this server has to serve SSL
        customArgs.serveSSL = true;
        //disable ssl error
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        break;
    case 'qa':
        customArgs = require('./config/config.qa.js')(session);
        break;
    case 'uat':
        customArgs = require('./config/config.uat.js')(session);
        break;
    case 'prod':
        customArgs = require('./config/config.prod.js')(session);
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