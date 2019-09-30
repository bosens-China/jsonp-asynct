/**
 *以回调函数的形式执行jsonp，url必填
 *
 * @param {string} url
 * 访问地址，可以是一个完整的包含params参数的地址
 * @param {Object} option
 * params：附带请求的参数
 *
 * timeout： 超时时间，默认为60s
 *
 * name：默认为callback
 *
 * prefix：执行回调函数的前缀，防止冲突作用
 */
declare function jsonp(
  url: string,
  option?: {
    params?: Object;
    timeout?: number;
    name?: string;
    prefix?: string;
  },
  callback?: (type: Error, data: any) => void
): () => void;
/**
 *
 * @param {string} url
 * 访问地址，可以是一个完整的包含params参数的地址
 * @param {Object} option
 * params：附带请求的参数
 *
 * timeout： 超时时间，默认为60s
 *
 * name：默认为callback
 *
 * prefix：执行回调函数的前缀，防止冲突作用
 */
declare function get(
  url: string,
  option?: {
    params?: Object;
    timeout?: number;
    name?: string;
    prefix?: string;
  }
): {
  promise: Promise<any>;
  cancel: () => void;
};

export default get;
export { jsonp as callback, jsonp as get };
