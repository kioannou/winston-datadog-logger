import { IMappedEvents } from '../events/mapped-events.interface';
import { ConsoleTransportOptions } from '../transports/console-transport-options';
import { DogapiTransportOptions } from '../transports/dogapi-transport-options';
import { NullableString } from '../types/nullable-string.type';

export interface ILoggerOptions {
  exitOnError: boolean;
  environment?: NullableString;
  instance?: NullableString;
  eventMapping?: IMappedEvents;
  logToConsole?: boolean;
  consoleTransportOptions?: ConsoleTransportOptions;
  dogapiTransportOptions?: DogapiTransportOptions;
  datadogLoggerEnabled: boolean;
}
