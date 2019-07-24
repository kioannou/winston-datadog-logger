[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.com/kioannou/winston-datadog-logger.svg?branch=master)](https://travis-ci.com/kioannou/winston-datadog-logger)

# Winston Datadog Logger

A [winston](https://www.npmjs.com/package/express-winston) logger with [datadog](https://www.datadoghq.com/) support.

## Install
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm i winston-datadog-logger
```


## How to use

The library provides a `Logger` instance. 

The `LoggerOptions` (The options for initializing the logger)

The `WinstonEvent` enum that exposes 
the available event levels for your logs.

```typescript
import { Logger, 
         LoggerOptions, 
         WinstonEvent } from 'winston-datadog-logger';

// Initializing the options. 
const options = {
  exitOnError: false, // boolean. It defaults to `false`
  environment: null, // (optional) string. It defaults to `null`
  instance: null, // (Optional) string. It defaults to `null`
  eventMapping: { // (Optional) The mapping of Winston events to Datadog ones. Possible values: `info`, `error`, `warning`, `success`
    debug: 'info',
    error: 'error',
    info: 'info',
    silly: 'info',
    verbose: 'info',
    warn: 'warning',
  },
  logToConsole: false, // (optional) boolean. It defaults to `null`
  consoleTransportOptions: {
    level: 'debug', // (optional) WinstonLevel. Defaults to `debug`. Possible values `error`, `warning`, `info`, `verbose`, `debug`, `silly`
    silent: true, // (optional) boolean. It defaults to `true`
    handleExceptions: true // (optional) boolean. It defaults to `true`
  },
  datadogLoggerEnabled: true, // (optional) boolean. It defaults to `true`
  dogapiTransportOptions: {
    apiKey: null, // string. The datadog api key of your application
    appKey: null, // string. The datadog app key of your application
    handleExceptions: true, // boolean. It defaults to `true`
    level: 'debug', // (optional) WinstonLevel. Defaults to `debug`. Possible values `error`, `warning`, `info`, `verbose`, `debug`, `silly`
    logDatadogEvents: true, // boolean. It defaults to `true`
    silent: true, // boolean. It defaults to `true`
    tags: ['environment:production', 'version:1.2.3'], // allows transport level tagging in datadog
    title: 'test-title' // string. It defaults to empty and can be overridden in the log messages
  }
};

// Initializing the Logger using the options
Logger.initialize(options);


// Use the logger like this
// Logger.log({ level }, { message }, { meta });

// e.g
Logger.log(WinstonEvent.Debug, 'example message', {'title': 'your-title'});
```

