var uid = 0;
var symbolPolyfill = function (prefix) {
    if (prefix === void 0) { prefix = "__special"; }
    return "" + prefix + uid++;
};
var splicingParams = function (o) {
    var text = "";
    o = o || {};
    for (var name_1 in o) {
        if (o.hasOwnProperty(name_1)) {
            var value = o[name_1];
            text += name_1 + "=" + value + "&";
        }
    }
    if (text.length) {
        text = "?" + text.slice(0, -1);
    }
    return text;
};
var analysisParams = function (url) {
    var index = url.indexOf("?") + 1;
    var o = {};
    if (!index) {
        return {
            url: url,
            params: o
        };
    }
    var u = url.slice(index);
    var arr = u.split("&");
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        var _a = item.split("="), name_2 = _a[0], value = _a[1];
        o[name_2] = value;
    }
    return { url: url.slice(0, index - 1), params: o };
};

var getName = function getName(prefix) {
    var name = symbolPolyfill(prefix);
    while (window[name]) {
        name = symbolPolyfill(prefix);
    }
    return name;
};
var jsonp = function jsonp(url, option, fn) {
    var _this = this;
    var _a = analysisParams(url), par = _a.params, urls = _a.url;
    url = urls;
    if (!option) {
        option = {};
    }
    if (typeof option === "function") {
        fn = option;
        option = {};
    }
    var _b = option.name, name = _b === void 0 ? "callback" : _b, _c = option.timeout, timeout = _c === void 0 ? 10000 : _c, _d = option.params, params = _d === void 0 ? {} : _d, prefix = option.prefix;
    var id = getName(prefix);
    window[id] = function (data) {
        clear();
        if (typeof fn !== "function") {
            return;
        }
        fn.call(_this, null, data);
    };
    params[name] = id;
    par = Object.assign(par, params);
    var timer;
    if (typeof timeout === "number") {
        timer = setTimeout(function () {
            clear();
            if (typeof fn !== "function") {
                return;
            }
            fn.call(_this, new Error("Task timeout"));
        }, timeout);
    }
    var script = document.createElement("script");
    var href = encodeURI("" + url + splicingParams(par));
    script.setAttribute("scr", href);
    script.addEventListener("error", function () {
        clear();
        if (typeof fn !== "function") {
            return;
        }
        fn.call(_this, new Error("Failed to create jsonp, request target address is:" + url));
    });
    document.body.appendChild(script);
    function clear() {
        if (script.parentElement) {
            script.parentElement.removeChild(script);
        }
        if (timer) {
            clearTimeout(timer);
        }
        window[id] = function () { };
    }
    return clear;
};

if (typeof Object.assign != "function") {
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            if (target == null) {
                throw new TypeError("Cannot convert undefined or null to object");
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) {
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

var jsonp$1 = function (url, option) {
    var cancel;
    var promise = new Promise(function (resolve, reject) {
        cancel = jsonp(url, option, function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
    return {
        cancel: cancel,
        promise: promise
    };
};

export default jsonp$1;
export { jsonp as callback, jsonp$1 as get };
//# sourceMappingURL=main.esm.js.map
