import { TransportStreamOptions } from 'winston-transport';
import { WinstonEvent } from '../events/winston-event.enum';
import { NullableString } from '../types/nullable-string.type';

export interface IDogapiTransportOptions extends TransportStreamOptions {
  level: WinstonEvent;
  handleExceptions: boolean;
  apiKey: NullableString;
  appKey: NullableString;
  logDatadogEvents: boolean;
}
