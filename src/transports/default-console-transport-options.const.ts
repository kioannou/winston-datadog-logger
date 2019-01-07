import { EventLevel } from "../models/event-level.enum";

export const DEFAULT_CONSOLE_TRANSPORT_OPTIONS = {
  level: EventLevel.Debug,
  handleExceptions: true
};