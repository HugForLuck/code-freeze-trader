import { TObject } from 'src/shared/types/object.type';

export abstract class BybitRequest {
  endPoint = ''; // replace with `: string`
  params: TObject;
}
