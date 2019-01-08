/*
 The options for the Winston Console Transport.
 Official documentation: https://github.com/winstonjs/winston/blob/master/docs/transports.md#console-transport
 */
import { WinstonEvent } from '..';

export interface IConsoleTransportOptions {
  level?: WinstonEvent;
  silent?: boolean;
  handleExceptions?: boolean;
}
