export type BitgetResponse<T> = {
  code: string;
  msg: string;
  requestTime: number;
  data: T;
};
