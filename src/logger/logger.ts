import * as winston from 'winston';
import { WinstonEvent } from '..';
import { LoggerOptions } from '..';
import { WinstonDatadogLoggerFactory } from './winston-datadog-logger-factory';

export class Logger {
  public static initialize(options: LoggerOptions) {
    Logger.instance = new WinstonDatadogLoggerFactory(options).create();
  }

  public static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new WinstonDatadogLoggerFactory().create();
    }
    return Logger.instance;
  }

  public static log(event: WinstonEvent, message: string, meta: any) {
    Logger.getInstance().log(event, message, meta);
  }

  private static instance: winston.Logger;
}
