var request = require('request');
var _ = require('underscore');

var getQueryParams = function(options) {
    return _.mapObject(options, function(val, key) {
        if (_.isArray(val)) return val.join('-');
        if (_.isBoolean(val)) return val ? 1 : 0;
        return val;
    });
};

var Client = module.exports = function(apiKey) {

    var getRequest = function(path) {
        return function(options, cb) {
            if (!cb) cb = options;
            request.get('https://api.uptimerobot.com' + path, {
                qs: _.extend({
                    apiKey: apiKey,
                    format: 'json',
                    noJsonCallback: 1
                }, getQueryParams(options))
            }, function(err, res, body) {
                try {
                    var data = JSON.parse(body);
                    process.nextTick(function() {
                        cb(data.stat === 'fail' ? data.message : null, data);
                    });
                } catch(ex) {
                    cb(err || ex, body);
                }
            });
        };
    };

    this.getMonitors = getRequest('/getMonitors');
    this.newMonitor = getRequest('/newMonitor');
    this.editMonitor = getRequest('/editMonitor');
    this.deleteMonitor = getRequest('/deleteMonitor');
    this.resetMonitor = getRequest('/resetMonitor');
    this.getAlertContacts = getRequest('/getAlertContacts');
    this.newAlertContact = getRequest('/newAlertContact');
    this.deleteAlertContact = getRequest('/deleteAlertContact');
};
