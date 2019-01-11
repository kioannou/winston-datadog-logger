import { Logger, LoggerOptions, WinstonEvent } from "../src";

describe('Winston-Datadog Logger', () => {
  beforeAll(() => {
    const options = new LoggerOptions();
    Logger.initialize(options)

  });

  test('should log successfully', () => {
    Logger.log(WinstonEvent.Debug, 'Test message', {'title': 'test'})
  })
});