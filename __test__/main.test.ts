import { JSDOM } from "jsdom";
export interface Global {
  document: Document;
  window: Window;
}

declare var global: Global;
const dom = new JSDOM();

global.document = dom.window.document;
global.window = dom.window;
import {
  splicingParams,
  symbolPolyfill,
  analysisParams
} from "../src/core/utils";
test("参数", () => {
  expect(splicingParams({})).toBe("");
  expect(splicingParams({ name: "zhangsan" })).toBe("?name=zhangsan");
  expect(splicingParams({ name: "zhangsan", age: 18 })).toBe(
    "?name=zhangsan&age=18"
  );
});
test("解析对象", () => {
  {
    const { url, params } = analysisParams("");
    expect(url).toBe("");
    expect(params).toEqual({});
  }
  {
    const { url, params } = analysisParams(
      "http://upload.xafc.com/file_list_api.php"
    );
    expect(url).toBe("http://upload.xafc.com/file_list_api.php");
    expect(params).toEqual({});
  }
  {
    const { url, params } = analysisParams(
      "http://upload.xafc.com/file_list_api.php?"
    );
    expect(url).toBe("http://upload.xafc.com/file_list_api.php");
    expect(params).toEqual({});
  }
  {
    const { url, params } = analysisParams(
      "http://upload.xafc.com/file_list_api.php?name=456"
    );
    expect(url).toBe("http://upload.xafc.com/file_list_api.php");
    expect(params).toEqual({ name: "456" });
  }
});

test("唯一性", () => {
  for (let i = 0; i < 100; i++) {
    expect(symbolPolyfill() in window).toBeFalsy();
  }
});
