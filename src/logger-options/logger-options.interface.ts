import { IMappedEvents } from '../events/mapped-events.interface';
import { ConsoleTransportOptions } from '../transports/console-transport-options';
import { DogapiTransportOptions } from '../transports/dogapi-transport-options';
import { NullableString } from '../types/nullable-string.type';

export interface ILoggerOptions {
  // Winston logger options
  exitOnError: boolean;
  environment?: NullableString;
  instance?: NullableString;
  eventMapping?: IMappedEvents;

  // Console transport options
  logToConsole?: boolean;
  consoleTransportOptions?: ConsoleTransportOptions;

  // Dogapi transport options
  dogapiTransportOptions?: DogapiTransportOptions;
}
