import { DogapiEvent } from '../events/dogapi-event.enum';
import { NullableString } from '../types/nullable-string.type';
import { IDogapiLogMeta } from './dogapi-log-meta.interface';

export class DogapiLogMeta implements IDogapiLogMeta {
  public message: string;
  public level: DogapiEvent;
  public timestamp: string;
  public title: string;
  public internalRequestId: NullableString;
  public requestId: NullableString;
  constructor(obj: IDogapiLogMeta) {
    this.message = obj && obj.message ? obj.message : 'Default Datadog message';
    this.level = obj && obj.level ? obj.level : DogapiEvent.Info;
    this.timestamp = obj && obj.timestamp ? obj.timestamp : Date.now().toString();
    this.title = obj && obj.title ? obj.title : 'Datadog Event (Default title)';
    this.internalRequestId = obj && obj.internalRequestId ? obj.internalRequestId : null;
    this.requestId = obj && obj.requestId ? obj.requestId : null;
  }
}
