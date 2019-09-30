import index from "./core/index";
import "./core/polyfill";
import { Ioptions } from "./core/index";

// 代理一下
const jsonp = function(url: string, option?: Ioptions) {
  let cancel: Function;
  const promise = new Promise((resolve, reject) => {
    cancel = index(url, option, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
  return {
    cancel,
    promise
  };
};

export default {
  callback: index,
  get: jsonp
};
