import * as winston from 'winston';
import { LoggerOptions } from '..';
import { ConsoleTransportOptions } from '../transports/console-transport-options';
import { DogapiTransport } from '../transports/dogapi-transport';

export class WinstonDatadogLoggerFactory {
  private static initializeOptions(options?: LoggerOptions): LoggerOptions {
    return new LoggerOptions(options);
  }

  private static createConsoleTransport(consoleTransportOptions: ConsoleTransportOptions): any {
    return new winston.transports.Console(consoleTransportOptions);
  }

  private static createFormatConfiguration(): any {
    return winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    );
  }

  private static createLogger(formatConfiguration: any, transports: any[], options?: LoggerOptions): winston.Logger {
    return winston.createLogger({
      exitOnError: WinstonDatadogLoggerFactory.resolveExitOnError(options),
      format: formatConfiguration, // Uses the custom format defined above
      transports,
    });
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
    const formatConfiguration = WinstonDatadogLoggerFactory.createFormatConfiguration();
    const transports = [];

    // Resolving Console Transport
    if (this.options && this.options.logToConsole) {
      const consoleTransportOptions = this.options.consoleTransportOptions;
      const consoleTransport = WinstonDatadogLoggerFactory.createConsoleTransport(consoleTransportOptions);
      transports.push(consoleTransport);
    }

    // Adding Dogapi Transport
    const dogapiTransport = this.createDogapiTransport();
    transports.push(dogapiTransport);

    // Creating the main logger
    return WinstonDatadogLoggerFactory.createLogger(formatConfiguration, transports, this.options);
  }

  private createDogapiTransport(): any {
    return new DogapiTransport(this.options);
  }
}
