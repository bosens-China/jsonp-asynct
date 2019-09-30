# jsonp-Promise

> 简单易用的 jsonp 请求插件，支持并发请求和回调 promise 形式引用

![size](https://img.shields.io/badge/size-1.33kb-brightgreen) ![License](https://img.shields.io/badge/License-MIT-brightgreen) ![version](https://img.shields.io/badge/version-v1.0.0-brightgreen)

## 安装

```sh
npm i jsonp-asynct
# or
yarn add jsonp-asynct
```

## 用法
### promise
``` js
import jsonp from "jsonp-asynct";
(async() => {
  const data = await jsonp('url').promise;
  // 一些操作
})();
```


### 回调
#### umd引用


## API

```js
var jsp = jsonp(url, options, callback);
```

### 通用部分

- url (String)：访问的目标，可以是包含 params 参数的地址
- options?:Object
  - params (String) 用于指定回调的查询字符串参数的名称，默认为 callback
  - timeout (Number) 请求超时时间，默认为 60000
  - prefix (String) 全局响应 jsonp 的回调名称前缀，默认为\_\_special

### 回调

- callback?:Function
  (err:Error|null,data:any) => void;
  作为回调函数时存在，err 是一个错误对象如果存在则表明出现错误，第二个 data 为成功时的数据

- jsp
  作为回调函数时 jsp 是一个函数，执行可以取消函数的执行

### promise

- callback:undefined
  作为 promise 不存在

- jsp:{promise: Promise,cancel: () => void}
  作为 promise 时返回两个参数，cancel 表示提前取消，promise 承诺

## 实现思路

[用 TypeScript 造一个 jsonp 的轮子 #29](https://github.com/bosens-China/blog/issues/29)

## 协议

[MIT](/LICENSE)
