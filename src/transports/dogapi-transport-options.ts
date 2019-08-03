import { WinstonEvent } from '..';
import { NullableStringArray } from '../types/nullable-string-array.type';
import { NullableString } from '../types/nullable-string.type';
import { IDogapiTransportOptions } from './dogapi-transport-options.interface';

export class DogapiTransportOptions implements IDogapiTransportOptions {
  private static getTags(options?: IDogapiTransportOptions) {
    return options && options.hasOwnProperty('tags') ? options.tags : null;
  }
  private static getTitle(options?: IDogapiTransportOptions) {
    return options && options.hasOwnProperty('title') ? options.title : null;
  }
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
  public tags: NullableStringArray;
  public title: NullableString;

  constructor(options?: IDogapiTransportOptions) {
    this.apiKey = DogapiTransportOptions.getApiKey(options);
    this.appKey = DogapiTransportOptions.getAppKey(options);
    this.handleExceptions = DogapiTransportOptions.getHandleExceptions(options);
    this.level = DogapiTransportOptions.getLevel(options);
    this.logDatadogEvents = DogapiTransportOptions.getLogDatadogEvents(options);
    this.tags = DogapiTransportOptions.getTags(options);
    this.title = DogapiTransportOptions.getTitle(options);
  }
}
