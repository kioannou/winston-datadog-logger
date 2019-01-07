// This is mapping of winston event levels to the datadog's ones
// E.g If we log an event with level 'verbose' with winston,
// it is translated to an 'info' event when it is logged with datadog
export const EVENT_LEVEL_MAP = {
  error: "error",
  warn: "warning",
  info: "info",
  verbose: "info",
  debug: "info",
  silly: "info"
};
