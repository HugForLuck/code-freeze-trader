import { TObject } from 'src/shared/types/object.type';

export function getQuery(params: TObject) {
  const queryParams = new URLSearchParams(params);
  queryParams.sort();
  return queryParams.toString();
}
