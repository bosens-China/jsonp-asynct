import { symbolPolyfill, splicingParams, analysisParams } from "./utils";
declare global {
  interface Window {
    [props: string]: any;
  }
  interface Object {
    [props: string]: any;
  }
}
interface Ioptions {
  params?: Object;
  timeout?: number;
  name?: string;
  prefix?: string;
}
type callback = (type: Error, data: any) => void;
const getName = function getName(prefix: string) {
  let name = symbolPolyfill(prefix);
  while (window[name]) {
    name = symbolPolyfill(prefix);
  }
  return name;
};
const jsonp = function jsonp(
  this: any,
  url: string,
  option?: Ioptions,
  fn?: callback
) {
  let { params: par, url: urls } = analysisParams(url);
  url = urls;
  // 交换一下参数
  if (!option) {
    option = {};
  }
  if (typeof option === "function") {
    fn = option;
    option = {};
  }
  const { name = "callback", timeout = 10000, params = {}, prefix } = option;
  const id = getName(prefix);
  // 如果成功给回调函数传递值
  window[id] = (data: any) => {
    clear();
    if (typeof fn !== "function") {
      return;
    }
    fn.call(this, null, data);
  };
  params[name] = id;
  par = Object.assign(par, params);
  let timer: NodeJS.Timeout;
  if (typeof timeout === "number") {
    timer = setTimeout(() => {
      clear();
      if (typeof fn !== "function") {
        return;
      }
      fn.call(this, new Error(`Task timeout`));
    }, timeout);
  }
  const script = document.createElement("script");
  const href = encodeURI(`${url}${splicingParams(par)}`);

  script.setAttribute("scr", href);
  script.addEventListener("error", () => {
    clear();
    if (typeof fn !== "function") {
      return;
    }
    fn.call(
      this,
      new Error(`Failed to create jsonp, request target address is:${url}`)
    );
  });
  document.body.appendChild(script);
  // 取消函数
  function clear() {
    if (script.parentElement) {
      script.parentElement.removeChild(script);
    }
    if (timer) {
      clearTimeout(timer);
    }
    // 防止多次执行
    window[id] = () => {};
  }
  return clear;
};
export { Ioptions, callback };
export default jsonp;
