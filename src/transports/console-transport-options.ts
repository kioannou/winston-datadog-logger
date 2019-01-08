import { WinstonEvent } from "../events/winston-event.enum";
import { IConsoleTransportOptions } from "./console-transport-options.interface";

export class ConsoleTransportOptions implements IConsoleTransportOptions {
  public level?: WinstonEvent;
  public silent?: boolean;
  public handleExceptions?: boolean;
  constructor(options?: IConsoleTransportOptions) {
    this.level = (options && options.level) ? options.level : WinstonEvent.Debug;
    this.silent = (options && options.silent) ? options.silent : true;
    this.handleExceptions = (options && options.handleExceptions) ? options.handleExceptions : true;
  }
}