import { EventLevel } from "../events/event-level.enum";

export const DEFAULT_DOGAPI_TRANSPORT_OPTIONS = {
  level: EventLevel.Debug,
  handleExceptions: true,
  apiKey: null,
  appKey: null,
  logDatadogEvents: false
};