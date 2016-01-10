uptimerobot-client
==============

[![NPM Version](https://badge.fury.io/js/uptimerobot-client.svg)](https://npmjs.org/package/uptimerobot-client)
[![Build Status](https://api.travis-ci.org/4lejandrito/uptimerobot-node-client.svg?branch=master)](https://travis-ci.org/4lejandrito/uptimerobot-node-client)
[![Package downloads](http://img.shields.io/npm/dm/uptimerobot-client.svg)](https://npmjs.org/package/uptimerobot-client)

```javascript
var UptimeRobotClient = require('uptimerobot-client');

var client = new UptimeRobotClient('apikey');

client.getMonitors({
    logs: true,
    alertContacts: true,
    responseTimes: false,
    responseTimesAverage: 180,
    monitors: [15830, 32696],
    customUptimeRatio: 30
}, function(err, response) {
    // The response will be the javascript object
});
```

## Installation

```sh
$ npm install uptimerobot-client
```

## Running Tests

To run the test suite, first invoke the following command within the repo, installing the development dependencies:

```sh
$ npm install
```

Then run the tests:

```sh
$ npm test
```

## License

[MIT](LICENSE.md)
