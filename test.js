var assert = require('chai').assert;
var Client = require('.');
var nock = require('nock');

describe('Uptimerobot client', function() {

    var fakeApi = nock('https://api.uptimerobot.com');
    var apiKey = 'theapikey';

    afterEach(function() {
        fakeApi.done();
    });

    describe('getMonitors', function() {

        it('provides the json response', function(done) {
            var json = require('./responses/getMonitors');

            fakeApi.get('/getMonitors')
            .query({apiKey: apiKey, format: 'json'})
            .reply(200, 'jsonUptimeRobotApi(' + JSON.stringify(json) + ')');

            var client = new Client(apiKey);

            client.getMonitors(function(err, response) {
                assert.equal(err, null);
                assert.deepEqual(response, json);
                done();
            });
        });

        it('passes the options', function(done) {
            var json = require('./responses/getMonitors');

            fakeApi.get('/getMonitors')
            .query({
                apiKey: apiKey,
                format: 'json',
                logs: 1,
                alertContacts: 1,
                responseTimes: 0,
                responseTimesAverage: 180,
                monitors: '15830-32696',
                customUptimeRatio: 30
            })
            .reply(200, 'jsonUptimeRobotApi(' + JSON.stringify(json) + ')');

            var client = new Client(apiKey);

            client.getMonitors({
                logs: true,
                alertContacts: true,
                responseTimes: false,
                responseTimesAverage: 180,
                monitors: [15830, 32696],
                customUptimeRatio: 30
            }, function(err, response) {
                assert.equal(err, null);
                assert.deepEqual(response, json);
                done();
            });
        });

        it('fails with the error if the api fails', function(done) {
            var json = {
                stat: 'fail',
                id: '101',
                message: 'apiKey is wrong'
            };

            fakeApi.get('/getMonitors')
            .query({apiKey: apiKey, format: 'json'})
            .reply(200, 'jsonUptimeRobotApi(' + JSON.stringify(json) + ')');

            var client = new Client(apiKey);

            client.getMonitors(function(err, response) {
                assert.equal(err, json.message);
                assert.deepEqual(response, json);
                done();
            });
        });

        it('fails with the error if the request fails', function(done) {
            fakeApi.get('/getMonitors')
            .query({apiKey: apiKey, format: 'json'})
            .reply(500, 'some weird error');

            var client = new Client(apiKey);

            client.getMonitors(function(err, response) {
                assert.instanceOf(err, TypeError);
                assert.equal(response, 'some weird error');
                done();
            });
        });
    });
});
