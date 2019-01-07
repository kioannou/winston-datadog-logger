import * as winston from "winston";
import { WinstonDatadogLoggerFactory } from "./winston-datadog-logger-factory";
import { ILoggerOptions } from "../logger-options/logger-options.interface";

export class Logger {

  private static instance: winston.Logger;

  public static initialize(options: ILoggerOptions) {
    Logger.instance = new WinstonDatadogLoggerFactory(options).create();
  }

  public static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new WinstonDatadogLoggerFactory().create();
    }
    return Logger.instance;
  }

  public static log(anything: any) {
    Logger.getInstance().log(anything);
  }
}