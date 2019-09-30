// 生成唯一的值
let uid = 0;
const symbolPolyfill = function(prefix = "__special"): string {
  return `${prefix}${uid++}`;
};
// 将对象拼接成字符串
const splicingParams = function(o: Object): string {
  let text = "";
  o = o || {};
  for (const name in o) {
    if (o.hasOwnProperty(name)) {
      const value = o[name];
      text += `${name}=${value}&`;
    }
  }
  // 给第一个字符添加?同时去掉最后一个&
  if (text.length) {
    text = `?${text.slice(0, -1)}`;
  }
  return text;
};
// 解析url的params
const analysisParams = function(url: string) {
  const index = url.indexOf("?") + 1;
  const o: {
    [propName: string]: any;
  } = {};
  if (!index) {
    return {
      url,
      params: o
    };
  }
  const u = url.slice(index);
  const arr = u.split("&");
  for (let item of arr) {
    const [name, value] = item.split("=");
    o[name] = value;
  }
  return { url: url.slice(0, index - 1), params: o };
};
export { symbolPolyfill, splicingParams, analysisParams };
