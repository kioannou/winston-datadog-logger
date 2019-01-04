import * as winston from 'winston';
import { DogapiTransport } from './transports/dogapi-transport';
import config from '../../../config/config';

// Configuring the format of winston
const configuredWinstonFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info =>
        `${info.timestamp} ${info.level}: ${info.message}`));

// Configuring winston logger
export const logger = winston.createLogger({
  format: configuredWinstonFormat, // Uses the custom format defined above
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
    }),
    new DogapiTransport({
      level: 'debug',
      handleExceptions: true,
      apiKey: config.datadogApiKey,
      appKey: config.datadogAppKey,
      logDatadogEvents: false,
    }),
  ],
  exitOnError: false,
});
