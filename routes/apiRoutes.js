module.exports = {
    __init: function (config) {
        var url = require('url');
        var request = require('request');
        var constants = require('../static/js/values/constants');

        config.router.route('/')
            .get(function (req, res) {
                res.json({
                    route: 'api',
                    version: '0.0.1',
                    name: 'concordia',
                    description: 'initial version of the REST service running on node js v6.4.0 under project concordia.'
                });
            });
    }

}