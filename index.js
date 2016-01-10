var request = require('request');
var _ = require('underscore');

var parseJSONResponse = function(response) {
    var regex = /^jsonUptimeRobotApi\((.*)\)$/;
    return JSON.parse(response.match(regex)[1]);
};

var getQueryParams = function(options) {
    return _.mapObject(options, function(val, key) {
        if (_.isArray(val)) return val.join('-');
        if (_.isBoolean(val)) return val ? 1 : 0;
        return val;
    });
};

var Client = module.exports = function(apiKey) {

    var url = 'https://api.uptimerobot.com';

    this.getMonitors = function(options, cb) {
        if (!cb) cb = options;

        request.get(url + '/getMonitors', {
            qs: _.extend({
                apiKey: apiKey,
                format: 'json'
            }, getQueryParams(options))
        }, function(err, res, body) {
            try {
                var data = parseJSONResponse(body);
                cb(data.stat === 'fail' ? data.message : null, data);
            } catch(ex) {
                cb(err || ex, body);
            }
        });
    };
};
