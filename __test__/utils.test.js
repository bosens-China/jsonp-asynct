import { isPromise, includes } from '../src/utils';

test('promise支持检测', () => {
  const pro = Promise;
  Promise = null;
  expect(isPromise()).toBeFalsy();
  Promise = pro;
  expect(isPromise()).toBeTruthy();
});

test('includes测试', () => {
  expect(includes('123', '1')).toBeTruthy();
  expect(includes('123', '4')).toBeFalsy();
});
