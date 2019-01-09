// tslint:disable-next-line
import TransportStream from 'winston-transport';
import { WinstonEvent } from '..';
import { LoggerOptions } from '..';
import { DogapiEvent } from '../events/dogapi-event.enum';

// tslint:disable-next-line
const dogapi = require('dogapi');

export interface IDogapiLogInfo {
  message: string;
  level: DogapiEvent;
  timestamp: string;
  title: string;
  internalRequestId: string;
  requestId: string;
}

export class DogapiTransport extends TransportStream {
  private readonly loggerOptions: LoggerOptions;

  constructor(loggerOptions: LoggerOptions) {
    const dogapiTransportOptions = loggerOptions.dogapiTransportOptions;
    super(dogapiTransportOptions);
    this.loggerOptions = loggerOptions;
    dogapi.initialize(dogapiTransportOptions);
  }

  public log(info: IDogapiLogInfo, callback: any): void {
    const { level, message, timestamp, title, internalRequestId = null, requestId = null } = info;

    setImmediate(() => {
      this.emit('logged', level);
    });

    const eventType = this.validateEventLevel(level);

    // Formatting the date in milliseconds
    const formattedDate = new Date(timestamp).valueOf() / 1000;

    const environment = this.loggerOptions.environment;
    const instance = this.loggerOptions.instance;

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
      if (this.loggerOptions.dogapiTransportOptions.logDatadogEvents) {
        // tslint:disable-next-line:no-console
        console.log('Datadog event response: ', res);
      }

      if (this.loggerOptions.dogapiTransportOptions.logDatadogEvents && err) {
        // tslint:disable-next-line:no-console
        console.log('Datadog event error: ', err);
      }
      return callback(null, true);
    });
  }

  private validateEventLevel(level: WinstonEvent | string): string {
    const eventMapping = this.loggerOptions.eventMapping as any;

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
