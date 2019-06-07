import * as winston from 'winston';
import { WinstonEvent } from '..';
import { LoggerOptions } from '../logger-options/logger-options';
import { DogapiTransport } from '../transports/dogapi-transport';

export class Logger {
  public static initialize(opts?: any): void {
    const options = new LoggerOptions(opts);

    const transports = [];

    transports.push(
      new winston.transports.Console({
        handleExceptions: options.consoleTransportOptions.handleExceptions,
        level: options.consoleTransportOptions.level,
      }),
    );

    if (options.datadogLoggerEnabled) {
      transports.push(new DogapiTransport(options));
    }

    Logger.instance = winston.createLogger({
      exitOnError: options.exitOnError,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
      ), // Uses the custom format defined above
      transports,
    });
  }

  public static getInstance() {
    if (!Logger.instance) {
      Logger.initialize();
    }
    return Logger.instance;
  }

  public static log(event: WinstonEvent, message: string, meta?: any) {
    try {
      Logger.getInstance().log(event, message, meta);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  }

  private static instance: winston.Logger;
}
