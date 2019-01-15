import { WinstonEvent } from '../src';
import { DogapiEvent } from '../src/events/dogapi-event.enum';
import { Logger } from '../src/logger/logger';

describe('Winston-Datadog Logger', () => {
  test('should log successfully', () => {
    const options = {
      consoleTransportOptions: {
        handleExceptions: true,
        level: WinstonEvent.Debug,
        silent: false,
      },
      dogapiTransportOptions: {
        apiKey: '',
        appKey: '',
        handleExceptions: true,
        level: WinstonEvent.Debug,
        logDatadogEvents: true,
        silent: false,
      },
      environment: 'local',
      eventMapping: {
        debug: DogapiEvent.Info,
        error: DogapiEvent.Error,
        info: DogapiEvent.Info,
        silly: DogapiEvent.Info,
        verbose: DogapiEvent.Info,
        warn: DogapiEvent.Warning,
      },
      exitOnError: false,
      instance: 'base-gateway',
      logToConsole: true,
    };

    Logger.initialize(options);

    // For manual test purposes
    Logger.log(WinstonEvent.Debug, 'Test message', { 'title': 'TEST TITLE' });
  });
});