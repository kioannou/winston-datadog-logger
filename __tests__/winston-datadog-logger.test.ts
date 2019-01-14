import { WinstonEvent } from '../src';
import { DogapiEvent } from '../src/events/dogapi-event.enum';
import { LoggerOptionsRepository } from '../src/logger-options/logger-options-repository';
import wdlogger from '../src/logger/logger';

describe('Winston-Datadog Logger', () => {
  beforeAll(() => {
    const options = {
      consoleTransportOptions: {
        handleExceptions: true,
        level: WinstonEvent.Debug,
        silent: false,
      },
      dogapiTransportOptions: {
        apiKey: '940d9f1c2b41d0fefc21cd928b1395dc',
        appKey: 'a4635ec433a46b90d974f832ec9be7c7c9f8cb5b',
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

    LoggerOptionsRepository.initialize(options);

  });

  test('should log successfully', () => {
    wdlogger.log(WinstonEvent.Error, 'Test message', { 'title': 'VICTORY' });
  });
});