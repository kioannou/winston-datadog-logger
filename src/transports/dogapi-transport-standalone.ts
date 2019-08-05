import { LoggerOptions } from '../logger-options/logger-options';
import { DogapiTransport } from './dogapi-transport';
import { DogapiTransportOptions } from './dogapi-transport-options';
import { Logger } from '../logger/logger';

export const DogapiTransportStandalone = (
  ddOptions: DogapiTransportOptions,
  options: LoggerOptions = new LoggerOptions(),
) => new DogapiTransport({
  ...options,
  dogapiTransportOptions: ddOptions,
});
