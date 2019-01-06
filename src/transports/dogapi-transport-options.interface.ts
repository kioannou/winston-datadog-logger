import { TransportStreamOptions } from 'winston-transport';

export interface IDogapiTransportOptions extends TransportStreamOptions{
  level: string;
  handleExceptions: boolean;
  apiKey: string | undefined;
  appKey: string | undefined;
  logDatadogEvents: boolean;
}
