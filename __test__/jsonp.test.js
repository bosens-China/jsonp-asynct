import Koa from 'koa';
import jsonp from '../src/main';
import http from 'http';

const app = new Koa();
let serve;
// 作用是劫持HTMLScriptElement
const init = () => {
  const cr = document.createElement;
  const getProxy = (obj) => {
    return new Proxy(obj, {
      get(...rest) {
        return Reflect.get(...rest);
      },
      set(target, key, value, ...rest) {
        if (key === 'src') {
          // 直接进行请求
          http.get(value);
        }
        return Reflect.set(target, key, value, ...rest);
      },
    });
  };
  document.createElement = (...rest) => {
    const obj = cr.call(document, ...rest);
    return getProxy(obj);
  };
};

/* 启动koa服务器，当做测试脚本使用 */
beforeAll(() => {
  init();
  app.use(async (ctx) => {
    ctx.type = 'json';
    ctx.body = {
      url: ctx.href,
      body: ctx.query,
    };
    const key = ctx.query.callback;
    window[key](ctx.body);
  });

  serve = http.createServer(app.callback());
  serve.listen(3000);
});
afterAll(() => {
  serve.close();
});

describe('jsonp', () => {
  test('jsonp测试url测试', async () => {
    const url = `http://localhost:3000/?age=17`;
    const data = await jsonp(url, { name: 'zhangsan' });
    expect(data.url.includes('http://localhost:3000/?age=17&name=zhangsan')).toBeTruthy();
    expect(data.body).toMatchObject({
      age: '17',
      name: 'zhangsan',
    });
  });
  test('jsonp测试url测试2', async () => {
    const url = `http://localhost:3000/?name=zhangsan`;
    const data = await jsonp(url);
    expect(data.url.includes('http://localhost:3000/?name=zhangsan')).toBeTruthy();
  });
  test('回调测试', (done) => {
    const url = `http://localhost:3000/?name=zhangsan`;
    jsonp(url, (err, data) => {
      expect(data.url.includes('http://localhost:3000/?name=zhangsan')).toBeTruthy();
      done();
    });
  });
});
