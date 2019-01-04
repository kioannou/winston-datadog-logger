// This enum is for exposing the winston events as enum values.
// E.g instead of the following:
// logger.log('info', 'App is running at http://localhost..'
// We are using this:
// logger.log(EventLevel.Info, 'App is running at http://localhost..'
export const enum EventLevel {
    Error = 'error',
    Warn = 'warning',
    Info = 'info',
    Verbose = 'verbose',
    Debug = 'debug',
    Silly = 'silly',
}
