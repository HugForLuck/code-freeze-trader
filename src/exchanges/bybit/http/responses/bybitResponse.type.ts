import { TObject } from 'src/shared/types/object.type';

export type BybitResponse<T> = {
  retCode: number;
  retMsg: string;
  result: T;
  retExtInfo: TObject;
  time: number;
};
