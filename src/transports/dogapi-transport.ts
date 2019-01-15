// tslint:disable-next-line
import TransportStream from 'winston-transport';
import { WinstonEvent } from '..';
import { DogapiEvent } from '../events/dogapi-event.enum';
import { LoggerOptions } from '../logger-options/logger-options';

// tslint:disable-next-line
const dogapi = require('dogapi');

export interface ILogMeta {
  message: string;
  level: WinstonEvent;
  timestamp: string;
  title: string;
  internalRequestId: string;
  requestId: string;
}

export class DogapiTransport extends TransportStream {
  private readonly options: LoggerOptions;

  constructor(options: any) {
    const dogapiTransportOptions = options.dogapiTransportOptions;
    super(dogapiTransportOptions);

    // Updating the options
    this.options = options;

    const dogapiOptions = {
      api_key: dogapiTransportOptions.apiKey,
      app_key: dogapiTransportOptions.appKey,
      logDatadogEvents: dogapiTransportOptions.logDatadogEvents,
    };

    // Initializing dogapi
    dogapi.initialize(dogapiOptions);
  }

  public log(meta: ILogMeta, callback: any): void {
    const { level, message, timestamp, title, internalRequestId = null, requestId = null } = meta;

    setImmediate(() => {
      this.emit('logged', level);
    });

    const eventType = this.validateEventLevel(level);

    // Formatting the date in milliseconds
    const formattedDate = new Date(timestamp).valueOf() / 1000;

    const environment = this.options.environment;
    const instance = this.options.instance;

    // Creating the options
    const properties = {
      alert_type: eventType,
      date_happened: formattedDate,
      tags: [
        `environment:${environment}`,
        `instance:${instance}`,
        `request-id:${requestId}`,
        `internal-request-id:${internalRequestId}`,
      ],
    };

    // Instead of null we can put a callback for some additional action
    dogapi.event.create(title, message, properties, (err: any, res: any) => {
      if (this.options.dogapiTransportOptions.logDatadogEvents) {
        // tslint:disable-next-line:no-console
        console.log('Datadog event response: ', res);
      }

      if (this.options.dogapiTransportOptions.logDatadogEvents && err) {
        // tslint:disable-next-line:no-console
        console.log('Datadog event error: ', err);
      }
      return callback(null, true);
    });
  }

  private validateEventLevel(level: WinstonEvent | string): string {
    const eventMapping = this.options.eventMapping as any;

    const isString = typeof level === 'string';

    if (isString && eventMapping.hasOwnProperty(level)) {
      return eventMapping[level];
    } else if (isString && !eventMapping.hasOwnProperty(level)) {
      return DogapiEvent.Info;
    } else {
      return eventMapping[level];
    }
  }
}
