import { DogapiEvent } from "../events/dogapi-event.enum";

export type MappedEvents = { [winstonEvent: string]: DogapiEvent }