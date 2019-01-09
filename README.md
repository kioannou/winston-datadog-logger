[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.com/kioannou/winston-datadog-logger.svg?branch=master)](https://travis-ci.com/kioannou/winston-datadog-logger)

# Winston datadog Logger

A [winston](https://www.npmjs.com/package/express-winston) logger with [datadog](https://www.datadoghq.com/) support.

## Install
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm i winston-datadog-logger
```


## How to use

The library provides a `Logger` instance. 

The `LoggerOptions` (The options for initializing the logger)

The `WinstonEvent` enum that exposes the available event levels for your logs.

```typescript
import { Logger, LoggerOptions, WinstonEvent } from 'winston-datadog-logger'

// Initializing the options. If no options provided it falls back to the default ones
const options = new LoggerOptions({
  
});

// Initializing the Logger using the options
Logger.initialize(options)


// Use the logger like this
// Logger.log({ level }, { message }, { meta });

// e.g
Logger.log(WinstonEvent.Debug, 'Test message', {'test': 'test'})

```

## Logger Options

The available options for now are the following:
```
  consoleTransportOptions: {
    level?: WinstonEvent;
    silent?: boolean;
    handleExceptions?: boolean;
  };
  datadogApiKey: string;
  datadogAppKey: string;
  dogapiTransportOptions: {
    apiKey: string;
    appKey: string;
    handleExceptions: boolean;
    level: WinstonEvent;
    logDatadogEvents: boolean;
    silent: boolean;
  };
  exitOnError: boolean;
  logToConsole: boolean;
  environment: string;
  eventMapping: { 
                  debug: ...,
                  error: ...,
                  info: ...,
                  silly: ...,
                  verbose: ...,
                  warn: ...,
                }
  instance: string;
  logDatadogEvents: boolean;
```

