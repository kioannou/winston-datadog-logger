// tslint:disable-next-line
import TransportStream from "winston-transport";
import { IDogapiTransportOptions } from "./dogapi-transport-options.interface";
import { DEFAULT_EVENT_LEVEL_MAPPING } from "../events/default-event-level-mapping";
import { DogapiEvent } from "../events/dogapi-event.enum";
import { LoggerOptions } from "../logger-options/logger-options";
import { config } from "winston";

// tslint:disable-next-line
const dogapi = require("dogapi");

export interface IDogapiLogInfo {
  message: string,
  level: DogapiEvent,
  timestamp: string,
  title: string,
  internalRequestId: string,
  requestId: string,
}

export class DogapiTransport extends TransportStream {
  eventLevelMapping: string[];

  constructor(dogapiTransportOptions: IDogapiTransportOptions, loggerOptions: LoggerOptions) {
    super(dogapiTransportOptions);

    this.eventLevelMapping = DogapiTransport.resolveEventLevelMapping(loggerOptions);

    // performing the validations
    if (dogapiTransportOptions
      && dogapiTransportOptions.hasOwnProperty("apiKey")
      && dogapiTransportOptions.apiKey) {
      this.options.api_key = dogapiTransportOptions.apiKey;
    }

    if (dogapiTransportOptions
      && dogapiTransportOptions.hasOwnProperty("appKey")
      && dogapiTransportOptions.appKey) {
      this.options.app_key = dogapiTransportOptions.appKey;
    }

    if (dogapiTransportOptions
      && dogapiTransportOptions.hasOwnProperty("validDatadogEvents")
      && dogapiTransportOptions.logDatadogEvents) {
      this.options.logDatadogEvents = dogapiTransportOptions.logDatadogEvents;
    }

    dogapi.initialize(this.options);
  }

  private validateEventLevel(level: any): string {
    // Checking if there is level from event and validates it. Else it falls back to default.
    if (level && (this.eventLevelMapping.indexOf(level) > -1)) {
      return this.eventLevelMapping[level];
    }
    return DogapiEvent.Info; // The default level is 'info'
  }

  public log(info: IDogapiLogInfo, callback: any): void {
    const { level, message, timestamp, title, internalRequestId = null, requestId = null } = info;

    setImmediate(() => {
      this.emit("logged", level);
    });

    const eventType = this.validateEventLevel(level);

    // Formatting the date in milliseconds
    const formattedDate = new Date(timestamp).valueOf() / 1000;

    const environment = this.options;

    // Creating the options
    const properties = {
      date_happened: formattedDate,
      alert_type: eventType,
      tags: [
        `environment:${this.options.environment}`,
        `instance:${config.instance}`,
        `request-id:${requestId}`,
        `internal-request-id:${internalRequestId}`
      ]
    };

    // Instead of null we can put a callback for some additional action
    dogapi.event.create(title, message, properties, (err: any, res: any) => {
      if (this.options.logDatadogEvents) {
        console.log("Datadog event response: ", res);
      }

      if (this.options.logDatadogEvents && err) {
        console.log("Datadog event error: ", err);
      }

      return callback(null, true);
    });
  }

  private static resolveEventLevelMapping(loggerOptions: LoggerOptions) {
    Object.keys(DEFAULT_EVENT_LEVEL_MAPPING);
    return [];
  }
}
