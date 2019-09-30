# jsonp-Promise

中文 | [English](/README-English.md)

> 简单易用的 jsonp 请求插件，支持回调 promise 形式引用

![size](https://img.shields.io/badge/size-1.33kb-brightgreen) ![License](https://img.shields.io/badge/License-MIT-brightgreen) ![version](https://img.shields.io/badge/version-v1.0.0-brightgreen)

## 安装

```sh
npm i jsonp-asynct
# or
yarn add jsonp-asynct
```

[umd min.js](/dist/main.min.js)

## 用法

作为 umd 使用 会暴露 **jsonp** 变量，里面有 callback 和 get 分别对应回调请求和 promise 请求。

### UMD

- promise

```js
const get = jsonp.get;
const par = get("http://...");
par.promise
  .then(e => {
    // e
  })
  .catch(e => {
    // e
  });
```

- 回调

```js
const get = jsonp.callback;
get("http://...", function(err, data) {
  if (err) {
    return;
  }
  // data
});
```

### Module

- promise

```js
import jsonp from "jsonp-asynct";
const par = jsonp("http://...");
par.promise
  .then(e => {
    // e
  })
  .catch(e => {
    // e
  });
```

- 回调

```js
import { callback } from "jsonp-asynct";
callback("http://...", function(err, data) {
  if (err) {
    return;
  }
  // data
});
```

## API

```js
var parameter = jsonp(url, options, callback);
```

- `url (String)`：访问的目标，可以是包含 params 参数的地址
- `options?:Object`
  - `params (Object)` 添加请求的参数
  - `timeout (Number)` 请求超时时间，默认为 `10000`，如果不为数值则表示无超时时间
  - `name (String)` 用于指定回调的查询字符串参数的名称，默认为 `callback`
  - `prefix (String)` 全局响应 jsonp 的回调名称前缀，默认为`__special`
- `callback?:Function`：作为回调时存在， callback 函数接收两个参数

  - 第一个参数 error 为空则表示请求成功，否则为报错信息
  - 第二个参数 data 为成功时的数据

- parameter

  - parameter: `() => void`，作为回调函数时, parameter 为一个函数，执行可以取消函数的执行
  - parameter: `{promise: Promise, cancel: () => void}`，作为 promise 时返回两个参数
    - cancel 表示提前取消；
    - promise 表示未来请求的数据；

## 实现思路

[用 TypeScript 造一个 jsonp 的轮子](https://github.com/bosens-China/blog/issues/29)

## 协议

[MIT](/LICENSE)
