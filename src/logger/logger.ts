import * as winston from "winston";
import { LoggerOptions } from "../logger-options/logger-options";
import { WinstonDatadogLoggerFactory } from "./winston-datadog-logger-factory";

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

  public static log(anything: any) {
    Logger.getInstance().log(anything);
  }

  private static instance: winston.Logger;
}