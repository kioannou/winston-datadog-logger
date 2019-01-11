import { DogapiEvent } from '../events/dogapi-event.enum';
import { NullableString } from '../types/nullable-string.type';

export interface IDogapiLogMeta {
  message?: string;
  level?: DogapiEvent;
  timestamp?: string;
  title?: string;
  internalRequestId?: NullableString;
  requestId?: NullableString;
}
