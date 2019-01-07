/**
 * The options for the Winston Console Transport.
 * Official documentation: https://github.com/winstonjs/winston/blob/master/docs/transports.md#console-transport
 **/
import { EventLevel } from "../models/event-level.enum";

export interface IConsoleTransportOptions {
  level?: string,
  silent?: boolean,
  string?: string,
  stderrLevels?: EventLevel[],
  consoleWarnLevels?: EventLevel[]
}

