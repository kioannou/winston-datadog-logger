import { TransportStreamOptions } from 'winston-transport';
import { WinstonEvent } from '..';
import { NullableString } from '../types/nullable-string.type';
import { NullableStringArray } from '../types/nullable-string-array.type';

export interface IDogapiTransportOptions extends TransportStreamOptions {
  level: WinstonEvent;
  handleExceptions: boolean;
  apiKey: NullableString;
  appKey: NullableString;
  logDatadogEvents: boolean;
  tags: NullableStringArray;
  title: NullableString;
}
