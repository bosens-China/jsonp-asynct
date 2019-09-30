# jsonp-Promise

English | [中文](/README.md)

> Easy-to-use jsonp request plugin, support callback promise form reference

![size](https://img.shields.io/badge/size-1.33kb-brightgreen) ![License](https://img.shields.io/badge/License-MIT-brightgreen) ![version ](https://img.shields.io/badge/version-v1.0.0-brightgreen)

## Installation

```sh
npm i jsonp-asynct
# or
yarn add jsonp-asynct
```

[umd min.js](/dist/main.min.js)

## usage

Using umd exposes the **jsonp** variable, which has callback and get for the callback request and the promise request, respectively.

### UMD

- promise

```js
const get = jsonp.get;
const par = get("http://...");
par.promise
  .then(e => {
    //e
  })
  .catch(e => {
    //e
  });
```

- Callback

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
    //e
  })
  .catch(e => {
    //e
  });
```

- Callback

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

- `url (String)`: the target of the access, which can be the address containing the params parameter
- `options?:Object`

  - `params (Object)` Add the requested parameters
  - `timeout (Number)` request timeout, default is `10000`, if not, it means no timeout
  - `name (String)` is used to specify the name of the query string parameter of the callback. The default is `callback`
  - `prefix (String)` global response jsonp callback name prefix, defaults to `__special`

- `callback?:Function`: exists as a callback, the callback function takes two arguments

  - The first parameter error is empty, indicating that the request is successful, otherwise it is an error message.
  - The second parameter data is the data at success

- parameter
  - parameter: `() => void`, as a callback function, parameter is a function, execution can cancel the execution of the function
  - parameter: `{promise: Promise, cancel: () => void}`, returning two parameters as a promise
    - cancel means cancel in advance;
    - promise indicates data requested in the future;

## Compatibility

- UMD: ie6+
- Module: ie9+

## Agreement

[MIT](/LICENSE)
