import * as winston from 'winston';
import { WinstonEvent } from '..';
import { LoggerOptions } from '..';
import { IDogapiLogMeta } from '../transports/dogapi-log-meta.interface';
import { WinstonDatadogLoggerFactory } from './winston-datadog-logger-factory';

export class Logger {
  public static initialize(options?: LoggerOptions) {
    const loggerOptions = new LoggerOptions(options);
    Logger.instance = new WinstonDatadogLoggerFactory(loggerOptions).create();
  }

  public static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new WinstonDatadogLoggerFactory().create();
    }
    return Logger.instance;
  }

  public static log(event: WinstonEvent, message: string, meta?: IDogapiLogMeta) {
    try {
      Logger.getInstance().log(event, message, meta);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  }

  private static instance: winston.Logger;
}
