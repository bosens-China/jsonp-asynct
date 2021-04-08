export interface IOption {
  param?: string;
  timeout?: number | false;
  prefix?: string;
  name?: string;
}
export type ICallback<T> = (err: null | Error, data?: T) => void;

declare global {
  interface Window {
    [K: string]: any;
  }
}

function jsonp<T = any>(
  url: string,
  parameter?: Record<string, any> | ICallback<T>,
  option?: IOption | ICallback<T>,
  callback?: ICallback<T>,
): Promise<T>;

export default jsonp;
