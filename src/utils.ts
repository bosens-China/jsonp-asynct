// 简单判断一下是否支持promise
export const isPromise = (): boolean => {
  if (typeof Promise !== 'function') {
    return false;
  }
  const obj = Promise.resolve();
  return !!obj.then;
};

export const includes = (str: string, query: string) => {
  return str.indexOf(query) !== -1;
};
