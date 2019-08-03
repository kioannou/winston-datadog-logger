import { TransportStreamOptions } from 'winston-transport';
import { WinstonEvent } from '..';
import { NullableStringArray } from '../types/nullable-string-array.type';
import { NullableString } from '../types/nullable-string.type';

export interface IDogapiTransportOptions extends TransportStreamOptions {
  level: WinstonEvent;
  handleExceptions: boolean;
  apiKey: NullableString;
  appKey: NullableString;
  logDatadogEvents: boolean;
  tags: NullableStringArray;
  title: NullableString;
}
