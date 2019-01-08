// This is mapping of winston event levels to the datadog's ones
// E.g If we log an event with level 'verbose' with winston,
// it is translated to an 'info' event when it is logged with datadog
import { DogapiEvent } from "./dogapi-event.enum";

export const DEFAULT_MAPPED_EVENTS = {
  debug: DogapiEvent.Info,
  error: DogapiEvent.Error,
  info: DogapiEvent.Info,
  silly: DogapiEvent.Info,
  verbose: DogapiEvent.Info,
  warn: DogapiEvent.Warning,
};
