import { TObject } from 'src/shared/types/object.type';

export abstract class HttpRequest {
  endPoint: string;
  params: TObject;
  [key: string]: any;
}
