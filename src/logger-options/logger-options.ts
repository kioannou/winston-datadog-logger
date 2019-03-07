import { DEFAULT_MAPPED_EVENTS } from '../events/default-mapped-events';
import { IMappedEvents } from '../events/mapped-events.interface';
import { ConsoleTransportOptions } from '../transports/console-transport-options';
import { DogapiTransportOptions } from '../transports/dogapi-transport-options';
import { NullableString } from '../types/nullable-string.type';
import { ILoggerOptions } from './logger-options.interface';

export class LoggerOptions implements ILoggerOptions {
  private static setConsoleTransportOptions(options?: ILoggerOptions): ConsoleTransportOptions {
    if (options && options.hasOwnProperty('consoleTransportOptions')) {
      return new ConsoleTransportOptions(options.consoleTransportOptions);
    }
    return new ConsoleTransportOptions();
  }

  private static setDogapiTransportOptions(options?: ILoggerOptions): DogapiTransportOptions {
    if (options && options.hasOwnProperty('dogapiTransportOptions')) {
      return new DogapiTransportOptions(options.dogapiTransportOptions);
    }
    return new DogapiTransportOptions();
  }

  private static getInstance(options?: ILoggerOptions) {
    return options && options.instance ? options.instance : null;
  }

  private static getEventMapping(options?: ILoggerOptions) {
    return options && options.eventMapping ? options.eventMapping : DEFAULT_MAPPED_EVENTS;
  }

  private static getEnvironment(options?: ILoggerOptions) {
    return options && options.environment ? options.environment : null;
  }

  private static getLogToConsole(options?: ILoggerOptions) {
    return options && options.hasOwnProperty('logToConsole') ? !!options.logToConsole : false;
  }

  private static getExitOnError(options?: ILoggerOptions) {
    return options && options.hasOwnProperty('exitOnError') ? options.exitOnError : false;
  }

  private static getDatadogLoggerEnabled(options?: ILoggerOptions) {
    return options && options.hasOwnProperty('datadogLoggerEnabled') ? options.datadogLoggerEnabled : true;
  }

  public consoleTransportOptions: ConsoleTransportOptions;
  public dogapiTransportOptions: DogapiTransportOptions;
  public exitOnError: boolean;
  public logToConsole: boolean;
  public environment: NullableString;
  public eventMapping: IMappedEvents;
  public instance: NullableString;
  public datadogLoggerEnabled: boolean;

  constructor(options?: ILoggerOptions) {
    this.consoleTransportOptions = LoggerOptions.setConsoleTransportOptions(options);
    this.dogapiTransportOptions = LoggerOptions.setDogapiTransportOptions(options);
    this.exitOnError = LoggerOptions.getExitOnError(options);
    this.logToConsole = LoggerOptions.getLogToConsole(options);
    this.environment = LoggerOptions.getEnvironment(options);
    this.eventMapping = LoggerOptions.getEventMapping(options);
    this.instance = LoggerOptions.getInstance(options);
    this.datadogLoggerEnabled = LoggerOptions.getDatadogLoggerEnabled(options);
  }
}
