import * as winston from 'winston';
import { LoggerOptionsRepository } from '../logger-options/logger-options-repository';
import { DogapiTransport } from '../transports/dogapi-transport';

// Configuring the format of winston
const configuredWinstonFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(info =>
    `${info.timestamp} ${info.level}: ${info.message}`));

const loggerOptions = LoggerOptionsRepository.getInstance();

// Configuring winston logger
const wdlogger = winston.createLogger({
  exitOnError: false,
  format: configuredWinstonFormat, // Uses the custom format defined above
  transports: [
    new winston.transports.Console({
      handleExceptions: loggerOptions.consoleTransportOptions.handleExceptions,
      level: loggerOptions.consoleTransportOptions.level,
    }),
    new DogapiTransport(loggerOptions),
  ],
});

export default wdlogger