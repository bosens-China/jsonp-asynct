import { IOption, ICallback } from '../typings/type';
import { isPromise, includes } from './utils';

interface Ifn<T> extends ICallback<T> {
  resolve?: (data: T) => void;
  reject?: (err: Error) => void;
}

const isCallback = <T>(obj: any): obj is ICallback<T> => {
  return typeof obj === 'function';
};

// 全局计数器
let count = 0;

const jsonp = function <T = any>(
  url: string,
  parameter?: Record<string, any> | ICallback<T>,
  option?: IOption | ICallback<T>,
  callback?: ICallback<T>,
): any {
  // 确定参数位置，需要考虑重载parameter属性进行必要填充
  let parameterRequire: Record<string, any> = {};
  let optionRequire = {} as Required<IOption>;
  let callbackRequire: ICallback<T> = isCallback(callback) ? callback : () => {};

  if (isCallback(parameter)) {
    callbackRequire = parameter;
  } else {
    parameterRequire = parameter || {};
  }
  if (isCallback(option)) {
    callbackRequire = option;
  } else {
    optionRequire = ((option || {}) as unknown) as Required<IOption>;
  }
  // 初始化option属性
  optionRequire.param = optionRequire.param || 'callback';
  optionRequire.timeout = optionRequire.timeout || 60000;
  optionRequire.prefix = optionRequire.prefix || '__jp';
  optionRequire.name = optionRequire.name || `${optionRequire.prefix}${count++}`;
  // param对于jsonp是必须的
  parameterRequire[optionRequire.param] = optionRequire.name;

  // 拼接url
  const parameterStr = Object.keys(parameterRequire).reduce((x, y) => {
    const value = parameterRequire[y];
    const str = `${x}&${y}=${encodeURIComponent(value)}`;
    return str;
  }, '');

  let completeUrl = (!includes(url, '?') ? `${url}?` : `${url}&`) + parameterStr;
  // 处理下边界情况，parameter肯定是存在一个的，所以不需要处理 /?$/ 的情况
  completeUrl = completeUrl.replace(/(\?&)/, '?').replace(/&&/, '&');
  window[optionRequire.name] = (data: T): void => {
    fn(null, data);
  };

  let times: NodeJS.Timeout | null = null;
  const src = document.createElement('script');

  const cancel = () => {
    if (times) {
      clearTimeout(times);
    }
    window[optionRequire.name] = null;
    document.body.removeChild(src);
  };

  // fn 函数这样定义是为了执行可能存在的promise
  const fn = (((err: null | Error, data: T) => {
    callbackRequire(err, data);
    if (err && fn.reject) {
      fn.reject(err);
    }
    if (!err && fn.resolve) {
      fn.resolve(data);
    }
    cancel();
  }) as unknown) as Ifn<T>;

  // 设置超时
  if (typeof optionRequire.timeout === 'number' && optionRequire.timeout > 0) {
    times = setTimeout(() => {
      fn(new Error(`request timeout`));
    }, optionRequire.timeout);
  }

  // 发送请求
  src.src = completeUrl;
  src.onerror = () => {
    fn(new Error(`Failed to create script tag. The current SRC is:${completeUrl}`));
  };
  document.body.appendChild(src);

  if (isPromise()) {
    return new Promise((resolve, reject) => {
      // 修改参数，等待异步调用
      fn.resolve = resolve;
      fn.reject = reject;
    });
  }
  return undefined;
};

export default jsonp;
