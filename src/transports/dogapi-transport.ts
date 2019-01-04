// tslint:disable-next-line
import TransportStream from 'winston-transport';
import { DogapiEventType } from '../../../types/dogapi-event-type.model';
import { DogapiTransportOptions } from './dogapi-transport-options.interface';
import { EVENT_LEVEL_MAP } from '../datadog-event-level-mapping';
import config from '../../../../config/config';

const dogapi = require('dogapi');

export type DogapiLogInfo = {
  message: string,
  level: DogapiEventType,
  timestamp: string,
  title: string,
  internalRequestId: string,
  requestId: string,
};

export class DogapiTransport extends TransportStream {
  eventLevelMapKeys: string[];
  options = {
    api_key: '',
    app_key: '',
    logDatadogEvents: false,
  };

  constructor(opts: DogapiTransportOptions) {
    super(opts);

    this.eventLevelMapKeys = Object.keys(EVENT_LEVEL_MAP);

      // performing the validations
    if (opts && opts.hasOwnProperty('apiKey') && opts.apiKey) {
      this.options.api_key = opts.apiKey;
    }

    if (opts && opts.hasOwnProperty('appKey') && opts.appKey) {
      this.options.app_key = opts.appKey;
    }

    if (opts && opts.hasOwnProperty('validDatadogEvents') && opts.logDatadogEvents) {
      this.options.logDatadogEvents = opts.logDatadogEvents;
    }

    dogapi.initialize(this.options);
  }

  private validateEventLevel(level: any): string {
    // Checking if there is level from event and validates it. Else it falls back to default.
    if (level && (this.eventLevelMapKeys.indexOf(level) > -1)) {
      return this.eventLevelMapKeys[level];
    }
    return DogapiEventType.Info; // The default level is 'info'
  }

  public log(info: DogapiLogInfo, callback: any): void {
    const { level, message, timestamp, title, internalRequestId = null, requestId = null } = info;

    setImmediate(() => {
      this.emit('logged', level);
    });

    const eventType = this.validateEventLevel(level);

    // Formatting the date in milliseconds
    const formattedDate = new Date(timestamp).valueOf() / 1000;

    // Creating the options
    const properties = {
      date_happened: formattedDate,
      alert_type: eventType,
      tags: [
        `environment:${config.environment}`,
        `instance:${config.instance}`,
        `request-id:${requestId}`,
        `internal-request-id:${internalRequestId}`,
      ],
    };

    // Instead of null we can put a callback for some additional action
    dogapi.event.create(title, message, properties, (err: any, res: any) => {
      if (this.options.logDatadogEvents) {
        console.log('Datadog event response: ', res);
      }

      if (this.options.logDatadogEvents && err) {
        console.log('Datadog event error: ', err);
      }

      return callback(null, true);
    });
  }
}
