import { WinstonEvent } from '..';
import { IConsoleTransportOptions } from './console-transport-options.interface';

export class ConsoleTransportOptions implements IConsoleTransportOptions {
  private static getHandleExceptions(options?: IConsoleTransportOptions) {
    return options && options.hasOwnProperty('handleExceptions') ? options.handleExceptions : true;
  }

  private static getSilent(options?: IConsoleTransportOptions) {
    return options && options.hasOwnProperty('silent') ? options.silent : true;
  }

  private static getLevel(options?: IConsoleTransportOptions) {
    return options && options.hasOwnProperty('level') ? options.level : WinstonEvent.Debug;
  }
  public level?: WinstonEvent;
  public silent?: boolean;
  public handleExceptions?: boolean;
  constructor(options?: IConsoleTransportOptions) {
    this.level = ConsoleTransportOptions.getLevel(options);
    this.silent = ConsoleTransportOptions.getSilent(options);
    this.handleExceptions = ConsoleTransportOptions.getHandleExceptions(options);
  }
}
