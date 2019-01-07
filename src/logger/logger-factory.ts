import * as winston from "winston";
import { DogapiTransport } from "../transports/dogapi-transport";
import { ILoggerOptions } from "../logger-options/logger-options.interface";
import { IConsoleTransportOptions } from "../transports/console-transport-options.interface";
import { DEFAULT_CONSOLE_TRANSPORT_OPTIONS } from "../transports/default-console-transport-options.const";
import { LoggerOptions } from "../logger-options/logger-options";
import { IDogapiTransportOptions } from "../transports/dogapi-transport-options.interface";
import { DEFAULT_DOGAPI_TRANSPORT_OPTIONS } from "../transports/default-dogapi-transport-options.const";

export class LoggerFactory {
  private readonly options: LoggerOptions;

  constructor(options?: ILoggerOptions) {
    this.options = LoggerFactory.initializeOptions(options);
  }

  public create(): winston.Logger {
    // Creating the configuration format
    const formatConfiguration = LoggerFactory.createFormatConfiguration();

    // Creating the main logger
    const logger = LoggerFactory.createLogger(formatConfiguration, this.options);

    // Resolving Console Transport
    if (this.options && this.options.logToConsole) {
      const consoleTransportOptions = this.createConsoleTransportOptions();
      const consoleTransport = LoggerFactory.createConsoleTransport(consoleTransportOptions);
      logger.transports.push(consoleTransport);
    }

    // Adding Dogapi Transport
    const dogapiTransportOptions = this.createDogapiTransportOptions();
    const dogapiTransport = this.createDogapiTransport(dogapiTransportOptions);
    logger.transports.push(dogapiTransport);

    return logger;
  }


  private static initializeOptions(options?: ILoggerOptions): LoggerOptions {
    return new LoggerOptions(options);
  }

  private createConsoleTransportOptions(): IConsoleTransportOptions {
    return (this.options && this.options.consoleTransportOptions) ?
      this.options.consoleTransportOptions
      : DEFAULT_CONSOLE_TRANSPORT_OPTIONS;
  }

  private static createConsoleTransport(consoleTransportOptions: IConsoleTransportOptions): any {
    return new winston.transports.Console(consoleTransportOptions);
  }

  private static createFormatConfiguration(): any {
    return winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf(info =>
        `${info.timestamp} ${info.level}: ${info.message}`));
  }

  private static createLogger(formatConfiguration: any, options?: LoggerOptions): winston.Logger {

    return winston.createLogger({
      format: formatConfiguration, // Uses the custom format defined above
      transports: [],
      exitOnError: LoggerFactory.resolveExitOnError(options)
    });
  }

  private static resolveExitOnError(options?: LoggerOptions): boolean {
    return (options && options.exitOnError) ? options.exitOnError : false;
  }

  private createDogapiTransportOptions(): any {
    return (this.options && this.options.dogapiTransportOptions) ?
      this.options.dogapiTransportOptions
      : DEFAULT_DOGAPI_TRANSPORT_OPTIONS;
  }

  private createDogapiTransport(dogapiTransportOptions: IDogapiTransportOptions): any {
    return new DogapiTransport(dogapiTransportOptions, this.options);
  }
}