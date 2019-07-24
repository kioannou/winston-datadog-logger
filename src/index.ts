import { DogapiTransport } from './transports/dogapi-transport';
import { DogapiTransportOptions } from './transports/dogapi-transport-options';

export { Logger } from './logger/logger';
export { WinstonEvent } from './events/winston-event.enum';

export const Transport = (options: DogapiTransportOptions) => new DogapiTransport({ dogapiTransportOptions: options });
