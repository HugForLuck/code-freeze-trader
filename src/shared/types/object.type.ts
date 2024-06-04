/**
 * Used to force keys to be strings
 * e.g. URLSearchParams functions need this workaround
 */
export type TObject = {
  [key: string]: any;
};
