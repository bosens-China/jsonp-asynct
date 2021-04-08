# jsonp-Promise

![size](https://img.shields.io/badge/size-1.04kb-brightgreen) ![License](https://img.shields.io/badge/License-MIT-brightgreen) ![version](https://img.shields.io/badge/version-v1.0.3-brightgreen)

支持批量响应的 async jsonp 库，出现这个项目的原因是项目中使用 [jsonp](https://github.com/webmodules/jsonp) 库的时候多个请求同时请求会导致有问题，所以看了下源码改用 typeScript 实现了一版，顺便补充了模板声明文件

## 安装

```sh
npm i jsonp-asynct
# or
yarn add jsonp-asynct
```

## 用法

jsonp 函数支持异步和回调两种形式，当然同时存在也是可以的

### 回调

```js
import jsonp from 'jsonp-asynct';

jsonp(`http://localhost:3000/?age=17`, (err, data) => {
  if (err) {
    // ...
  } else {
    console.log(data);
  }
});
```

### async

```js
import jsonp from 'jsonp-asynct';

jsonp(`http://localhost:3000/`, { age: 17 }).then((res) => {
  console.log(res);
});
```

## api

jsonp(url,parameter?,option?, callback?):Promise

> 如果当前环境不包含 `Promise-polyfill` 则会返回 `undefined`

### url

- type: `string`
- required: `true`

请求 jsonp 的地址，例如`http://localhost:3000/?name=zhangsan`等

### parameter

- type:`object`
- default: `{}`

附加给 `url` 的查询参数，例如上面的地址，如果 `parameter`为`{age: 17}` ，最终发送的 url 则为`http://localhost:3000/?name=zhangsan&age=17`

### option

#### param

- type: `string`
- default: `callback`

指定回调查询的字符串名称

#### timeout

- type: `number | false`
- default: `60000`

最大等待时间，设置为 0 和 false 则表示无时间限制，如果超出等待时间会抛出错误

#### prefix

- type: `string`
- default: `__jp`

用于设置全局函数的前缀，防止命名冲突

#### name

- type: `string`
- default: `${prefix}${count}`

指定服务器执行响应回调的名称

> 这个 `name` 尽量不要自行指定因为程序会执行一些副作用代码，比如响应 `Promise` 等

### callback

- type: `(err:Error|null, data: T) => void`

node 回调风格，第一个参数表示是否发生错误，如果没有发生错误返回 null，第二个参数表示从服务器返回的数据，这里你可能注意到了类型是`T`，这个是一个泛型，如果你使用`TypeScript`可以方便你对数据的处理

## 实现细节

可以参考我的博客 [用 TypeScript 造一个 jsonp 的轮子](https://github.com/bosens-China/blog/issues/29)

## 协议

[MIT](/LICENSE)
