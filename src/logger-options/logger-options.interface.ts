import { IConsoleTransportOptions } from "../transports/console-transport-options.interface";
import { IDogapiTransportOptions } from "../transports/dogapi-transport-options.interface";
import { NullableString } from "../types/nullable-string.type";

export interface ILoggerOptions {
  // Winston logger options
  exitOnError: boolean;

  // Console transport options
  logToConsole?: boolean;
  consoleTransportOptions?: IConsoleTransportOptions;

  // Dogapi transport options
  dogapiTransportOptions?: IDogapiTransportOptions
  datadogApiKey: NullableString;
  datadogAppKey: NullableString;
}