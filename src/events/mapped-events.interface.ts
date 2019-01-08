import { DogapiEvent } from './dogapi-event.enum';

export interface IMappedEvents {
  debug: DogapiEvent;
  error: DogapiEvent;
  info: DogapiEvent;
  silly: DogapiEvent;
  verbose: DogapiEvent;
  warn: DogapiEvent;
}
