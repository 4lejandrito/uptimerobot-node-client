var assert = require('chai').assert;
var Client = require('./index');
var nock = require('nock');

describe('Uptimerobot client hitting the real API', function() {

  it('fails when the api key is in a wrong format', function(done) {
      var client = new Client('wrongformat');
      var expectedResponse = {
        stat: 'fail',
        id: '100',
        message: 'apiKey not mentioned or in a wrong format'
      }
      client.getMonitors(function(err, response) {
          assert.equal(err, expectedResponse.message);
          assert.deepEqual(response, expectedResponse);
          done();
      });
  });

  it('fails when the api key is wrong', function(done) {
      var client = new Client('u123456-000000000000000000000000');
      var expectedResponse = {
        stat: 'fail',
        id: '101',
        message: 'apiKey is wrong'
      }
      client.getMonitors(function(err, response) {
          assert.equal(err, expectedResponse.message);
          assert.deepEqual(response, expectedResponse);
          done();
      });
  });

  it('fails when the api key is not set', function(done) {
      var client = new Client();
      client.getMonitors(function(err, response) {
          assert.isNotNull(err);
          assert.deepEqual(response, 'An error occurred on the server when processing the URL. Please contact the system administrator. <p/> If you are the system administrator please click <a href="http://go.microsoft.com/fwlink/?LinkID=82731">here</a> to find out more about this error.');
          done();
      });
  });
});

describe('Uptimerobot client', function() {

    var fakeApi;
    var apiKey = 'theapikey';

    before(function() {
      fakeApi = nock('https://api.uptimerobot.com');
    })

    afterEach(function() {
        fakeApi.done();
    });

    describe('getMonitors', function() {

        it('provides the json response', function(done) {
            var json = require('./responses/getMonitors');

            fakeApi.get('/getMonitors')
            .query({apiKey: apiKey, format: 'json', noJsonCallback: 1})
            .reply(200, JSON.stringify(json));

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
                noJsonCallback: 1,
                logs: 1,
                alertContacts: 1,
                responseTimes: 0,
                responseTimesAverage: 180,
                monitors: '15830-32696',
                customUptimeRatio: 30
            })
            .reply(200, JSON.stringify(json));

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
            .query({apiKey: apiKey, format: 'json', noJsonCallback: 1})
            .reply(200, JSON.stringify(json));

            var client = new Client(apiKey);

            client.getMonitors(function(err, response) {
                assert.equal(err, json.message);
                assert.deepEqual(response, json);
                done();
            });
        });

        it('fails with the error if the request fails', function(done) {
            fakeApi.get('/getMonitors')
            .query({apiKey: apiKey, format: 'json', noJsonCallback: 1})
            .reply(500, 'some weird error');

            var client = new Client(apiKey);

            client.getMonitors(function(err, response) {
                assert.instanceOf(err, SyntaxError);
                assert.equal(response, 'some weird error');
                done();
            });
        });
    });

    // @TODO implement tests
    describe('addMonitor', function() {
        it('provides the json response', function(done) {
            assert.equal(1, 1);
            done();
        });
        it('passes the options', function(done) {
            assert.equal(1, 1);
            done();
        });
        it('fails with the error if the api fails', function(done) {
            assert.equal(1, 1);
            done();
        });
        it('fails with the error if the request fails', function(done) {
            assert.equal(1, 1);
            done();
        });
    });

    // @TODO implement tests
    describe('editMonitor', function() {
        it('provides the json response', function(done) {
            assert.equal(1, 1);
            done();
        });
        it('passes the options', function(done) {
            assert.equal(1, 1);
            done();
        });
        it('fails with the error if the api fails', function(done) {
            assert.equal(1, 1);
            done();
        });
        it('fails with the error if the request fails', function(done) {
            assert.equal(1, 1);
            done();
        });
    });

    // @TODO implement tests
    describe('deleteMonitor', function() {
        it('provides the json response', function(done) {
            assert.equal(1, 1);
            done();
        });
        it('passes the options', function(done) {
            assert.equal(1, 1);
            done();
        });
        it('fails with the error if the api fails', function(done) {
            assert.equal(1, 1);
            done();
        });
        it('fails with the error if the request fails', function(done) {
            assert.equal(1, 1);
            done();
        });
    });

    // @TODO implement tests
    describe('resetMonitor', function() {
        it('provides the json response', function(done) {
            assert.equal(1, 1);
            done();
        });
        it('passes the options', function(done) {
            assert.equal(1, 1);
            done();
        });
        it('fails with the error if the api fails', function(done) {
            assert.equal(1, 1);
            done();
        });
        it('fails with the error if the request fails', function(done) {
            assert.equal(1, 1);
            done();
        });
    });
});
