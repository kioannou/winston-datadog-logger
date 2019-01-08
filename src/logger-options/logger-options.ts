import { DEFAULT_MAPPED_EVENTS } from "../events/default-mapped-events";
import { IMappedEvents } from "../events/mapped-events.interface";
import { ConsoleTransportOptions } from "../transports/console-transport-options";
import { DogapiTransportOptions } from "../transports/dogapi-transport-options";
import { NullableString } from "../types/nullable-string.type";
import { ILoggerOptions } from "./logger-options.interface";

export class LoggerOptions implements ILoggerOptions {

  private static setConsoleTransportOptions(options?: ILoggerOptions): ConsoleTransportOptions {
    if(options && options.hasOwnProperty('consoleTransportOptions')) {
      return new ConsoleTransportOptions(options.consoleTransportOptions);
    }
    return new ConsoleTransportOptions();
  }

  private static setDogapiTransportOptions(options?: ILoggerOptions): DogapiTransportOptions {
    if(options && options.hasOwnProperty('dogapiTransportOptions')) {
      return new DogapiTransportOptions(options.dogapiTransportOptions);
    }
    return new DogapiTransportOptions();
  }

  public consoleTransportOptions: ConsoleTransportOptions;
  public datadogApiKey: NullableString;
  public datadogAppKey: NullableString;
  public dogapiTransportOptions: DogapiTransportOptions;
  public exitOnError: boolean;
  public logToConsole: boolean;
  public environment: NullableString;
  public eventMapping: IMappedEvents;
  public instance: NullableString;
  public logDatadogEvents: boolean;
  constructor(options?: ILoggerOptions) {
    this.consoleTransportOptions = LoggerOptions.setConsoleTransportOptions(options);
    this.datadogApiKey = (options && options.datadogApiKey) ? options.datadogApiKey : null;
    this.datadogAppKey = (options && options.datadogAppKey) ? options.datadogAppKey : null;
    this.dogapiTransportOptions = LoggerOptions.setDogapiTransportOptions(options);
    this.exitOnError = (options && options.exitOnError) ? options.exitOnError : false;
    this.logToConsole = (options && options.logToConsole) ? options.logToConsole : false;
    this.environment = (options && options.environment) ? options.environment : null;
    this.eventMapping = (options && options.eventMapping) ? options.eventMapping : DEFAULT_MAPPED_EVENTS;
    this.instance = (options && options.instance) ? options.instance : null;
    this.logDatadogEvents = (options && options.logDatadogEvents) ? options.logDatadogEvents : false;
  }
}