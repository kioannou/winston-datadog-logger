import { WinstonEvent } from '../events/winston-event.enum';
import { NullableString } from '../types/nullable-string.type';
import { IDogapiTransportOptions } from './dogapi-transport-options.interface';

export class DogapiTransportOptions implements IDogapiTransportOptions {
  public apiKey: NullableString;
  public appKey: NullableString;
  public handleExceptions: boolean;
  public level: WinstonEvent;
  public logDatadogEvents: boolean;
  public silent: boolean;

  constructor(options?: IDogapiTransportOptions) {
    this.apiKey = options && options.apiKey ? options.apiKey : null;
    this.appKey = options && options.appKey ? options.appKey : null;
    this.handleExceptions = options && options.handleExceptions ? options.handleExceptions : true;
    this.level = options && options.level ? options.level : WinstonEvent.Debug;
    this.logDatadogEvents = options && options.logDatadogEvents ? options.logDatadogEvents : true;
    this.silent = options && options.silent ? options.silent : true;
  }
}
