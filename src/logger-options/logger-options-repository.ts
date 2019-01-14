import { LoggerOptions } from './logger-options';

export class LoggerOptionsRepository {
  public static initialize(options: any) {
    LoggerOptionsRepository.instance = new LoggerOptions(options);
  }

  public static getInstance(): LoggerOptions {
    if (!LoggerOptionsRepository.instance) {
      LoggerOptionsRepository.instance = new LoggerOptions();
    }
    return LoggerOptionsRepository.instance;
  }

  private static instance: LoggerOptions;
}