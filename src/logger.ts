import { DEFAULT_LOGGER_OPTIONS } from './default-logger-options';
import { EventLevel } from './models/event-level.enum';
import { ILoggerOptions } from './logger-options.interface';

export class Logger {
  private loggerOptions: ILoggerOptions = DEFAULT_LOGGER_OPTIONS;

  constructor(options: ILoggerOptions) {
    this.setLoggerOptions(options);
  }

  public log(event: EventLevel | string, message: string, meta: any): void {

  }

  private setLoggerOptions(options: ILoggerOptions) {
    if (options) {
      this.loggerOptions = options;
    }
  }
}