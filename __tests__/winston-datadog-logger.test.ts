import { Logger, LoggerOptions, WinstonEvent } from '../src';
import { DogapiEvent } from '../src/events/dogapi-event.enum';

describe('Winston-Datadog Logger', () => {
  beforeAll(() => {
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
      environment: 'test-environment',
      eventMapping: {
        debug: DogapiEvent.Info,
        error: DogapiEvent.Error,
        info: DogapiEvent.Info,
        silly: DogapiEvent.Info,
        verbose: DogapiEvent.Info,
        warn: DogapiEvent.Warning,
      },
      exitOnError: false,
      instance: 'test-instance',
      logToConsole: true,
    };

    Logger.initialize(options);

  });

  test('should log successfully', () => {
    Logger.log(WinstonEvent.Debug, 'Test message', { 'title': 'LIBRARY' });
  });
});