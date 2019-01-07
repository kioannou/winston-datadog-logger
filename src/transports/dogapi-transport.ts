// tslint:disable-next-line
import TransportStream from "winston-transport";
import { IDogapiTransportOptions } from "./dogapi-transport-options.interface";
import { EVENT_LEVEL_MAP } from "../models/datadog-event-level-mapping";
import { DogapiEventType } from "../models/dogapi-event-type.enum";
import { LoggerOptions } from "../logger-options/logger-options";

// tslint:disable-next-line
const dogapi = require("dogapi");

export interface IDogapiLogInfo {
  message: string,
  level: DogapiEventType,
  timestamp: string,
  title: string,
  internalRequestId: string,
  requestId: string,
}

export class DogapiTransport extends TransportStream {
  eventLevelMapKeys: string[];
  options = {
    api_key: "",
    app_key: "",
    logDatadogEvents: false
  };

  constructor(dogapiTransportOptions: IDogapiTransportOptions, loggerOptions: LoggerOptions) {
    super(dogapiTransportOptions);

    this.eventLevelMapKeys = Object.keys(EVENT_LEVEL_MAP);

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
    if (level && (this.eventLevelMapKeys.indexOf(level) > -1)) {
      return this.eventLevelMapKeys[level];
    }
    return DogapiEventType.Info; // The default level is 'info'
  }

  public log(info: IDogapiLogInfo, callback: any): void {
    const { level, message, timestamp, title, internalRequestId = null, requestId = null } = info;

    setImmediate(() => {
      this.emit("logged", level);
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
}
