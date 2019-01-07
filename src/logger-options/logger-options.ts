import { ILoggerOptions } from "./logger-options.interface";
import { IConsoleTransportOptions } from "../transports/console-transport-options.interface";
import { IDogapiTransportOptions } from "../transports/dogapi-transport-options.interface";
import { DEFAULT_CONSOLE_TRANSPORT_OPTIONS } from "../transports/default-console-transport-options.const";
import { NullableString } from "../types/nullable-string.type";
import { DEFAULT_DOGAPI_TRANSPORT_OPTIONS } from "../transports/default-dogapi-transport-options.const";
import { MappedEvents } from "../types/mapped-events";
import { DEFAULT_EVENT_LEVEL_MAPPING } from "../events/default-event-level-mapping";

export class LoggerOptions implements ILoggerOptions {
  constructor(options?: ILoggerOptions) {
    this.consoleTransportOptions = (options && options.consoleTransportOptions) ? options.consoleTransportOptions : DEFAULT_CONSOLE_TRANSPORT_OPTIONS;
    this.datadogApiKey = (options && options.datadogApiKey) ? options.datadogApiKey : null;
    this.datadogAppKey = (options && options.datadogAppKey) ? options.datadogAppKey : null;
    this.dogapiTransportOptions = (options && options.dogapiTransportOptions) ? options.dogapiTransportOptions : DEFAULT_DOGAPI_TRANSPORT_OPTIONS;
    this.exitOnError = (options && options.exitOnError) ? options.exitOnError : false;
    this.logToConsole = (options && options.logToConsole) ? options.logToConsole : false;
    this.environment = (options && options.environment) ? options.environment : null;
    this.eventMapping = (options && options.eventMapping) ? options.eventMapping : DEFAULT_EVENT_LEVEL_MAPPING;
    this.instance = (options && options.instance) ? options.instance : null;
    this.logDatadogEvents = (options && options.logDatadogEvents) ? options.logDatadogEvents : false;
  }

  public consoleTransportOptions: IConsoleTransportOptions;
  public datadogApiKey: NullableString;
  public datadogAppKey: NullableString;
  public dogapiTransportOptions: IDogapiTransportOptions;
  public exitOnError: boolean;
  public logToConsole: boolean;
  public environment: NullableString;
  public eventMapping: MappedEvents;
  public instance: NullableString;
  public logDatadogEvents: boolean;
}