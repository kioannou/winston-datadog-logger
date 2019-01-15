import { WinstonEvent } from '..';
import { NullableString } from '../types/nullable-string.type';
import { IDogapiTransportOptions } from './dogapi-transport-options.interface';

export class DogapiTransportOptions implements IDogapiTransportOptions {
  private static getLogDatadogEvents(options?: IDogapiTransportOptions) {
    return options && options.hasOwnProperty('logDatadogEvents') ? options.logDatadogEvents : true;
  }

  private static getLevel(options?: IDogapiTransportOptions) {
    return options && options.hasOwnProperty('level') ? options.level : WinstonEvent.Debug;
  }

  private static getHandleExceptions(options?: IDogapiTransportOptions) {
    return options && options.hasOwnProperty('handleExceptions') ? options.handleExceptions : true;
  }

  private static getAppKey(options?: IDogapiTransportOptions) {
    return options && options.hasOwnProperty('appKey') ? options.appKey : null;
  }

  private static getApiKey(options?: IDogapiTransportOptions) {
    return options && options.hasOwnProperty('apiKey') ? options.apiKey : null;
  }
  public apiKey: NullableString;
  public appKey: NullableString;
  public handleExceptions: boolean;
  public level: WinstonEvent;
  public logDatadogEvents: boolean;

  constructor(options?: IDogapiTransportOptions) {
    this.apiKey = DogapiTransportOptions.getApiKey(options);
    this.appKey = DogapiTransportOptions.getAppKey(options);
    this.handleExceptions = DogapiTransportOptions.getHandleExceptions(options);
    this.level = DogapiTransportOptions.getLevel(options);
    this.logDatadogEvents = DogapiTransportOptions.getLogDatadogEvents(options);
  }
}
