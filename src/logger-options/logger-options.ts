import { ILoggerOptions } from "./logger-options.interface";
import { IConsoleTransportOptions } from "../transports/console-transport-options.interface";
import { IDogapiTransportOptions } from "../transports/dogapi-transport-options.interface";
import { DEFAULT_CONSOLE_TRANSPORT_OPTIONS } from "../transports/default-console-transport-options.const";
import { NullableString } from "../types/nullable-string.type";
import { DEFAULT_DOGAPI_TRANSPORT_OPTIONS } from "../transports/default-dogapi-transport-options.const";

export class LoggerOptions implements ILoggerOptions {
  constructor(options?: ILoggerOptions) {
    this.consoleTransportOptions = (options && options.consoleTransportOptions) ? options.consoleTransportOptions : DEFAULT_CONSOLE_TRANSPORT_OPTIONS;
    this.datadogApiKey = (options && options.datadogApiKey) ? options.datadogApiKey : null;
    this.datadogAppKey = (options && options.datadogAppKey) ? options.datadogAppKey : null;
    this.dogapiTransportOptions = (options && options.dogapiTransportOptions) ? options.dogapiTransportOptions : DEFAULT_DOGAPI_TRANSPORT_OPTIONS;
    this.exitOnError = (options && options.exitOnError) ? options.exitOnError : false;
    this.logToConsole = (options && options.logToConsole) ? options.logToConsole : false;
  }

  public consoleTransportOptions: IConsoleTransportOptions;
  public datadogApiKey: NullableString;
  public datadogAppKey: NullableString;
  public dogapiTransportOptions: IDogapiTransportOptions;
  public exitOnError: boolean;
  public logToConsole: boolean;
}