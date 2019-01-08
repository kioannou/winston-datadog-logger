// This enum is for exposing the Winston events as enum values.
// E.g instead of the following:
// logger.log('info', 'App is running at http://localhost..'
// We are using this:
// logger.log(WinstonEvent.Info, 'App is running at http://localhost..'
export const enum WinstonEvent {
  Error = "error",
  Warn = "warning",
  Info = "info",
  Verbose = "verbose",
  Debug = "debug",
  Silly = "silly",
}
