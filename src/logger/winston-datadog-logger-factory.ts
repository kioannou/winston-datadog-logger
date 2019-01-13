import * as winston from 'winston';
import { LoggerOptions } from '..';
import { DogapiTransport } from '../transports/dogapi-transport';

export class WinstonDatadogLoggerFactory {
  private static initializeOptions(options?: LoggerOptions): LoggerOptions {
    return new LoggerOptions(options);
  }

  private static resolveExitOnError(options?: LoggerOptions): boolean {
    return options && options.exitOnError ? options.exitOnError : false;
  }
  private readonly options: LoggerOptions;

  constructor(options?: LoggerOptions) {
    this.options = WinstonDatadogLoggerFactory.initializeOptions(options);
  }

  public create(): winston.Logger {
    // Creating the configuration format
    const formatConfiguration = winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    );

    const transports = [];

    // Resolving Console Transport
    if (this.options && this.options.logToConsole) {
      const consoleTransportOptions = this.options.consoleTransportOptions;
      const consoleTransport = new winston.transports.Console(consoleTransportOptions);
      transports.push(consoleTransport);
    }

    // Adding Dogapi Transport
    const dogapiTransport = new DogapiTransport(this.options);
    transports.push(dogapiTransport);

    // Creating the main logger
    return winston.createLogger({
      exitOnError: WinstonDatadogLoggerFactory.resolveExitOnError(this.options),
      format: formatConfiguration, // Uses the custom format defined above
      transports,
    });
  }
}
