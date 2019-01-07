import { TransportStreamOptions } from "winston-transport";
import { NullableString } from "../types/nullable-string.type";
import { EventLevel } from "../models/event-level.enum";

export interface IDogapiTransportOptions extends TransportStreamOptions {
  level: EventLevel;
  handleExceptions: boolean;
  apiKey: NullableString;
  appKey: NullableString;
  logDatadogEvents: boolean;
}
