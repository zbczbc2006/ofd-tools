'use strict';

var JSZipUtils = require('jszip-utils');
var JsZip = require('jszip');
var parser = require('ofd-xml-parser');
var Hex = require('@lapo/asn1js/hex');
var Base64 = require('@lapo/asn1js/base64');
var ASN1 = require('@lapo/asn1js');
var smCrypto = require('sm-crypto');
var md5 = require('js-md5');
var sha1 = require('js-sha1');
var rsa = require('jsrsasign');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var JSZipUtils__namespace = /*#__PURE__*/_interopNamespaceDefault(JSZipUtils);

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

/*
 * ofd.js - A Javascript class for reading and rendering ofd files
 * <https://github.com/DLTech21/ofd.js>
 *
 * Copyright (c) 2020. DLTech21 All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

var convertPathAbbreviatedDatatoPoint = function convertPathAbbreviatedDatatoPoint(abbreviatedData) {
  var array = abbreviatedData.split(' ');
  var pointList = [];
  var i = 0;
  while (i < array.length) {
    if (array[i] === 'M' || array[i] === 'S') {
      var point = {
        type: 'M',
        x: parseFloat(array[i + 1]),
        y: parseFloat(array[i + 2])
      };
      i = i + 3;
      pointList.push(point);
    }
    if (array[i] === 'L') {
      var _point = {
        type: 'L',
        x: parseFloat(array[i + 1]),
        y: parseFloat(array[i + 2])
      };
      i = i + 3;
      pointList.push(_point);
    } else if (array[i] === 'C') {
      var _point2 = {
        type: 'C',
        x: 0,
        y: 0
      };
      pointList.push(_point2);
      i++;
    } else if (array[i] === 'B') {
      var _point3 = {
        type: 'B',
        x1: parseFloat(array[i + 1]),
        y1: parseFloat(array[i + 2]),
        x2: parseFloat(array[i + 3]),
        y2: parseFloat(array[i + 4]),
        x3: parseFloat(array[i + 5]),
        y3: parseFloat(array[i + 6])
      };
      i = i + 7;
      pointList.push(_point3);
    } else {
      i++;
    }
  }
  return pointList;
};
var calPathPoint = function calPathPoint(abbreviatedPoint) {
  var pointList = [];
  for (var i = 0; i < abbreviatedPoint.length; i++) {
    var point = abbreviatedPoint[i];
    if (point.type === 'M' || point.type === 'L' || point.type === 'C') {
      var x = 0,
        y = 0;
      x = point.x;
      y = point.y;
      point.x = converterDpi(x);
      point.y = converterDpi(y);
      pointList.push(point);
    } else if (point.type === 'B') {
      var x1 = point.x1,
        y1 = point.y1;
      var x2 = point.x2,
        y2 = point.y2;
      var x3 = point.x3,
        y3 = point.y3;
      var realPoint = {
        type: 'B',
        x1: converterDpi(x1),
        y1: converterDpi(y1),
        x2: converterDpi(x2),
        y2: converterDpi(y2),
        x3: converterDpi(x3),
        y3: converterDpi(y3)
      };
      pointList.push(realPoint);
    }
  }
  return pointList;
};
var millimetersToPixel = function millimetersToPixel(mm, dpi) {
  //毫米转像素：mm * dpi / 25.4
  return mm * dpi / 25.4;
};
var MaxScale = 10;
var Scale = MaxScale;
var setMaxPageScale = function setMaxPageScale(scale) {
  MaxScale = scale > 5 ? 5 : scale;
};
var setPageScale = function setPageScale(scale) {
  // scale = Math.ceil(scale);
  Scale = scale > 1 ? scale : 1;
  Scale = Scale > MaxScale ? MaxScale : Scale;
};
var getPageScale = function getPageScale() {
  return Scale;
};
var converterDpi = function converterDpi(width) {
  return millimetersToPixel(width, Scale * 25.4);
};
var deltaFormatter = function deltaFormatter(delta) {
  if (delta.indexOf('g') === -1) {
    var floatList = [];
    var _iterator = _createForOfIteratorHelper(delta.split(' ')),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var f = _step.value;
        floatList.push(parseFloat(f));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return floatList;
  } else {
    var array = delta.split(' ');
    var gFlag = false;
    var gProcessing = false;
    var gItemCount = 0;
    var _floatList = [];
    var _iterator2 = _createForOfIteratorHelper(array),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var s = _step2.value;
        if ('g' === s) {
          gFlag = true;
        } else {
          if (!s || s.trim().length == 0) {
            continue;
          }
          if (gFlag) {
            gItemCount = parseInt(s);
            gProcessing = true;
            gFlag = false;
          } else if (gProcessing) {
            for (var j = 0; j < gItemCount; j++) {
              _floatList.push(parseFloat(s));
            }
            gProcessing = false;
          } else {
            _floatList.push(parseFloat(s));
          }
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return _floatList;
  }
};
var calTextPoint = function calTextPoint(textCodes) {
  var x = 0;
  var y = 0;
  var textCodePointList = [];
  if (!textCodes) {
    return textCodePointList;
  }
  var _iterator3 = _createForOfIteratorHelper(textCodes),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var textCode = _step3.value;
      if (!textCode) {
        continue;
      }
      x = parseFloat(textCode['@_X']);
      y = parseFloat(textCode['@_Y']);
      if (isNaN(x)) {
        x = 0;
      }
      if (isNaN(y)) {
        y = 0;
      }
      var deltaXList = [];
      var deltaYList = [];
      if (textCode['@_DeltaX'] && textCode['@_DeltaX'].length > 0) {
        deltaXList = deltaFormatter(textCode['@_DeltaX']);
      }
      if (textCode['@_DeltaY'] && textCode['@_DeltaY'].length > 0) {
        deltaYList = deltaFormatter(textCode['@_DeltaY']);
      }
      var textStr = textCode['#text'];
      if (textStr) {
        textStr += '';
        textStr = decodeHtml(textStr);
        textStr = textStr.replace(/&#x20;/g, ' ');
        for (var i = 0; i < textStr.length; i++) {
          if (i > 0 && deltaXList.length > 0) {
            x += deltaXList[i - 1];
          }
          if (i > 0 && deltaYList.length > 0) {
            y += deltaYList[i - 1];
          }
          var text = textStr.substring(i, i + 1);
          var textCodePoint = {
            x: converterDpi(x),
            y: converterDpi(y),
            text: text
          };
          textCodePointList.push(textCodePoint);
        }
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return textCodePointList;
};
var replaceFirstSlash = function replaceFirstSlash(str) {
  if (str) {
    if (str.indexOf('/') === 0) {
      str = str.replace('/', '');
    }
  }
  return str;
};
var getExtensionByPath = function getExtensionByPath(path) {
  if (!path && typeof path !== 'string') return '';
  return path.substring(path.lastIndexOf('.') + 1);
};
var REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;
var HTML_DECODE = {
  '&lt;': '<',
  '&gt;': '>',
  '&amp;': '&',
  '&nbsp;': ' ',
  '&quot;': '"',
  '&copy;': '',
  '&apos;': "'"
  // Add more
};

var decodeHtml = function decodeHtml(s) {
  s = s != undefined ? s : this.toString();
  return typeof s != 'string' ? s : s.replace(REGX_HTML_DECODE, function ($0, $1) {
    var c = HTML_DECODE[$0];
    if (c == undefined) {
      // Maybe is Entity Number
      if (!isNaN($1)) {
        c = String.fromCharCode($1 == 160 ? 32 : $1);
      } else {
        c = $0;
      }
    }
    return c;
  });
};
var FONT_FAMILY = {
  '楷体': '楷体, KaiTi, Kai, simkai',
  'kaiti': '楷体, KaiTi, Kai, simkai',
  'Kai': '楷体, KaiTi, Kai',
  'simsun': 'SimSun, simsun, Songti SC',
  '宋体': 'SimSun, simsun, Songti SC',
  '黑体': 'SimHei, STHeiti, simhei',
  '仿宋': 'FangSong, STFangsong, simfang',
  '小标宋体': 'sSun',
  '方正小标宋_gbk': 'sSun',
  '仿宋_gb2312': 'FangSong, STFangsong, simfang',
  '楷体_gb2312': '楷体, KaiTi, Kai, simkai',
  'couriernew': 'Courier New',
  'courier new': 'Courier New'
};
var getFontFamily = function getFontFamily(font) {
  if (FONT_FAMILY[font.toLowerCase()]) {
    font = FONT_FAMILY[font.toLowerCase()];
  }
  for (var _i = 0, _Object$keys = Object.keys(FONT_FAMILY); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    if (font.toLowerCase().indexOf(key.toLowerCase()) != -1) {
      return FONT_FAMILY[key];
    }
  }
  return font;
};
var parseStBox = function parseStBox(obj) {
  if (obj) {
    var array = obj.split(' ');
    return {
      x: parseFloat(array[0]),
      y: parseFloat(array[1]),
      w: parseFloat(array[2]),
      h: parseFloat(array[3])
    };
  } else {
    return null;
  }
};
var parseCtm = function parseCtm(ctm) {
  var array = ctm.split(' ');
  return array;
};
var parseColor = function parseColor(color) {
  if (color) {
    if (color.indexOf('#') !== -1) {
      color = color.replace(/#/g, '');
      color = color.replace(/ /g, '');
      color = '#' + color.toString();
      return color;
    }
    var array = color.split(' ');
    return "rgb(".concat(array[0], ", ").concat(array[1], ", ").concat(array[2], ")");
  } else {
    return "rgb(0, 0, 0)";
  }
};
var converterBox = function converterBox(box) {
  return {
    x: converterDpi(box.x),
    y: converterDpi(box.y),
    w: converterDpi(box.w),
    h: converterDpi(box.h)
  };
};
var Uint8ArrayToHexString = function Uint8ArrayToHexString(arr) {
  var words = [];
  var j = 0;
  for (var i = 0; i < arr.length * 2; i += 2) {
    words[i >>> 3] |= parseInt(arr[j], 10) << 24 - i % 8 * 4;
    j++;
  }

  // 转换到16进制
  var hexChars = [];
  for (var _i2 = 0; _i2 < arr.length; _i2++) {
    var bite = words[_i2 >>> 2] >>> 24 - _i2 % 4 * 8 & 0xff;
    hexChars.push((bite >>> 4).toString(16));
    hexChars.push((bite & 0x0f).toString(16));
  }
  return hexChars.join('');
};

var calPageBox = function calPageBox(screenWidth, document, page) {
  var area = page[Object.keys(page)[0]]['json']['ofd:Area'];
  var box;
  if (area) {
    var physicalBox = area['ofd:PhysicalBox'];
    if (physicalBox) {
      box = physicalBox;
    } else {
      var applicationBox = area['ofd:ApplicationBox'];
      if (applicationBox) {
        box = applicationBox;
      } else {
        var contentBox = area['ofd:ContentBox'];
        if (contentBox) {
          box = contentBox;
        }
      }
    }
  } else {
    var documentArea = document['ofd:CommonData']['ofd:PageArea'];
    var _physicalBox = documentArea['ofd:PhysicalBox'];
    if (_physicalBox) {
      box = _physicalBox;
    } else {
      var _applicationBox = documentArea['ofd:ApplicationBox'];
      if (_applicationBox) {
        box = _applicationBox;
      } else {
        var _contentBox = documentArea['ofd:ContentBox'];
        if (_contentBox) {
          box = _contentBox;
        }
      }
    }
  }
  var array = box.split(' ');
  var scale = ((screenWidth - 10) / parseFloat(array[2])).toFixed(1);
  setMaxPageScale(scale);
  setPageScale(scale);
  box = parseStBox(box);
  box = converterBox(box);
  return box;
};
var calPageBoxScale = function calPageBoxScale(document, page) {
  var area = page[Object.keys(page)[0]]['json']['ofd:Area'];
  var box;
  if (area) {
    var physicalBox = area['ofd:PhysicalBox'];
    if (physicalBox) {
      box = physicalBox;
    } else {
      var applicationBox = area['ofd:ApplicationBox'];
      if (applicationBox) {
        box = applicationBox;
      } else {
        var contentBox = area['ofd:ContentBox'];
        if (contentBox) {
          box = contentBox;
        }
      }
    }
  } else {
    var documentArea = document['ofd:CommonData']['ofd:PageArea'];
    var _physicalBox2 = documentArea['ofd:PhysicalBox'];
    if (_physicalBox2) {
      box = _physicalBox2;
    } else {
      var _applicationBox2 = documentArea['ofd:ApplicationBox'];
      if (_applicationBox2) {
        box = _applicationBox2;
      } else {
        var _contentBox2 = documentArea['ofd:ContentBox'];
        if (_contentBox2) {
          box = _contentBox2;
        }
      }
    }
  }
  box = parseStBox(box);
  box = converterBox(box);
  return box;
};
var renderPage = function renderPage(pageDiv, page, tpls, fontResObj, drawParamResObj, multiMediaResObj) {
  var pageId = Object.keys(page)[0];
  var template = page[pageId]['json']['ofd:Template'];
  if (template) {
    var _array = [];
    var layers = tpls[template['@_TemplateID']]['json']['ofd:Content']['ofd:Layer'];
    _array = _array.concat(layers);
    var _iterator2 = _createForOfIteratorHelper(_array),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var layer = _step2.value;
        if (layer) {
          renderLayer(pageDiv, fontResObj, drawParamResObj, multiMediaResObj, layer, false);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  var contentLayers = page[pageId]['json']['ofd:Content']['ofd:Layer'];
  var array = [];
  array = array.concat(contentLayers);
  var _iterator3 = _createForOfIteratorHelper(array),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var contentLayer = _step3.value;
      if (contentLayer) {
        renderLayer(pageDiv, fontResObj, drawParamResObj, multiMediaResObj, contentLayer, false);
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  if (page[pageId].stamp) {
    var _iterator4 = _createForOfIteratorHelper(page[pageId].stamp),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var stamp = _step4.value;
        if (stamp.type === 'ofd') {
          renderSealPage(pageDiv, stamp.obj.pages, stamp.obj.tpls, true, stamp.stamp.stampAnnot, stamp.obj.fontResObj, stamp.obj.drawParamResObj, stamp.obj.multiMediaResObj, stamp.stamp.sealObj.SES_Signature, stamp.stamp.signedInfo);
        } else if (stamp.type === 'png') {
          var sealBoundary = converterBox(stamp.obj.boundary);
          var oid = Array.isArray(stamp.stamp.stampAnnot) ? stamp.stamp.stampAnnot[0]['pfIndex'] : stamp.stamp.stampAnnot['pfIndex'];
          var element = renderImageOnDiv(pageDiv.style.width, pageDiv.style.height, stamp.obj.img, sealBoundary, stamp.obj.clip, true, stamp.stamp.sealObj.SES_Signature, stamp.stamp.signedInfo, oid);
          pageDiv.appendChild(element);
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }
  if (page[pageId].annotation) {
    var _iterator5 = _createForOfIteratorHelper(page[pageId].annotation),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var annotation = _step5.value;
        renderAnnotation(pageDiv, annotation, fontResObj, drawParamResObj, multiMediaResObj);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  }
};
var renderAnnotation = function renderAnnotation(pageDiv, annotation, fontResObj, drawParamResObj, multiMediaResObj) {
  var div = document.createElement('div');
  div.setAttribute('style', "overflow: hidden;z-index:".concat(annotation['pfIndex'], ";position:relative;"));
  var boundary = annotation['appearance']['@_Boundary'];
  if (boundary) {
    var divBoundary = converterBox(parseStBox(boundary));
    div.setAttribute('style', "overflow: hidden;z-index:".concat(annotation['pfIndex'], ";position:absolute; left: ").concat(divBoundary.x, "px; top: ").concat(divBoundary.y, "px; width: ").concat(divBoundary.w, "px; height: ").concat(divBoundary.h, "px"));
  }
  var contentLayer = annotation['appearance'];
  renderLayer(div, fontResObj, drawParamResObj, multiMediaResObj, contentLayer, false);
  pageDiv.appendChild(div);
};
var renderSealPage = function renderSealPage(pageDiv, pages, tpls, isStampAnnot, stampAnnot, fontResObj, drawParamResObj, multiMediaResObj, SES_Signature, signedInfo) {
  var _iterator6 = _createForOfIteratorHelper(pages),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var page = _step6.value;
      var pageId = Object.keys(page)[0];
      var stampAnnotBoundary = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      };
      if (isStampAnnot && stampAnnot) {
        stampAnnotBoundary = stampAnnot.boundary;
      }
      var divBoundary = converterBox(stampAnnotBoundary);
      var div = document.createElement('div');
      div.setAttribute('name', 'seal_img_div');
      div.setAttribute('style', "cursor: pointer; position:relative; left: ".concat(divBoundary.x, "px; top: ").concat(divBoundary.y, "px; width: ").concat(divBoundary.w, "px; height: ").concat(divBoundary.h, "px"));
      div.setAttribute('data-ses-signature', "".concat(JSON.stringify(SES_Signature)));
      div.setAttribute('data-signed-info', "".concat(JSON.stringify(signedInfo)));
      var template = page[pageId]['json']['ofd:Template'];
      if (template) {
        var layers = tpls[template['@_TemplateID']]['json']['ofd:Content']['ofd:Layer'];
        var _array2 = [];
        _array2 = _array2.concat(layers);
        var _iterator7 = _createForOfIteratorHelper(_array2),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var layer = _step7.value;
            if (layer) {
              renderLayer(div, fontResObj, drawParamResObj, multiMediaResObj, layer, isStampAnnot);
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
      var contentLayers = page[pageId]['json']['ofd:Content']['ofd:Layer'];
      var array = [];
      array = array.concat(contentLayers);
      var _iterator8 = _createForOfIteratorHelper(array),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var contentLayer = _step8.value;
          if (contentLayer) {
            renderLayer(div, fontResObj, drawParamResObj, multiMediaResObj, contentLayer, isStampAnnot);
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      pageDiv.appendChild(div);
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
};
var renderLayer = function renderLayer(pageDiv, fontResObj, drawParamResObj, multiMediaResObj, layer, isStampAnnot) {
  var fillColor = null;
  var strokeColor = null;
  var lineWith = converterDpi(0.353);
  var drawParam = layer['@_DrawParam'];
  if (drawParam && Object.keys(drawParamResObj).length > 0 && drawParamResObj[drawParam]) {
    if (drawParamResObj[drawParam]['relative']) {
      drawParam = drawParamResObj[drawParam]['relative'];
      if (drawParamResObj[drawParam]['FillColor']) {
        fillColor = parseColor(drawParamResObj[drawParam]['FillColor']);
      }
      if (drawParamResObj[drawParam]['StrokeColor']) {
        strokeColor = parseColor(drawParamResObj[drawParam]['StrokeColor']);
      }
      if (drawParamResObj[drawParam]['LineWidth']) {
        lineWith = converterDpi(drawParamResObj[drawParam]['LineWidth']);
      }
    }
    if (drawParamResObj[drawParam]['FillColor']) {
      fillColor = parseColor(drawParamResObj[drawParam]['FillColor']);
    }
    if (drawParamResObj[drawParam]['StrokeColor']) {
      strokeColor = parseColor(drawParamResObj[drawParam]['StrokeColor']);
    }
    if (drawParamResObj[drawParam]['LineWidth']) {
      lineWith = converterDpi(drawParamResObj[drawParam]['LineWidth']);
    }
  }
  var imageObjects = layer['ofd:ImageObject'];
  var imageObjectArray = [];
  imageObjectArray = imageObjectArray.concat(imageObjects);
  var _iterator9 = _createForOfIteratorHelper(imageObjectArray),
    _step9;
  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var imageObject = _step9.value;
      if (imageObject) {
        var element = renderImageObject(pageDiv.style.width, pageDiv.style.height, multiMediaResObj, imageObject);
        pageDiv.appendChild(element);
      }
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
  var pathObjects = layer['ofd:PathObject'];
  var pathObjectArray = [];
  pathObjectArray = pathObjectArray.concat(pathObjects);
  var _iterator10 = _createForOfIteratorHelper(pathObjectArray),
    _step10;
  try {
    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
      var pathObject = _step10.value;
      if (pathObject) {
        var svg = renderPathObject(drawParamResObj, pathObject, fillColor, strokeColor, lineWith, isStampAnnot);
        pageDiv.appendChild(svg);
      }
    }
  } catch (err) {
    _iterator10.e(err);
  } finally {
    _iterator10.f();
  }
  var textObjects = layer['ofd:TextObject'];
  var textObjectArray = [];
  textObjectArray = textObjectArray.concat(textObjects);
  var _iterator11 = _createForOfIteratorHelper(textObjectArray),
    _step11;
  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      var textObject = _step11.value;
      if (textObject) {
        var _svg = renderTextObject(fontResObj, textObject, fillColor, strokeColor);
        pageDiv.appendChild(_svg);
      }
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
  }
};
var renderImageObject = function renderImageObject(pageWidth, pageHeight, multiMediaResObj, imageObject) {
  var boundary = parseStBox(imageObject['@_Boundary']);
  boundary = converterBox(boundary);
  var resId = imageObject['@_ResourceID'];
  if (multiMediaResObj[resId].format === 'gbig2') {
    var img = multiMediaResObj[resId].img;
    var width = multiMediaResObj[resId].width;
    var height = multiMediaResObj[resId].height;
    return renderImageOnCanvas(img, width, height, boundary, imageObject['pfIndex']);
  } else {
    return renderImageOnDiv(pageWidth, pageHeight, multiMediaResObj[resId].img, boundary, false, false, null, null, imageObject['pfIndex']);
  }
};
var renderImageOnCanvas = function renderImageOnCanvas(img, imgWidth, imgHeight, boundary, oid) {
  var arr = new Uint8ClampedArray(4 * imgWidth * imgHeight);
  for (var i = 0; i < img.length; i++) {
    arr[4 * i] = img[i];
    arr[4 * i + 1] = img[i];
    arr[4 * i + 2] = img[i];
    arr[4 * i + 3] = 255;
  }
  var imageData = new ImageData(arr, imgWidth, imgHeight);
  var canvas = document.createElement('canvas');
  canvas.width = imgWidth;
  canvas.height = imgHeight;
  var context = canvas.getContext('2d');
  context.putImageData(imageData, 0, 0);
  canvas.setAttribute('style', "left: ".concat(boundary.x, "px; top: ").concat(boundary.y, "px; width: ").concat(boundary.w, "px; height: ").concat(boundary.h, "px;z-index: ").concat(oid));
  canvas.style.position = 'absolute';
  return canvas;
};
var renderImageOnDiv = function renderImageOnDiv(pageWidth, pageHeight, imgSrc, boundary, clip, isStampAnnot, SES_Signature, signedInfo, oid) {
  var div = document.createElement('div');
  if (isStampAnnot) {
    div.setAttribute('name', 'seal_img_div');
    div.setAttribute('data-ses-signature', "".concat(JSON.stringify(SES_Signature)));
    div.setAttribute('data-signed-info', "".concat(JSON.stringify(signedInfo)));
  }
  var img = document.createElement('img');
  img.src = imgSrc;
  img.setAttribute('width', '100%');
  img.setAttribute('height', '100%');
  div.appendChild(img);
  var pw = parseFloat(pageWidth.replace('px', ''));
  var ph = parseFloat(pageHeight.replace('px', ''));
  var w = boundary.w > pw ? pw : boundary.w;
  var h = boundary.h > ph ? ph : boundary.h;
  var c = '';
  if (clip) {
    clip = converterBox(clip);
    c = "clip: rect(".concat(clip.y, "px, ").concat(clip.w + clip.x, "px, ").concat(clip.h + clip.y, "px, ").concat(clip.x, "px)");
  }
  div.setAttribute('style', "cursor: pointer; overflow: hidden; position: absolute; left: ".concat(c ? boundary.x : boundary.x < 0 ? 0 : boundary.x, "px; top: ").concat(c ? boundary.y : boundary.y < 0 ? 0 : boundary.y, "px; width: ").concat(w, "px; height: ").concat(h, "px; ").concat(c, ";z-index: ").concat(oid));
  return div;
};
var renderTextObject = function renderTextObject(fontResObj, textObject, defaultFillColor, defaultStrokeColor) {
  var defaultFillOpacity = 1;
  var boundary = parseStBox(textObject['@_Boundary']);
  boundary = converterBox(boundary);
  var ctm = textObject['@_CTM'];
  var hScale = textObject['@_HScale'];
  var font = textObject['@_Font'];
  var weight = textObject['@_Weight'];
  var size = converterDpi(parseFloat(textObject['@_Size']));
  var array = [];
  array = array.concat(textObject['ofd:TextCode']);
  var textCodePointList = calTextPoint(array);
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('version', '1.1');
  var fillColor = textObject['ofd:FillColor'];
  if (fillColor) {
    defaultFillColor = parseColor(fillColor['@_Value']);
    var alpha = fillColor['@_Alpha'];
    if (alpha) {
      defaultFillOpacity = alpha > 1 ? alpha / 255 : alpha;
    }
  }
  var _iterator12 = _createForOfIteratorHelper(textCodePointList),
    _step12;
  try {
    for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
      var textCodePoint = _step12.value;
      if (textCodePoint && !isNaN(textCodePoint.x)) {
        var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', textCodePoint.x);
        text.setAttribute('y', textCodePoint.y);
        text.innerHTML = textCodePoint.text;
        if (ctm) {
          var ctms = parseCtm(ctm);
          text.setAttribute('transform', "matrix(".concat(ctms[0], " ").concat(ctms[1], " ").concat(ctms[2], " ").concat(ctms[3], " ").concat(converterDpi(ctms[4]), " ").concat(converterDpi(ctms[5]), ")"));
        }
        if (hScale) {
          text.setAttribute('transform', "matrix(".concat(hScale, ", 0, 0, 1, ").concat((1 - hScale) * textCodePoint.x, ", 0)"));
          // text.setAttribute('transform-origin', `${textCodePoint.x}`);
        }

        text.setAttribute('fill', defaultStrokeColor);
        text.setAttribute('fill', defaultFillColor);
        text.setAttribute('fill-opacity', defaultFillOpacity);
        text.setAttribute('style', "font-weight: ".concat(weight, ";font-size:").concat(size, "px;font-family: ").concat(getFontFamily(fontResObj[font]), ";"));
        svg.appendChild(text);
      }
    }
  } catch (err) {
    _iterator12.e(err);
  } finally {
    _iterator12.f();
  }
  var width = boundary.w;
  var height = boundary.h;
  var left = boundary.x;
  var top = boundary.y;
  svg.setAttribute('style', "overflow:visible;position:absolute;width:".concat(width, "px;height:").concat(height, "px;left:").concat(left, "px;top:").concat(top, "px;z-index:").concat(textObject['pfIndex']));
  return svg;
};
var renderPathObject = function renderPathObject(drawParamResObj, pathObject, defaultFillColor, defaultStrokeColor, defaultLineWith, isStampAnnot) {
  var boundary = parseStBox(pathObject['@_Boundary']);
  boundary = converterBox(boundary);
  var lineWidth = pathObject['@_LineWidth'];
  var abbreviatedData = pathObject['ofd:AbbreviatedData'];
  var points = calPathPoint(convertPathAbbreviatedDatatoPoint(abbreviatedData));
  var ctm = pathObject['@_CTM'];
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('version', '1.1');
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  if (lineWidth) {
    defaultLineWith = converterDpi(lineWidth);
  }
  var drawParam = pathObject['@_DrawParam'];
  if (drawParam) {
    lineWidth = drawParamResObj[drawParam].LineWidth;
    if (lineWidth) {
      defaultLineWith = converterDpi(lineWidth);
    }
  }
  if (ctm) {
    var ctms = parseCtm(ctm);
    path.setAttribute('transform', "matrix(".concat(ctms[0], " ").concat(ctms[1], " ").concat(ctms[2], " ").concat(ctms[3], " ").concat(converterDpi(ctms[4]), " ").concat(converterDpi(ctms[5]), ")"));
  }
  var strokeStyle = '';
  var strokeColor = pathObject['ofd:StrokeColor'];
  if (strokeColor) {
    defaultStrokeColor = parseColor(strokeColor['@_Value']);
  }
  var fillStyle = 'fill: none;';
  var fillColor = pathObject['ofd:FillColor'];
  if (fillColor) {
    defaultFillColor = parseColor(fillColor['@_Value']);
  }
  if (defaultLineWith > 0 && !defaultStrokeColor) {
    defaultStrokeColor = defaultFillColor;
    if (!defaultStrokeColor) {
      defaultStrokeColor = 'rgb(0, 0, 0)';
    }
  }
  strokeStyle = "stroke:".concat(defaultStrokeColor, ";stroke-width:").concat(defaultLineWith, "px;");
  if (pathObject['@_Stroke'] == 'false') {
    strokeStyle = "";
  }
  if (pathObject['@_Fill'] != 'false') {
    fillStyle = "fill:".concat(isStampAnnot ? 'none' : defaultFillColor ? defaultFillColor : 'none', ";");
  }
  path.setAttribute('style', "".concat(strokeStyle, ";").concat(fillStyle));
  var d = '';
  var _iterator13 = _createForOfIteratorHelper(points),
    _step13;
  try {
    for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
      var point = _step13.value;
      if (point.type === 'M') {
        d += "M".concat(point.x, " ").concat(point.y, " ");
      } else if (point.type === 'L') {
        d += "L".concat(point.x, " ").concat(point.y, " ");
      } else if (point.type === 'B') {
        d += "C".concat(point.x1, " ").concat(point.y1, " ").concat(point.x2, " ").concat(point.y2, " ").concat(point.x3, " ").concat(point.y3, " ");
      } else if (point.type === 'C') {
        d += "Z";
      }
    }
  } catch (err) {
    _iterator13.e(err);
  } finally {
    _iterator13.f();
  }
  path.setAttribute('d', d);
  svg.appendChild(path);
  var width = isStampAnnot ? boundary.w : Math.ceil(boundary.w);
  var height = isStampAnnot ? boundary.h : Math.ceil(boundary.h);
  var left = boundary.x;
  var top = boundary.y;
  svg.setAttribute('style', "overflow:visible;position:absolute;width:".concat(width, "px;height:").concat(height, "px;left:").concat(left, "px;top:").concat(top, "px;z-index:").concat(pathObject['pfIndex']));
  return svg;
};

var pipelinFun = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(funcs, callback) {
    var index, value, length;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (Array.isArray(funcs)) {
            _context.next = 2;
            break;
          }
          throw new TypeError('funcs must be an array');
        case 2:
          if (!('function' !== typeof callback)) {
            _context.next = 4;
            break;
          }
          throw new TypeError(callback + ' is not a function');
        case 4:
          length = funcs.length >>> 0;
          index = 0;
        case 6:
          if (!(length > index)) {
            _context.next = 13;
            break;
          }
          _context.next = 9;
          return callback(value, funcs[index], index, funcs);
        case 9:
          value = _context.sent;
        case 10:
          ++index;
          _context.next = 6;
          break;
        case 13:
          return _context.abrupt("return", value);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function pipelinFun(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var _pipeline = function _pipeline() {
  var _this = this;
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  return pipelinFun(funcs, function (a, b) {
    return b.call(_this, a);
  });
};
var pipeline = _pipeline;

/* Copyright 2018 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* globals process */

// NW.js / Electron is a browser context, but copies some Node.js objects; see
// http://docs.nwjs.io/en/latest/For%20Users/Advanced/JavaScript%20Contexts%20in%20NW.js/#access-nodejs-and-nwjs-api-in-browser-context
// https://www.electronjs.org/docs/api/process#processversionselectron-readonly
// https://www.electronjs.org/docs/api/process#processtype-readonly
var isNodeJS = (typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process + "" === "[object process]" && !process.versions.nw && !(process.versions.electron && process.type && process.type !== "browser");

/* Copyright 2017 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Skip compatibility checks for modern builds and if we already ran the module.
if ((typeof PDFJSDev === "undefined" || !PDFJSDev.test("SKIP_BABEL")) && (typeof globalThis === "undefined" || !globalThis._pdfjsCompatibilityChecked)) {
  // Provides support for globalThis in legacy browsers.
  // Support: IE11/Edge, Opera
  if (typeof globalThis === "undefined" || globalThis.Math !== Math) {
    // eslint-disable-next-line no-global-assign
    globalThis = require("core-js/es/global-this");
  }
  globalThis._pdfjsCompatibilityChecked = true;

  // Support: Node.js
  (function checkNodeBtoa() {
    if (globalThis.btoa || !isNodeJS) {
      return;
    }
    globalThis.btoa = function (chars) {
      // eslint-disable-next-line no-undef
      return Buffer.from(chars, "binary").toString("base64");
    };
  })();

  // Support: Node.js
  (function checkNodeAtob() {
    if (globalThis.atob || !isNodeJS) {
      return;
    }
    globalThis.atob = function (input) {
      // eslint-disable-next-line no-undef
      return Buffer.from(input, "base64").toString("binary");
    };
  })();

  // Provides support for String.prototype.startsWith in legacy browsers.
  // Support: IE, Chrome<41
  (function checkStringStartsWith() {
    if (String.prototype.startsWith) {
      return;
    }
    require("core-js/es/string/starts-with.js");
  })();

  // Provides support for String.prototype.endsWith in legacy browsers.
  // Support: IE, Chrome<41
  (function checkStringEndsWith() {
    if (String.prototype.endsWith) {
      return;
    }
    require("core-js/es/string/ends-with.js");
  })();

  // Provides support for String.prototype.includes in legacy browsers.
  // Support: IE, Chrome<41
  (function checkStringIncludes() {
    if (String.prototype.includes) {
      return;
    }
    require("core-js/es/string/includes.js");
  })();

  // Provides support for Array.prototype.includes in legacy browsers.
  // Support: IE, Chrome<47
  (function checkArrayIncludes() {
    if (Array.prototype.includes) {
      return;
    }
    require("core-js/es/array/includes.js");
  })();

  // Provides support for Array.from in legacy browsers.
  // Support: IE
  (function checkArrayFrom() {
    if (Array.from) {
      return;
    }
    require("core-js/es/array/from.js");
  })();

  // Provides support for Object.assign in legacy browsers.
  // Support: IE
  (function checkObjectAssign() {
    if (Object.assign) {
      return;
    }
    require("core-js/es/object/assign.js");
  })();

  // Provides support for Object.fromEntries in legacy browsers.
  // Support: IE, Chrome<73
  (function checkObjectFromEntries() {
    if (Object.fromEntries) {
      return;
    }
    require("core-js/es/object/from-entries.js");
  })();

  // Provides support for Math.log2 in legacy browsers.
  // Support: IE, Chrome<38
  (function checkMathLog2() {
    if (Math.log2) {
      return;
    }
    Math.log2 = require("core-js/es/math/log2.js");
  })();

  // Provides support for Number.isNaN in legacy browsers.
  // Support: IE.
  (function checkNumberIsNaN() {
    if (Number.isNaN) {
      return;
    }
    Number.isNaN = require("core-js/es/number/is-nan.js");
  })();

  // Provides support for Number.isInteger in legacy browsers.
  // Support: IE, Chrome<34
  (function checkNumberIsInteger() {
    if (Number.isInteger) {
      return;
    }
    Number.isInteger = require("core-js/es/number/is-integer.js");
  })();

  // Provides support for TypedArray.prototype.slice in legacy browsers.
  // Support: IE
  (function checkTypedArraySlice() {
    if (Uint8Array.prototype.slice) {
      return;
    }
    require("core-js/es/typed-array/slice");
  })();

  // Provides support for *recent* additions to the Promise specification,
  // however basic Promise support is assumed to be available natively.
  // Support: Firefox<71, Safari<13, Chrome<76
  (function checkPromise() {
    if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("IMAGE_DECODERS")) {
      // The current image decoders are synchronous, hence `Promise` shouldn't
      // need to be polyfilled for the IMAGE_DECODERS build target.
      return;
    }
    if (globalThis.Promise.allSettled) {
      return;
    }
    globalThis.Promise = require("core-js/es/promise/index.js");
  })();

  // Support: IE
  (function checkURL() {
    if (typeof PDFJSDev === "undefined" || !PDFJSDev.test("PRODUCTION")) {
      // Prevent "require is not a function" errors in development mode,
      // since the `URL` constructor should be available in modern browers.
      return;
    } else if (!PDFJSDev.test("GENERIC")) {
      // The `URL` constructor is assumed to be available in the extension
      // builds.
      return;
    } else if (PDFJSDev.test("IMAGE_DECODERS")) {
      // The current image decoders don't use the `URL` constructor, so it
      // doesn't need to be polyfilled for the IMAGE_DECODERS build target.
      return;
    }
    globalThis.URL = require("core-js/web/url.js");
  })();

  // Support: IE, Node.js
  (function checkReadableStream() {
    if (typeof PDFJSDev !== "undefined" && PDFJSDev.test("IMAGE_DECODERS")) {
      // The current image decoders are synchronous, hence `ReadableStream`
      // shouldn't need to be polyfilled for the IMAGE_DECODERS build target.
      return;
    }
    var isReadableStreamSupported = false;
    if (typeof ReadableStream !== "undefined") {
      // MS Edge may say it has ReadableStream but they are not up to spec yet.
      try {
        // eslint-disable-next-line no-new
        new ReadableStream({
          start: function start(controller) {
            controller.close();
          }
        });
        isReadableStreamSupported = true;
      } catch (e) {
        // The ReadableStream constructor cannot be used.
      }
    }
    if (isReadableStreamSupported) {
      return;
    }
    globalThis.ReadableStream = require("web-streams-polyfill/dist/ponyfill.js").ReadableStream;
  })();

  // We want to support Map iteration, but it doesn't seem possible to easily
  // test for that specifically; hence using a similarly unsupported property.
  // Support: IE11
  (function checkMapEntries() {
    if (globalThis.Map && globalThis.Map.prototype.entries) {
      return;
    }
    globalThis.Map = require("core-js/es/map/index.js");
  })();

  // We want to support Set iteration, but it doesn't seem possible to easily
  // test for that specifically; hence using a similarly unsupported property.
  // Support: IE11
  (function checkSetEntries() {
    if (globalThis.Set && globalThis.Set.prototype.entries) {
      return;
    }
    globalThis.Set = require("core-js/es/set/index.js");
  })();

  // Support: IE<11, Safari<8, Chrome<36
  (function checkWeakMap() {
    if (globalThis.WeakMap) {
      return;
    }
    globalThis.WeakMap = require("core-js/es/weak-map/index.js");
  })();

  // Support: IE11
  (function checkWeakSet() {
    if (globalThis.WeakSet) {
      return;
    }
    globalThis.WeakSet = require("core-js/es/weak-set/index.js");
  })();

  // Provides support for String.codePointAt in legacy browsers.
  // Support: IE11.
  (function checkStringCodePointAt() {
    if (String.prototype.codePointAt) {
      return;
    }
    require("core-js/es/string/code-point-at.js");
  })();

  // Provides support for String.fromCodePoint in legacy browsers.
  // Support: IE11.
  (function checkStringFromCodePoint() {
    if (String.fromCodePoint) {
      return;
    }
    String.fromCodePoint = require("core-js/es/string/from-code-point.js");
  })();

  // Support: IE
  (function checkSymbol() {
    if (globalThis.Symbol) {
      return;
    }
    require("core-js/es/symbol/index.js");
  })();

  // Provides support for String.prototype.padStart in legacy browsers.
  // Support: IE, Chrome<57
  (function checkStringPadStart() {
    if (String.prototype.padStart) {
      return;
    }
    require("core-js/es/string/pad-start.js");
  })();

  // Provides support for String.prototype.padEnd in legacy browsers.
  // Support: IE, Chrome<57
  (function checkStringPadEnd() {
    if (String.prototype.padEnd) {
      return;
    }
    require("core-js/es/string/pad-end.js");
  })();

  // Provides support for Object.values in legacy browsers.
  // Support: IE, Chrome<54
  (function checkObjectValues() {
    if (Object.values) {
      return;
    }
    Object.values = require("core-js/es/object/values.js");
  })();

  // Provides support for Object.entries in legacy browsers.
  // Support: IE, Chrome<54
  (function checkObjectEntries() {
    if (Object.entries) {
      return;
    }
    Object.entries = require("core-js/es/object/entries.js");
  })();
}

function unreachable(msg) {
  throw new Error(msg);
}
function shadow(obj, prop, value) {
  Object.defineProperty(obj, prop, {
    value: value,
    enumerable: true,
    configurable: true,
    writable: false
  });
  return value;
}

/**
 * @type {any}
 */
var BaseException = function BaseExceptionClosure() {
  // eslint-disable-next-line no-shadow
  function BaseException(message) {
    if (this.constructor === BaseException) {
      unreachable("Cannot initialize BaseException.");
    }
    this.message = message;
    this.name = this.constructor.name;
  }
  BaseException.prototype = new Error();
  BaseException.constructor = BaseException;
  return BaseException;
}();

// Calculate the base 2 logarithm of the number `x`. This differs from the
// native function in the sense that it returns the ceiling value and that it
// returns 0 instead of `Infinity`/`NaN` for `x` values smaller than/equal to 0.
function log2(x) {
  if (x <= 0) {
    return 0;
  }
  return Math.ceil(Math.log2(x));
}
function readInt8(data, offset) {
  return data[offset] << 24 >> 24;
}
function readUint16(data, offset) {
  return data[offset] << 8 | data[offset + 1];
}
function readUint32(data, offset) {
  return (data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]) >>> 0;
}

/* Copyright 2012 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint no-var: error */

// Table C-2
var QeTable = [{
  qe: 0x5601,
  nmps: 1,
  nlps: 1,
  switchFlag: 1
}, {
  qe: 0x3401,
  nmps: 2,
  nlps: 6,
  switchFlag: 0
}, {
  qe: 0x1801,
  nmps: 3,
  nlps: 9,
  switchFlag: 0
}, {
  qe: 0x0ac1,
  nmps: 4,
  nlps: 12,
  switchFlag: 0
}, {
  qe: 0x0521,
  nmps: 5,
  nlps: 29,
  switchFlag: 0
}, {
  qe: 0x0221,
  nmps: 38,
  nlps: 33,
  switchFlag: 0
}, {
  qe: 0x5601,
  nmps: 7,
  nlps: 6,
  switchFlag: 1
}, {
  qe: 0x5401,
  nmps: 8,
  nlps: 14,
  switchFlag: 0
}, {
  qe: 0x4801,
  nmps: 9,
  nlps: 14,
  switchFlag: 0
}, {
  qe: 0x3801,
  nmps: 10,
  nlps: 14,
  switchFlag: 0
}, {
  qe: 0x3001,
  nmps: 11,
  nlps: 17,
  switchFlag: 0
}, {
  qe: 0x2401,
  nmps: 12,
  nlps: 18,
  switchFlag: 0
}, {
  qe: 0x1c01,
  nmps: 13,
  nlps: 20,
  switchFlag: 0
}, {
  qe: 0x1601,
  nmps: 29,
  nlps: 21,
  switchFlag: 0
}, {
  qe: 0x5601,
  nmps: 15,
  nlps: 14,
  switchFlag: 1
}, {
  qe: 0x5401,
  nmps: 16,
  nlps: 14,
  switchFlag: 0
}, {
  qe: 0x5101,
  nmps: 17,
  nlps: 15,
  switchFlag: 0
}, {
  qe: 0x4801,
  nmps: 18,
  nlps: 16,
  switchFlag: 0
}, {
  qe: 0x3801,
  nmps: 19,
  nlps: 17,
  switchFlag: 0
}, {
  qe: 0x3401,
  nmps: 20,
  nlps: 18,
  switchFlag: 0
}, {
  qe: 0x3001,
  nmps: 21,
  nlps: 19,
  switchFlag: 0
}, {
  qe: 0x2801,
  nmps: 22,
  nlps: 19,
  switchFlag: 0
}, {
  qe: 0x2401,
  nmps: 23,
  nlps: 20,
  switchFlag: 0
}, {
  qe: 0x2201,
  nmps: 24,
  nlps: 21,
  switchFlag: 0
}, {
  qe: 0x1c01,
  nmps: 25,
  nlps: 22,
  switchFlag: 0
}, {
  qe: 0x1801,
  nmps: 26,
  nlps: 23,
  switchFlag: 0
}, {
  qe: 0x1601,
  nmps: 27,
  nlps: 24,
  switchFlag: 0
}, {
  qe: 0x1401,
  nmps: 28,
  nlps: 25,
  switchFlag: 0
}, {
  qe: 0x1201,
  nmps: 29,
  nlps: 26,
  switchFlag: 0
}, {
  qe: 0x1101,
  nmps: 30,
  nlps: 27,
  switchFlag: 0
}, {
  qe: 0x0ac1,
  nmps: 31,
  nlps: 28,
  switchFlag: 0
}, {
  qe: 0x09c1,
  nmps: 32,
  nlps: 29,
  switchFlag: 0
}, {
  qe: 0x08a1,
  nmps: 33,
  nlps: 30,
  switchFlag: 0
}, {
  qe: 0x0521,
  nmps: 34,
  nlps: 31,
  switchFlag: 0
}, {
  qe: 0x0441,
  nmps: 35,
  nlps: 32,
  switchFlag: 0
}, {
  qe: 0x02a1,
  nmps: 36,
  nlps: 33,
  switchFlag: 0
}, {
  qe: 0x0221,
  nmps: 37,
  nlps: 34,
  switchFlag: 0
}, {
  qe: 0x0141,
  nmps: 38,
  nlps: 35,
  switchFlag: 0
}, {
  qe: 0x0111,
  nmps: 39,
  nlps: 36,
  switchFlag: 0
}, {
  qe: 0x0085,
  nmps: 40,
  nlps: 37,
  switchFlag: 0
}, {
  qe: 0x0049,
  nmps: 41,
  nlps: 38,
  switchFlag: 0
}, {
  qe: 0x0025,
  nmps: 42,
  nlps: 39,
  switchFlag: 0
}, {
  qe: 0x0015,
  nmps: 43,
  nlps: 40,
  switchFlag: 0
}, {
  qe: 0x0009,
  nmps: 44,
  nlps: 41,
  switchFlag: 0
}, {
  qe: 0x0005,
  nmps: 45,
  nlps: 42,
  switchFlag: 0
}, {
  qe: 0x0001,
  nmps: 45,
  nlps: 43,
  switchFlag: 0
}, {
  qe: 0x5601,
  nmps: 46,
  nlps: 46,
  switchFlag: 0
}];

/**
 * This class implements the QM Coder decoding as defined in
 *   JPEG 2000 Part I Final Committee Draft Version 1.0
 *   Annex C.3 Arithmetic decoding procedure
 * available at http://www.jpeg.org/public/fcd15444-1.pdf
 *
 * The arithmetic decoder is used in conjunction with context models to decode
 * JPEG2000 and JBIG2 streams.
 */
var ArithmeticDecoder = /*#__PURE__*/function () {
  // C.3.5 Initialisation of the decoder (INITDEC)
  function ArithmeticDecoder(data, start, end) {
    _classCallCheck(this, ArithmeticDecoder);
    this.data = data;
    this.bp = start;
    this.dataEnd = end;
    this.chigh = data[start];
    this.clow = 0;
    this.byteIn();
    this.chigh = this.chigh << 7 & 0xffff | this.clow >> 9 & 0x7f;
    this.clow = this.clow << 7 & 0xffff;
    this.ct -= 7;
    this.a = 0x8000;
  }

  // C.3.4 Compressed data input (BYTEIN)
  _createClass(ArithmeticDecoder, [{
    key: "byteIn",
    value: function byteIn() {
      var data = this.data;
      var bp = this.bp;
      if (data[bp] === 0xff) {
        if (data[bp + 1] > 0x8f) {
          this.clow += 0xff00;
          this.ct = 8;
        } else {
          bp++;
          this.clow += data[bp] << 9;
          this.ct = 7;
          this.bp = bp;
        }
      } else {
        bp++;
        this.clow += bp < this.dataEnd ? data[bp] << 8 : 0xff00;
        this.ct = 8;
        this.bp = bp;
      }
      if (this.clow > 0xffff) {
        this.chigh += this.clow >> 16;
        this.clow &= 0xffff;
      }
    }

    // C.3.2 Decoding a decision (DECODE)
  }, {
    key: "readBit",
    value: function readBit(contexts, pos) {
      // Contexts are packed into 1 byte:
      // highest 7 bits carry cx.index, lowest bit carries cx.mps
      var cx_index = contexts[pos] >> 1,
        cx_mps = contexts[pos] & 1;
      var qeTableIcx = QeTable[cx_index];
      var qeIcx = qeTableIcx.qe;
      var d;
      var a = this.a - qeIcx;
      if (this.chigh < qeIcx) {
        // exchangeLps
        if (a < qeIcx) {
          a = qeIcx;
          d = cx_mps;
          cx_index = qeTableIcx.nmps;
        } else {
          a = qeIcx;
          d = 1 ^ cx_mps;
          if (qeTableIcx.switchFlag === 1) {
            cx_mps = d;
          }
          cx_index = qeTableIcx.nlps;
        }
      } else {
        this.chigh -= qeIcx;
        if ((a & 0x8000) !== 0) {
          this.a = a;
          return cx_mps;
        }
        // exchangeMps
        if (a < qeIcx) {
          d = 1 ^ cx_mps;
          if (qeTableIcx.switchFlag === 1) {
            cx_mps = d;
          }
          cx_index = qeTableIcx.nlps;
        } else {
          d = cx_mps;
          cx_index = qeTableIcx.nmps;
        }
      }
      // C.3.3 renormD;
      do {
        if (this.ct === 0) {
          this.byteIn();
        }
        a <<= 1;
        this.chigh = this.chigh << 1 & 0xffff | this.clow >> 15 & 1;
        this.clow = this.clow << 1 & 0xffff;
        this.ct--;
      } while ((a & 0x8000) === 0);
      this.a = a;
      contexts[pos] = cx_index << 1 | cx_mps;
      return d;
    }
  }]);
  return ArithmeticDecoder;
}();

/* Copyright 2012 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CCITTFaxDecoder = function CCITTFaxDecoder() {
  var ccittEOL = -2;
  var ccittEOF = -1;
  var twoDimPass = 0;
  var twoDimHoriz = 1;
  var twoDimVert0 = 2;
  var twoDimVertR1 = 3;
  var twoDimVertL1 = 4;
  var twoDimVertR2 = 5;
  var twoDimVertL2 = 6;
  var twoDimVertR3 = 7;
  var twoDimVertL3 = 8;

  // prettier-ignore
  var twoDimTable = [[-1, -1], [-1, -1],
  // 000000x
  [7, twoDimVertL3],
  // 0000010
  [7, twoDimVertR3],
  // 0000011
  [6, twoDimVertL2], [6, twoDimVertL2],
  // 000010x
  [6, twoDimVertR2], [6, twoDimVertR2],
  // 000011x
  [4, twoDimPass], [4, twoDimPass],
  // 0001xxx
  [4, twoDimPass], [4, twoDimPass], [4, twoDimPass], [4, twoDimPass], [4, twoDimPass], [4, twoDimPass], [3, twoDimHoriz], [3, twoDimHoriz],
  // 001xxxx
  [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimVertL1], [3, twoDimVertL1],
  // 010xxxx
  [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertR1], [3, twoDimVertR1],
  // 011xxxx
  [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [1, twoDimVert0], [1, twoDimVert0],
  // 1xxxxxx
  [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0]];

  // prettier-ignore
  var whiteTable1 = [[-1, -1],
  // 00000
  [12, ccittEOL],
  // 00001
  [-1, -1], [-1, -1],
  // 0001x
  [-1, -1], [-1, -1], [-1, -1], [-1, -1],
  // 001xx
  [-1, -1], [-1, -1], [-1, -1], [-1, -1],
  // 010xx
  [-1, -1], [-1, -1], [-1, -1], [-1, -1],
  // 011xx
  [11, 1792], [11, 1792],
  // 1000x
  [12, 1984],
  // 10010
  [12, 2048],
  // 10011
  [12, 2112],
  // 10100
  [12, 2176],
  // 10101
  [12, 2240],
  // 10110
  [12, 2304],
  // 10111
  [11, 1856], [11, 1856],
  // 1100x
  [11, 1920], [11, 1920],
  // 1101x
  [12, 2368],
  // 11100
  [12, 2432],
  // 11101
  [12, 2496],
  // 11110
  [12, 2560] // 11111
  ];

  // prettier-ignore
  var whiteTable2 = [[-1, -1], [-1, -1], [-1, -1], [-1, -1],
  // 0000000xx
  [8, 29], [8, 29],
  // 00000010x
  [8, 30], [8, 30],
  // 00000011x
  [8, 45], [8, 45],
  // 00000100x
  [8, 46], [8, 46],
  // 00000101x
  [7, 22], [7, 22], [7, 22], [7, 22],
  // 0000011xx
  [7, 23], [7, 23], [7, 23], [7, 23],
  // 0000100xx
  [8, 47], [8, 47],
  // 00001010x
  [8, 48], [8, 48],
  // 00001011x
  [6, 13], [6, 13], [6, 13], [6, 13],
  // 000011xxx
  [6, 13], [6, 13], [6, 13], [6, 13], [7, 20], [7, 20], [7, 20], [7, 20],
  // 0001000xx
  [8, 33], [8, 33],
  // 00010010x
  [8, 34], [8, 34],
  // 00010011x
  [8, 35], [8, 35],
  // 00010100x
  [8, 36], [8, 36],
  // 00010101x
  [8, 37], [8, 37],
  // 00010110x
  [8, 38], [8, 38],
  // 00010111x
  [7, 19], [7, 19], [7, 19], [7, 19],
  // 0001100xx
  [8, 31], [8, 31],
  // 00011010x
  [8, 32], [8, 32],
  // 00011011x
  [6, 1], [6, 1], [6, 1], [6, 1],
  // 000111xxx
  [6, 1], [6, 1], [6, 1], [6, 1], [6, 12], [6, 12], [6, 12], [6, 12],
  // 001000xxx
  [6, 12], [6, 12], [6, 12], [6, 12], [8, 53], [8, 53],
  // 00100100x
  [8, 54], [8, 54],
  // 00100101x
  [7, 26], [7, 26], [7, 26], [7, 26],
  // 0010011xx
  [8, 39], [8, 39],
  // 00101000x
  [8, 40], [8, 40],
  // 00101001x
  [8, 41], [8, 41],
  // 00101010x
  [8, 42], [8, 42],
  // 00101011x
  [8, 43], [8, 43],
  // 00101100x
  [8, 44], [8, 44],
  // 00101101x
  [7, 21], [7, 21], [7, 21], [7, 21],
  // 0010111xx
  [7, 28], [7, 28], [7, 28], [7, 28],
  // 0011000xx
  [8, 61], [8, 61],
  // 00110010x
  [8, 62], [8, 62],
  // 00110011x
  [8, 63], [8, 63],
  // 00110100x
  [8, 0], [8, 0],
  // 00110101x
  [8, 320], [8, 320],
  // 00110110x
  [8, 384], [8, 384],
  // 00110111x
  [5, 10], [5, 10], [5, 10], [5, 10],
  // 00111xxxx
  [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 11], [5, 11], [5, 11], [5, 11],
  // 01000xxxx
  [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [7, 27], [7, 27], [7, 27], [7, 27],
  // 0100100xx
  [8, 59], [8, 59],
  // 01001010x
  [8, 60], [8, 60],
  // 01001011x
  [9, 1472],
  // 010011000
  [9, 1536],
  // 010011001
  [9, 1600],
  // 010011010
  [9, 1728],
  // 010011011
  [7, 18], [7, 18], [7, 18], [7, 18],
  // 0100111xx
  [7, 24], [7, 24], [7, 24], [7, 24],
  // 0101000xx
  [8, 49], [8, 49],
  // 01010010x
  [8, 50], [8, 50],
  // 01010011x
  [8, 51], [8, 51],
  // 01010100x
  [8, 52], [8, 52],
  // 01010101x
  [7, 25], [7, 25], [7, 25], [7, 25],
  // 0101011xx
  [8, 55], [8, 55],
  // 01011000x
  [8, 56], [8, 56],
  // 01011001x
  [8, 57], [8, 57],
  // 01011010x
  [8, 58], [8, 58],
  // 01011011x
  [6, 192], [6, 192], [6, 192], [6, 192],
  // 010111xxx
  [6, 192], [6, 192], [6, 192], [6, 192], [6, 1664], [6, 1664], [6, 1664], [6, 1664],
  // 011000xxx
  [6, 1664], [6, 1664], [6, 1664], [6, 1664], [8, 448], [8, 448],
  // 01100100x
  [8, 512], [8, 512],
  // 01100101x
  [9, 704],
  // 011001100
  [9, 768],
  // 011001101
  [8, 640], [8, 640],
  // 01100111x
  [8, 576], [8, 576],
  // 01101000x
  [9, 832],
  // 011010010
  [9, 896],
  // 011010011
  [9, 960],
  // 011010100
  [9, 1024],
  // 011010101
  [9, 1088],
  // 011010110
  [9, 1152],
  // 011010111
  [9, 1216],
  // 011011000
  [9, 1280],
  // 011011001
  [9, 1344],
  // 011011010
  [9, 1408],
  // 011011011
  [7, 256], [7, 256], [7, 256], [7, 256],
  // 0110111xx
  [4, 2], [4, 2], [4, 2], [4, 2],
  // 0111xxxxx
  [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 3], [4, 3], [4, 3], [4, 3],
  // 1000xxxxx
  [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [5, 128], [5, 128], [5, 128], [5, 128],
  // 10010xxxx
  [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 8], [5, 8], [5, 8], [5, 8],
  // 10011xxxx
  [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 9], [5, 9], [5, 9], [5, 9],
  // 10100xxxx
  [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [6, 16], [6, 16], [6, 16], [6, 16],
  // 101010xxx
  [6, 16], [6, 16], [6, 16], [6, 16], [6, 17], [6, 17], [6, 17], [6, 17],
  // 101011xxx
  [6, 17], [6, 17], [6, 17], [6, 17], [4, 4], [4, 4], [4, 4], [4, 4],
  // 1011xxxxx
  [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 5], [4, 5], [4, 5], [4, 5],
  // 1100xxxxx
  [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [6, 14], [6, 14], [6, 14], [6, 14],
  // 110100xxx
  [6, 14], [6, 14], [6, 14], [6, 14], [6, 15], [6, 15], [6, 15], [6, 15],
  // 110101xxx
  [6, 15], [6, 15], [6, 15], [6, 15], [5, 64], [5, 64], [5, 64], [5, 64],
  // 11011xxxx
  [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [4, 6], [4, 6], [4, 6], [4, 6],
  // 1110xxxxx
  [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 7], [4, 7], [4, 7], [4, 7],
  // 1111xxxxx
  [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7]];

  // prettier-ignore
  var blackTable1 = [[-1, -1], [-1, -1],
  // 000000000000x
  [12, ccittEOL], [12, ccittEOL],
  // 000000000001x
  [-1, -1], [-1, -1], [-1, -1], [-1, -1],
  // 00000000001xx
  [-1, -1], [-1, -1], [-1, -1], [-1, -1],
  // 00000000010xx
  [-1, -1], [-1, -1], [-1, -1], [-1, -1],
  // 00000000011xx
  [-1, -1], [-1, -1], [-1, -1], [-1, -1],
  // 00000000100xx
  [-1, -1], [-1, -1], [-1, -1], [-1, -1],
  // 00000000101xx
  [-1, -1], [-1, -1], [-1, -1], [-1, -1],
  // 00000000110xx
  [-1, -1], [-1, -1], [-1, -1], [-1, -1],
  // 00000000111xx
  [11, 1792], [11, 1792], [11, 1792], [11, 1792],
  // 00000001000xx
  [12, 1984], [12, 1984],
  // 000000010010x
  [12, 2048], [12, 2048],
  // 000000010011x
  [12, 2112], [12, 2112],
  // 000000010100x
  [12, 2176], [12, 2176],
  // 000000010101x
  [12, 2240], [12, 2240],
  // 000000010110x
  [12, 2304], [12, 2304],
  // 000000010111x
  [11, 1856], [11, 1856], [11, 1856], [11, 1856],
  // 00000001100xx
  [11, 1920], [11, 1920], [11, 1920], [11, 1920],
  // 00000001101xx
  [12, 2368], [12, 2368],
  // 000000011100x
  [12, 2432], [12, 2432],
  // 000000011101x
  [12, 2496], [12, 2496],
  // 000000011110x
  [12, 2560], [12, 2560],
  // 000000011111x
  [10, 18], [10, 18], [10, 18], [10, 18],
  // 0000001000xxx
  [10, 18], [10, 18], [10, 18], [10, 18], [12, 52], [12, 52],
  // 000000100100x
  [13, 640],
  // 0000001001010
  [13, 704],
  // 0000001001011
  [13, 768],
  // 0000001001100
  [13, 832],
  // 0000001001101
  [12, 55], [12, 55],
  // 000000100111x
  [12, 56], [12, 56],
  // 000000101000x
  [13, 1280],
  // 0000001010010
  [13, 1344],
  // 0000001010011
  [13, 1408],
  // 0000001010100
  [13, 1472],
  // 0000001010101
  [12, 59], [12, 59],
  // 000000101011x
  [12, 60], [12, 60],
  // 000000101100x
  [13, 1536],
  // 0000001011010
  [13, 1600],
  // 0000001011011
  [11, 24], [11, 24], [11, 24], [11, 24],
  // 00000010111xx
  [11, 25], [11, 25], [11, 25], [11, 25],
  // 00000011000xx
  [13, 1664],
  // 0000001100100
  [13, 1728],
  // 0000001100101
  [12, 320], [12, 320],
  // 000000110011x
  [12, 384], [12, 384],
  // 000000110100x
  [12, 448], [12, 448],
  // 000000110101x
  [13, 512],
  // 0000001101100
  [13, 576],
  // 0000001101101
  [12, 53], [12, 53],
  // 000000110111x
  [12, 54], [12, 54],
  // 000000111000x
  [13, 896],
  // 0000001110010
  [13, 960],
  // 0000001110011
  [13, 1024],
  // 0000001110100
  [13, 1088],
  // 0000001110101
  [13, 1152],
  // 0000001110110
  [13, 1216],
  // 0000001110111
  [10, 64], [10, 64], [10, 64], [10, 64],
  // 0000001111xxx
  [10, 64], [10, 64], [10, 64], [10, 64]];

  // prettier-ignore
  var blackTable2 = [[8, 13], [8, 13], [8, 13], [8, 13],
  // 00000100xxxx
  [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [11, 23], [11, 23],
  // 00000101000x
  [12, 50],
  // 000001010010
  [12, 51],
  // 000001010011
  [12, 44],
  // 000001010100
  [12, 45],
  // 000001010101
  [12, 46],
  // 000001010110
  [12, 47],
  // 000001010111
  [12, 57],
  // 000001011000
  [12, 58],
  // 000001011001
  [12, 61],
  // 000001011010
  [12, 256],
  // 000001011011
  [10, 16], [10, 16], [10, 16], [10, 16],
  // 0000010111xx
  [10, 17], [10, 17], [10, 17], [10, 17],
  // 0000011000xx
  [12, 48],
  // 000001100100
  [12, 49],
  // 000001100101
  [12, 62],
  // 000001100110
  [12, 63],
  // 000001100111
  [12, 30],
  // 000001101000
  [12, 31],
  // 000001101001
  [12, 32],
  // 000001101010
  [12, 33],
  // 000001101011
  [12, 40],
  // 000001101100
  [12, 41],
  // 000001101101
  [11, 22], [11, 22],
  // 00000110111x
  [8, 14], [8, 14], [8, 14], [8, 14],
  // 00000111xxxx
  [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [7, 10], [7, 10], [7, 10], [7, 10],
  // 0000100xxxxx
  [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 11], [7, 11], [7, 11], [7, 11],
  // 0000101xxxxx
  [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [9, 15], [9, 15], [9, 15], [9, 15],
  // 000011000xxx
  [9, 15], [9, 15], [9, 15], [9, 15], [12, 128],
  // 000011001000
  [12, 192],
  // 000011001001
  [12, 26],
  // 000011001010
  [12, 27],
  // 000011001011
  [12, 28],
  // 000011001100
  [12, 29],
  // 000011001101
  [11, 19], [11, 19],
  // 00001100111x
  [11, 20], [11, 20],
  // 00001101000x
  [12, 34],
  // 000011010010
  [12, 35],
  // 000011010011
  [12, 36],
  // 000011010100
  [12, 37],
  // 000011010101
  [12, 38],
  // 000011010110
  [12, 39],
  // 000011010111
  [11, 21], [11, 21],
  // 00001101100x
  [12, 42],
  // 000011011010
  [12, 43],
  // 000011011011
  [10, 0], [10, 0], [10, 0], [10, 0],
  // 0000110111xx
  [7, 12], [7, 12], [7, 12], [7, 12],
  // 0000111xxxxx
  [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12]];

  // prettier-ignore
  var blackTable3 = [[-1, -1], [-1, -1], [-1, -1], [-1, -1],
  // 0000xx
  [6, 9],
  // 000100
  [6, 8],
  // 000101
  [5, 7], [5, 7],
  // 00011x
  [4, 6], [4, 6], [4, 6], [4, 6],
  // 0010xx
  [4, 5], [4, 5], [4, 5], [4, 5],
  // 0011xx
  [3, 1], [3, 1], [3, 1], [3, 1],
  // 010xxx
  [3, 1], [3, 1], [3, 1], [3, 1], [3, 4], [3, 4], [3, 4], [3, 4],
  // 011xxx
  [3, 4], [3, 4], [3, 4], [3, 4], [2, 3], [2, 3], [2, 3], [2, 3],
  // 10xxxx
  [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 2], [2, 2], [2, 2], [2, 2],
  // 11xxxx
  [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2]];

  /**
   * @param {CCITTFaxDecoderSource} source - The data which should be decoded.
   * @param {Object} [options] - Decoding options.
   */
  // eslint-disable-next-line no-shadow
  function CCITTFaxDecoder(source) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!source || typeof source.next !== "function") {
      throw new Error('CCITTFaxDecoder - invalid "source" parameter.');
    }
    this.source = source;
    this.eof = false;
    this.encoding = options.K || 0;
    this.eoline = options.EndOfLine || false;
    this.byteAlign = options.EncodedByteAlign || false;
    this.columns = options.Columns || 1728;
    this.rows = options.Rows || 0;
    var eoblock = options.EndOfBlock;
    if (eoblock === null || eoblock === undefined) {
      eoblock = true;
    }
    this.eoblock = eoblock;
    this.black = options.BlackIs1 || false;
    this.codingLine = new Uint32Array(this.columns + 1);
    this.refLine = new Uint32Array(this.columns + 2);
    this.codingLine[0] = this.columns;
    this.codingPos = 0;
    this.row = 0;
    this.nextLine2D = this.encoding < 0;
    this.inputBits = 0;
    this.inputBuf = 0;
    this.outputBits = 0;
    this.rowsDone = false;
    var code1;
    while ((code1 = this._lookBits(12)) === 0) {
      this._eatBits(1);
    }
    if (code1 === 1) {
      this._eatBits(12);
    }
    if (this.encoding > 0) {
      this.nextLine2D = !this._lookBits(1);
      this._eatBits(1);
    }
  }
  CCITTFaxDecoder.prototype = {
    readNextChar: function readNextChar() {
      if (this.eof) {
        return -1;
      }
      var refLine = this.refLine;
      var codingLine = this.codingLine;
      var columns = this.columns;
      var refPos, blackPixels, bits, i;
      if (this.outputBits === 0) {
        if (this.rowsDone) {
          this.eof = true;
        }
        if (this.eof) {
          return -1;
        }
        this.err = false;
        var code1, code2, code3;
        if (this.nextLine2D) {
          for (i = 0; codingLine[i] < columns; ++i) {
            refLine[i] = codingLine[i];
          }
          refLine[i++] = columns;
          refLine[i] = columns;
          codingLine[0] = 0;
          this.codingPos = 0;
          refPos = 0;
          blackPixels = 0;
          while (codingLine[this.codingPos] < columns) {
            code1 = this._getTwoDimCode();
            switch (code1) {
              case twoDimPass:
                this._addPixels(refLine[refPos + 1], blackPixels);
                if (refLine[refPos + 1] < columns) {
                  refPos += 2;
                }
                break;
              case twoDimHoriz:
                code1 = code2 = 0;
                if (blackPixels) {
                  do {
                    code1 += code3 = this._getBlackCode();
                  } while (code3 >= 64);
                  do {
                    code2 += code3 = this._getWhiteCode();
                  } while (code3 >= 64);
                } else {
                  do {
                    code1 += code3 = this._getWhiteCode();
                  } while (code3 >= 64);
                  do {
                    code2 += code3 = this._getBlackCode();
                  } while (code3 >= 64);
                }
                this._addPixels(codingLine[this.codingPos] + code1, blackPixels);
                if (codingLine[this.codingPos] < columns) {
                  this._addPixels(codingLine[this.codingPos] + code2, blackPixels ^ 1);
                }
                while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                  refPos += 2;
                }
                break;
              case twoDimVertR3:
                this._addPixels(refLine[refPos] + 3, blackPixels);
                blackPixels ^= 1;
                if (codingLine[this.codingPos] < columns) {
                  ++refPos;
                  while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                    refPos += 2;
                  }
                }
                break;
              case twoDimVertR2:
                this._addPixels(refLine[refPos] + 2, blackPixels);
                blackPixels ^= 1;
                if (codingLine[this.codingPos] < columns) {
                  ++refPos;
                  while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                    refPos += 2;
                  }
                }
                break;
              case twoDimVertR1:
                this._addPixels(refLine[refPos] + 1, blackPixels);
                blackPixels ^= 1;
                if (codingLine[this.codingPos] < columns) {
                  ++refPos;
                  while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                    refPos += 2;
                  }
                }
                break;
              case twoDimVert0:
                this._addPixels(refLine[refPos], blackPixels);
                blackPixels ^= 1;
                if (codingLine[this.codingPos] < columns) {
                  ++refPos;
                  while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                    refPos += 2;
                  }
                }
                break;
              case twoDimVertL3:
                this._addPixelsNeg(refLine[refPos] - 3, blackPixels);
                blackPixels ^= 1;
                if (codingLine[this.codingPos] < columns) {
                  if (refPos > 0) {
                    --refPos;
                  } else {
                    ++refPos;
                  }
                  while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                    refPos += 2;
                  }
                }
                break;
              case twoDimVertL2:
                this._addPixelsNeg(refLine[refPos] - 2, blackPixels);
                blackPixels ^= 1;
                if (codingLine[this.codingPos] < columns) {
                  if (refPos > 0) {
                    --refPos;
                  } else {
                    ++refPos;
                  }
                  while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                    refPos += 2;
                  }
                }
                break;
              case twoDimVertL1:
                this._addPixelsNeg(refLine[refPos] - 1, blackPixels);
                blackPixels ^= 1;
                if (codingLine[this.codingPos] < columns) {
                  if (refPos > 0) {
                    --refPos;
                  } else {
                    ++refPos;
                  }
                  while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                    refPos += 2;
                  }
                }
                break;
              case ccittEOF:
                this._addPixels(columns, 0);
                this.eof = true;
                break;
              default:
                this._addPixels(columns, 0);
                this.err = true;
            }
          }
        } else {
          codingLine[0] = 0;
          this.codingPos = 0;
          blackPixels = 0;
          while (codingLine[this.codingPos] < columns) {
            code1 = 0;
            if (blackPixels) {
              do {
                code1 += code3 = this._getBlackCode();
              } while (code3 >= 64);
            } else {
              do {
                code1 += code3 = this._getWhiteCode();
              } while (code3 >= 64);
            }
            this._addPixels(codingLine[this.codingPos] + code1, blackPixels);
            blackPixels ^= 1;
          }
        }
        var gotEOL = false;
        if (this.byteAlign) {
          this.inputBits &= ~7;
        }
        if (!this.eoblock && this.row === this.rows - 1) {
          this.rowsDone = true;
        } else {
          code1 = this._lookBits(12);
          if (this.eoline) {
            while (code1 !== ccittEOF && code1 !== 1) {
              this._eatBits(1);
              code1 = this._lookBits(12);
            }
          } else {
            while (code1 === 0) {
              this._eatBits(1);
              code1 = this._lookBits(12);
            }
          }
          if (code1 === 1) {
            this._eatBits(12);
            gotEOL = true;
          } else if (code1 === ccittEOF) {
            this.eof = true;
          }
        }
        if (!this.eof && this.encoding > 0 && !this.rowsDone) {
          this.nextLine2D = !this._lookBits(1);
          this._eatBits(1);
        }
        if (this.eoblock && gotEOL && this.byteAlign) {
          code1 = this._lookBits(12);
          if (code1 === 1) {
            this._eatBits(12);
            if (this.encoding > 0) {
              this._lookBits(1);
              this._eatBits(1);
            }
            if (this.encoding >= 0) {
              for (i = 0; i < 4; ++i) {
                code1 = this._lookBits(12);
                this._eatBits(12);
                if (this.encoding > 0) {
                  this._lookBits(1);
                  this._eatBits(1);
                }
              }
            }
            this.eof = true;
          }
        } else if (this.err && this.eoline) {
          while (true) {
            code1 = this._lookBits(13);
            if (code1 === ccittEOF) {
              this.eof = true;
              return -1;
            }
            if (code1 >> 1 === 1) {
              break;
            }
            this._eatBits(1);
          }
          this._eatBits(12);
          if (this.encoding > 0) {
            this._eatBits(1);
            this.nextLine2D = !(code1 & 1);
          }
        }
        if (codingLine[0] > 0) {
          this.outputBits = codingLine[this.codingPos = 0];
        } else {
          this.outputBits = codingLine[this.codingPos = 1];
        }
        this.row++;
      }
      var c;
      if (this.outputBits >= 8) {
        c = this.codingPos & 1 ? 0 : 0xff;
        this.outputBits -= 8;
        if (this.outputBits === 0 && codingLine[this.codingPos] < columns) {
          this.codingPos++;
          this.outputBits = codingLine[this.codingPos] - codingLine[this.codingPos - 1];
        }
      } else {
        bits = 8;
        c = 0;
        do {
          if (this.outputBits > bits) {
            c <<= bits;
            if (!(this.codingPos & 1)) {
              c |= 0xff >> 8 - bits;
            }
            this.outputBits -= bits;
            bits = 0;
          } else {
            c <<= this.outputBits;
            if (!(this.codingPos & 1)) {
              c |= 0xff >> 8 - this.outputBits;
            }
            bits -= this.outputBits;
            this.outputBits = 0;
            if (codingLine[this.codingPos] < columns) {
              this.codingPos++;
              this.outputBits = codingLine[this.codingPos] - codingLine[this.codingPos - 1];
            } else if (bits > 0) {
              c <<= bits;
              bits = 0;
            }
          }
        } while (bits);
      }
      if (this.black) {
        c ^= 0xff;
      }
      return c;
    },
    /**
     * @private
     */
    _addPixels: function _addPixels(a1, blackPixels) {
      var codingLine = this.codingLine;
      var codingPos = this.codingPos;
      if (a1 > codingLine[codingPos]) {
        if (a1 > this.columns) {
          this.err = true;
          a1 = this.columns;
        }
        if (codingPos & 1 ^ blackPixels) {
          ++codingPos;
        }
        codingLine[codingPos] = a1;
      }
      this.codingPos = codingPos;
    },
    /**
     * @private
     */
    _addPixelsNeg: function _addPixelsNeg(a1, blackPixels) {
      var codingLine = this.codingLine;
      var codingPos = this.codingPos;
      if (a1 > codingLine[codingPos]) {
        if (a1 > this.columns) {
          this.err = true;
          a1 = this.columns;
        }
        if (codingPos & 1 ^ blackPixels) {
          ++codingPos;
        }
        codingLine[codingPos] = a1;
      } else if (a1 < codingLine[codingPos]) {
        if (a1 < 0) {
          this.err = true;
          a1 = 0;
        }
        while (codingPos > 0 && a1 < codingLine[codingPos - 1]) {
          --codingPos;
        }
        codingLine[codingPos] = a1;
      }
      this.codingPos = codingPos;
    },
    /**
     * This function returns the code found from the table.
     * The start and end parameters set the boundaries for searching the table.
     * The limit parameter is optional. Function returns an array with three
     * values. The first array element indicates whether a valid code is being
     * returned. The second array element is the actual code. The third array
     * element indicates whether EOF was reached.
     * @private
     */
    _findTableCode: function _findTableCode(start, end, table, limit) {
      var limitValue = limit || 0;
      for (var i = start; i <= end; ++i) {
        var code = this._lookBits(i);
        if (code === ccittEOF) {
          return [true, 1, false];
        }
        if (i < end) {
          code <<= end - i;
        }
        if (!limitValue || code >= limitValue) {
          var p = table[code - limitValue];
          if (p[0] === i) {
            this._eatBits(i);
            return [true, p[1], true];
          }
        }
      }
      return [false, 0, false];
    },
    /**
     * @private
     */
    _getTwoDimCode: function _getTwoDimCode() {
      var code = 0;
      var p;
      if (this.eoblock) {
        code = this._lookBits(7);
        p = twoDimTable[code];
        if (p && p[0] > 0) {
          this._eatBits(p[0]);
          return p[1];
        }
      } else {
        var result = this._findTableCode(1, 7, twoDimTable);
        if (result[0] && result[2]) {
          return result[1];
        }
      }
      return ccittEOF;
    },
    /**
     * @private
     */
    _getWhiteCode: function _getWhiteCode() {
      var code = 0;
      var p;
      if (this.eoblock) {
        code = this._lookBits(12);
        if (code === ccittEOF) {
          return 1;
        }
        if (code >> 5 === 0) {
          p = whiteTable1[code];
        } else {
          p = whiteTable2[code >> 3];
        }
        if (p[0] > 0) {
          this._eatBits(p[0]);
          return p[1];
        }
      } else {
        var result = this._findTableCode(1, 9, whiteTable2);
        if (result[0]) {
          return result[1];
        }
        result = this._findTableCode(11, 12, whiteTable1);
        if (result[0]) {
          return result[1];
        }
      }
      this._eatBits(1);
      return 1;
    },
    /**
     * @private
     */
    _getBlackCode: function _getBlackCode() {
      var code, p;
      if (this.eoblock) {
        code = this._lookBits(13);
        if (code === ccittEOF) {
          return 1;
        }
        if (code >> 7 === 0) {
          p = blackTable1[code];
        } else if (code >> 9 === 0 && code >> 7 !== 0) {
          p = blackTable2[(code >> 1) - 64];
        } else {
          p = blackTable3[code >> 7];
        }
        if (p[0] > 0) {
          this._eatBits(p[0]);
          return p[1];
        }
      } else {
        var result = this._findTableCode(2, 6, blackTable3);
        if (result[0]) {
          return result[1];
        }
        result = this._findTableCode(7, 12, blackTable2, 64);
        if (result[0]) {
          return result[1];
        }
        result = this._findTableCode(10, 13, blackTable1);
        if (result[0]) {
          return result[1];
        }
      }
      this._eatBits(1);
      return 1;
    },
    /**
     * @private
     */
    _lookBits: function _lookBits(n) {
      var c;
      while (this.inputBits < n) {
        if ((c = this.source.next()) === -1) {
          if (this.inputBits === 0) {
            return ccittEOF;
          }
          return this.inputBuf << n - this.inputBits & 0xffff >> 16 - n;
        }
        this.inputBuf = this.inputBuf << 8 | c;
        this.inputBits += 8;
      }
      return this.inputBuf >> this.inputBits - n & 0xffff >> 16 - n;
    },
    /**
     * @private
     */
    _eatBits: function _eatBits(n) {
      if ((this.inputBits -= n) < 0) {
        this.inputBits = 0;
      }
    }
  };
  return CCITTFaxDecoder;
}();

var Jbig2Error = /*#__PURE__*/function (_BaseException) {
  _inherits(Jbig2Error, _BaseException);
  var _super = _createSuper(Jbig2Error);
  function Jbig2Error(msg) {
    _classCallCheck(this, Jbig2Error);
    return _super.call(this, "JBIG2 error: ".concat(msg));
  }
  return _createClass(Jbig2Error);
}(BaseException);
var Jbig2Image = function Jbig2ImageClosure() {
  // Utility data structures
  function ContextCache() {}
  ContextCache.prototype = {
    getContexts: function getContexts(id) {
      if (id in this) {
        return this[id];
      }
      return this[id] = new Int8Array(1 << 16);
    }
  };
  function DecodingContext(data, start, end) {
    this.data = data;
    this.start = start;
    this.end = end;
  }
  DecodingContext.prototype = {
    get decoder() {
      var decoder = new ArithmeticDecoder(this.data, this.start, this.end);
      return shadow(this, "decoder", decoder);
    },
    get contextCache() {
      var cache = new ContextCache();
      return shadow(this, "contextCache", cache);
    }
  };

  // Annex A. Arithmetic Integer Decoding Procedure
  // A.2 Procedure for decoding values
  function decodeInteger(contextCache, procedure, decoder) {
    var contexts = contextCache.getContexts(procedure);
    var prev = 1;
    function readBits(length) {
      var v = 0;
      for (var i = 0; i < length; i++) {
        var bit = decoder.readBit(contexts, prev);
        prev = prev < 256 ? prev << 1 | bit : (prev << 1 | bit) & 511 | 256;
        v = v << 1 | bit;
      }
      return v >>> 0;
    }
    var sign = readBits(1);
    // prettier-ignore
    /* eslint-disable no-nested-ternary */
    var value = readBits(1) ? readBits(1) ? readBits(1) ? readBits(1) ? readBits(1) ? readBits(32) + 4436 : readBits(12) + 340 : readBits(8) + 84 : readBits(6) + 20 : readBits(4) + 4 : readBits(2);
    /* eslint-enable no-nested-ternary */
    if (sign === 0) {
      return value;
    } else if (value > 0) {
      return -value;
    }
    return null;
  }

  // A.3 The IAID decoding procedure
  function decodeIAID(contextCache, decoder, codeLength) {
    var contexts = contextCache.getContexts("IAID");
    var prev = 1;
    for (var i = 0; i < codeLength; i++) {
      var bit = decoder.readBit(contexts, prev);
      prev = prev << 1 | bit;
    }
    if (codeLength < 31) {
      return prev & (1 << codeLength) - 1;
    }
    return prev & 0x7fffffff;
  }

  // 7.3 Segment types
  var SegmentTypes = ["SymbolDictionary", null, null, null, "IntermediateTextRegion", null, "ImmediateTextRegion", "ImmediateLosslessTextRegion", null, null, null, null, null, null, null, null, "PatternDictionary", null, null, null, "IntermediateHalftoneRegion", null, "ImmediateHalftoneRegion", "ImmediateLosslessHalftoneRegion", null, null, null, null, null, null, null, null, null, null, null, null, "IntermediateGenericRegion", null, "ImmediateGenericRegion", "ImmediateLosslessGenericRegion", "IntermediateGenericRefinementRegion", null, "ImmediateGenericRefinementRegion", "ImmediateLosslessGenericRefinementRegion", null, null, null, null, "PageInformation", "EndOfPage", "EndOfStripe", "EndOfFile", "Profiles", "Tables", null, null, null, null, null, null, null, null, "Extension"];
  var CodingTemplates = [[{
    x: -1,
    y: -2
  }, {
    x: 0,
    y: -2
  }, {
    x: 1,
    y: -2
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: 2,
    y: -1
  }, {
    x: -4,
    y: 0
  }, {
    x: -3,
    y: 0
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }], [{
    x: -1,
    y: -2
  }, {
    x: 0,
    y: -2
  }, {
    x: 1,
    y: -2
  }, {
    x: 2,
    y: -2
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: 2,
    y: -1
  }, {
    x: -3,
    y: 0
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }], [{
    x: -1,
    y: -2
  }, {
    x: 0,
    y: -2
  }, {
    x: 1,
    y: -2
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }], [{
    x: -3,
    y: -1
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: -4,
    y: 0
  }, {
    x: -3,
    y: 0
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }]];
  var RefinementTemplates = [{
    coding: [{
      x: 0,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: -1,
      y: 0
    }],
    reference: [{
      x: 0,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: -1,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: -1,
      y: 1
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }]
  }, {
    coding: [{
      x: -1,
      y: -1
    }, {
      x: 0,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: -1,
      y: 0
    }],
    reference: [{
      x: 0,
      y: -1
    }, {
      x: -1,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }]
  }];

  // See 6.2.5.7 Decoding the bitmap.
  var ReusedContexts = [0x9b25,
  // 10011 0110010 0101
  0x0795,
  // 0011 110010 101
  0x00e5,
  // 001 11001 01
  0x0195 // 011001 0101
  ];

  var RefinementReusedContexts = [0x0020,
  // '000' + '0' (coding) + '00010000' + '0' (reference)
  0x0008 // '0000' + '001000'
  ];

  function decodeBitmapTemplate0(width, height, decodingContext) {
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts("GB");
    var contextLabel,
      i,
      j,
      pixel,
      row,
      row1,
      row2,
      bitmap = [];

    // ...ooooo....
    // ..ooooooo... Context template for current pixel (X)
    // .ooooX...... (concatenate values of 'o'-pixels to get contextLabel)
    var OLD_PIXEL_MASK = 0x7bf7; // 01111 0111111 0111

    for (i = 0; i < height; i++) {
      row = bitmap[i] = new Uint8Array(width);
      row1 = i < 1 ? row : bitmap[i - 1];
      row2 = i < 2 ? row : bitmap[i - 2];

      // At the beginning of each row:
      // Fill contextLabel with pixels that are above/right of (X)
      contextLabel = row2[0] << 13 | row2[1] << 12 | row2[2] << 11 | row1[0] << 7 | row1[1] << 6 | row1[2] << 5 | row1[3] << 4;
      for (j = 0; j < width; j++) {
        row[j] = pixel = decoder.readBit(contexts, contextLabel);

        // At each pixel: Clear contextLabel pixels that are shifted
        // out of the context, then add new ones.
        contextLabel = (contextLabel & OLD_PIXEL_MASK) << 1 | (j + 3 < width ? row2[j + 3] << 11 : 0) | (j + 4 < width ? row1[j + 4] << 4 : 0) | pixel;
      }
    }
    return bitmap;
  }

  // 6.2 Generic Region Decoding Procedure
  function decodeBitmap(mmr, width, height, templateIndex, prediction, skip, at, decodingContext) {
    if (mmr) {
      var input = new Reader(decodingContext.data, decodingContext.start, decodingContext.end);
      return decodeMMRBitmap(input, width, height, false);
    }

    // Use optimized version for the most common case
    if (templateIndex === 0 && !skip && !prediction && at.length === 4 && at[0].x === 3 && at[0].y === -1 && at[1].x === -3 && at[1].y === -1 && at[2].x === 2 && at[2].y === -2 && at[3].x === -2 && at[3].y === -2) {
      return decodeBitmapTemplate0(width, height, decodingContext);
    }
    var useskip = !!skip;
    var template = CodingTemplates[templateIndex].concat(at);

    // Sorting is non-standard, and it is not required. But sorting increases
    // the number of template bits that can be reused from the previous
    // contextLabel in the main loop.
    template.sort(function (a, b) {
      return a.y - b.y || a.x - b.x;
    });
    var templateLength = template.length;
    var templateX = new Int8Array(templateLength);
    var templateY = new Int8Array(templateLength);
    var changingTemplateEntries = [];
    var reuseMask = 0,
      minX = 0,
      maxX = 0,
      minY = 0;
    var c, k;
    for (k = 0; k < templateLength; k++) {
      templateX[k] = template[k].x;
      templateY[k] = template[k].y;
      minX = Math.min(minX, template[k].x);
      maxX = Math.max(maxX, template[k].x);
      minY = Math.min(minY, template[k].y);
      // Check if the template pixel appears in two consecutive context labels,
      // so it can be reused. Otherwise, we add it to the list of changing
      // template entries.
      if (k < templateLength - 1 && template[k].y === template[k + 1].y && template[k].x === template[k + 1].x - 1) {
        reuseMask |= 1 << templateLength - 1 - k;
      } else {
        changingTemplateEntries.push(k);
      }
    }
    var changingEntriesLength = changingTemplateEntries.length;
    var changingTemplateX = new Int8Array(changingEntriesLength);
    var changingTemplateY = new Int8Array(changingEntriesLength);
    var changingTemplateBit = new Uint16Array(changingEntriesLength);
    for (c = 0; c < changingEntriesLength; c++) {
      k = changingTemplateEntries[c];
      changingTemplateX[c] = template[k].x;
      changingTemplateY[c] = template[k].y;
      changingTemplateBit[c] = 1 << templateLength - 1 - k;
    }

    // Get the safe bounding box edges from the width, height, minX, maxX, minY
    var sbb_left = -minX;
    var sbb_top = -minY;
    var sbb_right = width - maxX;
    var pseudoPixelContext = ReusedContexts[templateIndex];
    var row = new Uint8Array(width);
    var bitmap = [];
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts("GB");
    var ltp = 0,
      j,
      i0,
      j0,
      contextLabel = 0,
      bit,
      shift;
    for (var i = 0; i < height; i++) {
      if (prediction) {
        var sltp = decoder.readBit(contexts, pseudoPixelContext);
        ltp ^= sltp;
        if (ltp) {
          bitmap.push(row); // duplicate previous row
          continue;
        }
      }
      row = new Uint8Array(row);
      bitmap.push(row);
      for (j = 0; j < width; j++) {
        if (useskip && skip[i][j]) {
          row[j] = 0;
          continue;
        }
        // Are we in the middle of a scanline, so we can reuse contextLabel
        // bits?
        if (j >= sbb_left && j < sbb_right && i >= sbb_top) {
          // If yes, we can just shift the bits that are reusable and only
          // fetch the remaining ones.
          contextLabel = contextLabel << 1 & reuseMask;
          for (k = 0; k < changingEntriesLength; k++) {
            i0 = i + changingTemplateY[k];
            j0 = j + changingTemplateX[k];
            bit = bitmap[i0][j0];
            if (bit) {
              bit = changingTemplateBit[k];
              contextLabel |= bit;
            }
          }
        } else {
          // compute the contextLabel from scratch
          contextLabel = 0;
          shift = templateLength - 1;
          for (k = 0; k < templateLength; k++, shift--) {
            j0 = j + templateX[k];
            if (j0 >= 0 && j0 < width) {
              i0 = i + templateY[k];
              if (i0 >= 0) {
                bit = bitmap[i0][j0];
                if (bit) {
                  contextLabel |= bit << shift;
                }
              }
            }
          }
        }
        var pixel = decoder.readBit(contexts, contextLabel);
        row[j] = pixel;
      }
    }
    return bitmap;
  }

  // 6.3.2 Generic Refinement Region Decoding Procedure
  function decodeRefinement(width, height, templateIndex, referenceBitmap, offsetX, offsetY, prediction, at, decodingContext) {
    var codingTemplate = RefinementTemplates[templateIndex].coding;
    if (templateIndex === 0) {
      codingTemplate = codingTemplate.concat([at[0]]);
    }
    var codingTemplateLength = codingTemplate.length;
    var codingTemplateX = new Int32Array(codingTemplateLength);
    var codingTemplateY = new Int32Array(codingTemplateLength);
    var k;
    for (k = 0; k < codingTemplateLength; k++) {
      codingTemplateX[k] = codingTemplate[k].x;
      codingTemplateY[k] = codingTemplate[k].y;
    }
    var referenceTemplate = RefinementTemplates[templateIndex].reference;
    if (templateIndex === 0) {
      referenceTemplate = referenceTemplate.concat([at[1]]);
    }
    var referenceTemplateLength = referenceTemplate.length;
    var referenceTemplateX = new Int32Array(referenceTemplateLength);
    var referenceTemplateY = new Int32Array(referenceTemplateLength);
    for (k = 0; k < referenceTemplateLength; k++) {
      referenceTemplateX[k] = referenceTemplate[k].x;
      referenceTemplateY[k] = referenceTemplate[k].y;
    }
    var referenceWidth = referenceBitmap[0].length;
    var referenceHeight = referenceBitmap.length;
    var pseudoPixelContext = RefinementReusedContexts[templateIndex];
    var bitmap = [];
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts("GR");
    var ltp = 0;
    for (var i = 0; i < height; i++) {
      if (prediction) {
        var sltp = decoder.readBit(contexts, pseudoPixelContext);
        ltp ^= sltp;
        if (ltp) {
          throw new Jbig2Error("prediction is not supported");
        }
      }
      var row = new Uint8Array(width);
      bitmap.push(row);
      for (var j = 0; j < width; j++) {
        var i0, j0;
        var contextLabel = 0;
        for (k = 0; k < codingTemplateLength; k++) {
          i0 = i + codingTemplateY[k];
          j0 = j + codingTemplateX[k];
          if (i0 < 0 || j0 < 0 || j0 >= width) {
            contextLabel <<= 1; // out of bound pixel
          } else {
            contextLabel = contextLabel << 1 | bitmap[i0][j0];
          }
        }
        for (k = 0; k < referenceTemplateLength; k++) {
          i0 = i + referenceTemplateY[k] - offsetY;
          j0 = j + referenceTemplateX[k] - offsetX;
          if (i0 < 0 || i0 >= referenceHeight || j0 < 0 || j0 >= referenceWidth) {
            contextLabel <<= 1; // out of bound pixel
          } else {
            contextLabel = contextLabel << 1 | referenceBitmap[i0][j0];
          }
        }
        var pixel = decoder.readBit(contexts, contextLabel);
        row[j] = pixel;
      }
    }
    return bitmap;
  }

  // 6.5.5 Decoding the symbol dictionary
  function decodeSymbolDictionary(huffman, refinement, symbols, numberOfNewSymbols, numberOfExportedSymbols, huffmanTables, templateIndex, at, refinementTemplateIndex, refinementAt, decodingContext, huffmanInput) {
    if (huffman && refinement) {
      throw new Jbig2Error("symbol refinement with Huffman is not supported");
    }
    var newSymbols = [];
    var currentHeight = 0;
    var symbolCodeLength = log2(symbols.length + numberOfNewSymbols);
    var decoder = decodingContext.decoder;
    var contextCache = decodingContext.contextCache;
    var tableB1, symbolWidths;
    if (huffman) {
      tableB1 = getStandardTable(1); // standard table B.1
      symbolWidths = [];
      symbolCodeLength = Math.max(symbolCodeLength, 1); // 6.5.8.2.3
    }

    while (newSymbols.length < numberOfNewSymbols) {
      var deltaHeight = huffman ? huffmanTables.tableDeltaHeight.decode(huffmanInput) : decodeInteger(contextCache, "IADH", decoder); // 6.5.6
      currentHeight += deltaHeight;
      var currentWidth = 0,
        totalWidth = 0;
      var firstSymbol = huffman ? symbolWidths.length : 0;
      while (true) {
        var deltaWidth = huffman ? huffmanTables.tableDeltaWidth.decode(huffmanInput) : decodeInteger(contextCache, "IADW", decoder); // 6.5.7
        if (deltaWidth === null) {
          break; // OOB
        }

        currentWidth += deltaWidth;
        totalWidth += currentWidth;
        var bitmap;
        if (refinement) {
          // 6.5.8.2 Refinement/aggregate-coded symbol bitmap
          var numberOfInstances = decodeInteger(contextCache, "IAAI", decoder);
          if (numberOfInstances > 1) {
            bitmap = decodeTextRegion(huffman, refinement, currentWidth, currentHeight, 0, numberOfInstances, 1,
            // strip size
            symbols.concat(newSymbols), symbolCodeLength, 0,
            // transposed
            0,
            // ds offset
            1,
            // top left 7.4.3.1.1
            0,
            // OR operator
            huffmanTables, refinementTemplateIndex, refinementAt, decodingContext, 0, huffmanInput);
          } else {
            var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
            var rdx = decodeInteger(contextCache, "IARDX", decoder); // 6.4.11.3
            var rdy = decodeInteger(contextCache, "IARDY", decoder); // 6.4.11.4
            var symbol = symbolId < symbols.length ? symbols[symbolId] : newSymbols[symbolId - symbols.length];
            bitmap = decodeRefinement(currentWidth, currentHeight, refinementTemplateIndex, symbol, rdx, rdy, false, refinementAt, decodingContext);
          }
          newSymbols.push(bitmap);
        } else if (huffman) {
          // Store only symbol width and decode a collective bitmap when the
          // height class is done.
          symbolWidths.push(currentWidth);
        } else {
          // 6.5.8.1 Direct-coded symbol bitmap
          bitmap = decodeBitmap(false, currentWidth, currentHeight, templateIndex, false, null, at, decodingContext);
          newSymbols.push(bitmap);
        }
      }
      if (huffman && !refinement) {
        // 6.5.9 Height class collective bitmap
        var bitmapSize = huffmanTables.tableBitmapSize.decode(huffmanInput);
        huffmanInput.byteAlign();
        var collectiveBitmap = void 0;
        if (bitmapSize === 0) {
          // Uncompressed collective bitmap
          collectiveBitmap = readUncompressedBitmap(huffmanInput, totalWidth, currentHeight);
        } else {
          // MMR collective bitmap
          var originalEnd = huffmanInput.end;
          var bitmapEnd = huffmanInput.position + bitmapSize;
          huffmanInput.end = bitmapEnd;
          collectiveBitmap = decodeMMRBitmap(huffmanInput, totalWidth, currentHeight, false);
          huffmanInput.end = originalEnd;
          huffmanInput.position = bitmapEnd;
        }
        var numberOfSymbolsDecoded = symbolWidths.length;
        if (firstSymbol === numberOfSymbolsDecoded - 1) {
          // collectiveBitmap is a single symbol.
          newSymbols.push(collectiveBitmap);
        } else {
          // Divide collectiveBitmap into symbols.
          var _i = void 0,
            y = void 0,
            xMin = 0,
            xMax = void 0,
            bitmapWidth = void 0,
            symbolBitmap = void 0;
          for (_i = firstSymbol; _i < numberOfSymbolsDecoded; _i++) {
            bitmapWidth = symbolWidths[_i];
            xMax = xMin + bitmapWidth;
            symbolBitmap = [];
            for (y = 0; y < currentHeight; y++) {
              symbolBitmap.push(collectiveBitmap[y].subarray(xMin, xMax));
            }
            newSymbols.push(symbolBitmap);
            xMin = xMax;
          }
        }
      }
    }

    // 6.5.10 Exported symbols
    var exportedSymbols = [];
    var flags = [],
      currentFlag = false;
    var totalSymbolsLength = symbols.length + numberOfNewSymbols;
    while (flags.length < totalSymbolsLength) {
      var runLength = huffman ? tableB1.decode(huffmanInput) : decodeInteger(contextCache, "IAEX", decoder);
      while (runLength--) {
        flags.push(currentFlag);
      }
      currentFlag = !currentFlag;
    }
    for (var i = 0, ii = symbols.length; i < ii; i++) {
      if (flags[i]) {
        exportedSymbols.push(symbols[i]);
      }
    }
    for (var j = 0; j < numberOfNewSymbols; i++, j++) {
      if (flags[i]) {
        exportedSymbols.push(newSymbols[j]);
      }
    }
    return exportedSymbols;
  }
  function decodeTextRegion(huffman, refinement, width, height, defaultPixelValue, numberOfSymbolInstances, stripSize, inputSymbols, symbolCodeLength, transposed, dsOffset, referenceCorner, combinationOperator, huffmanTables, refinementTemplateIndex, refinementAt, decodingContext, logStripSize, huffmanInput) {
    if (huffman && refinement) {
      throw new Jbig2Error("refinement with Huffman is not supported");
    }

    // Prepare bitmap
    var bitmap = [];
    var i, row;
    for (i = 0; i < height; i++) {
      row = new Uint8Array(width);
      if (defaultPixelValue) {
        for (var j = 0; j < width; j++) {
          row[j] = defaultPixelValue;
        }
      }
      bitmap.push(row);
    }
    var decoder = decodingContext.decoder;
    var contextCache = decodingContext.contextCache;
    var stripT = huffman ? -huffmanTables.tableDeltaT.decode(huffmanInput) : -decodeInteger(contextCache, "IADT", decoder); // 6.4.6
    var firstS = 0;
    i = 0;
    while (i < numberOfSymbolInstances) {
      var deltaT = huffman ? huffmanTables.tableDeltaT.decode(huffmanInput) : decodeInteger(contextCache, "IADT", decoder); // 6.4.6
      stripT += deltaT;
      var deltaFirstS = huffman ? huffmanTables.tableFirstS.decode(huffmanInput) : decodeInteger(contextCache, "IAFS", decoder); // 6.4.7
      firstS += deltaFirstS;
      var currentS = firstS;
      do {
        var currentT = 0; // 6.4.9
        if (stripSize > 1) {
          currentT = huffman ? huffmanInput.readBits(logStripSize) : decodeInteger(contextCache, "IAIT", decoder);
        }
        var t = stripSize * stripT + currentT;
        var symbolId = huffman ? huffmanTables.symbolIDTable.decode(huffmanInput) : decodeIAID(contextCache, decoder, symbolCodeLength);
        var applyRefinement = refinement && (huffman ? huffmanInput.readBit() : decodeInteger(contextCache, "IARI", decoder));
        var symbolBitmap = inputSymbols[symbolId];
        var symbolWidth = symbolBitmap[0].length;
        var symbolHeight = symbolBitmap.length;
        if (applyRefinement) {
          var rdw = decodeInteger(contextCache, "IARDW", decoder); // 6.4.11.1
          var rdh = decodeInteger(contextCache, "IARDH", decoder); // 6.4.11.2
          var rdx = decodeInteger(contextCache, "IARDX", decoder); // 6.4.11.3
          var rdy = decodeInteger(contextCache, "IARDY", decoder); // 6.4.11.4
          symbolWidth += rdw;
          symbolHeight += rdh;
          symbolBitmap = decodeRefinement(symbolWidth, symbolHeight, refinementTemplateIndex, symbolBitmap, (rdw >> 1) + rdx, (rdh >> 1) + rdy, false, refinementAt, decodingContext);
        }
        var offsetT = t - (referenceCorner & 1 ? 0 : symbolHeight - 1);
        var offsetS = currentS - (referenceCorner & 2 ? symbolWidth - 1 : 0);
        var s2, t2, symbolRow;
        if (transposed) {
          // Place Symbol Bitmap from T1,S1
          for (s2 = 0; s2 < symbolHeight; s2++) {
            row = bitmap[offsetS + s2];
            if (!row) {
              continue;
            }
            symbolRow = symbolBitmap[s2];
            // To ignore Parts of Symbol bitmap which goes
            // outside bitmap region
            var maxWidth = Math.min(width - offsetT, symbolWidth);
            switch (combinationOperator) {
              case 0:
                // OR
                for (t2 = 0; t2 < maxWidth; t2++) {
                  row[offsetT + t2] |= symbolRow[t2];
                }
                break;
              case 2:
                // XOR
                for (t2 = 0; t2 < maxWidth; t2++) {
                  row[offsetT + t2] ^= symbolRow[t2];
                }
                break;
              default:
                throw new Jbig2Error("operator ".concat(combinationOperator, " is not supported"));
            }
          }
          currentS += symbolHeight - 1;
        } else {
          for (t2 = 0; t2 < symbolHeight; t2++) {
            row = bitmap[offsetT + t2];
            if (!row) {
              continue;
            }
            symbolRow = symbolBitmap[t2];
            switch (combinationOperator) {
              case 0:
                // OR
                for (s2 = 0; s2 < symbolWidth; s2++) {
                  row[offsetS + s2] |= symbolRow[s2];
                }
                break;
              case 2:
                // XOR
                for (s2 = 0; s2 < symbolWidth; s2++) {
                  row[offsetS + s2] ^= symbolRow[s2];
                }
                break;
              default:
                throw new Jbig2Error("operator ".concat(combinationOperator, " is not supported"));
            }
          }
          currentS += symbolWidth - 1;
        }
        i++;
        var deltaS = huffman ? huffmanTables.tableDeltaS.decode(huffmanInput) : decodeInteger(contextCache, "IADS", decoder); // 6.4.8
        if (deltaS === null) {
          break; // OOB
        }

        currentS += deltaS + dsOffset;
      } while (true);
    }
    return bitmap;
  }
  function decodePatternDictionary(mmr, patternWidth, patternHeight, maxPatternIndex, template, decodingContext) {
    var at = [];
    if (!mmr) {
      at.push({
        x: -patternWidth,
        y: 0
      });
      if (template === 0) {
        at.push({
          x: -3,
          y: -1
        });
        at.push({
          x: 2,
          y: -2
        });
        at.push({
          x: -2,
          y: -2
        });
      }
    }
    var collectiveWidth = (maxPatternIndex + 1) * patternWidth;
    var collectiveBitmap = decodeBitmap(mmr, collectiveWidth, patternHeight, template, false, null, at, decodingContext);
    // Divide collective bitmap into patterns.
    var patterns = [];
    for (var i = 0; i <= maxPatternIndex; i++) {
      var patternBitmap = [];
      var xMin = patternWidth * i;
      var xMax = xMin + patternWidth;
      for (var y = 0; y < patternHeight; y++) {
        patternBitmap.push(collectiveBitmap[y].subarray(xMin, xMax));
      }
      patterns.push(patternBitmap);
    }
    return patterns;
  }
  function decodeHalftoneRegion(mmr, patterns, template, regionWidth, regionHeight, defaultPixelValue, enableSkip, combinationOperator, gridWidth, gridHeight, gridOffsetX, gridOffsetY, gridVectorX, gridVectorY, decodingContext) {
    var skip = null;
    if (enableSkip) {
      throw new Jbig2Error("skip is not supported");
    }
    if (combinationOperator !== 0) {
      throw new Jbig2Error("operator " + combinationOperator + " is not supported in halftone region");
    }

    // Prepare bitmap.
    var regionBitmap = [];
    var i, j, row;
    for (i = 0; i < regionHeight; i++) {
      row = new Uint8Array(regionWidth);
      if (defaultPixelValue) {
        for (j = 0; j < regionWidth; j++) {
          row[j] = defaultPixelValue;
        }
      }
      regionBitmap.push(row);
    }
    var numberOfPatterns = patterns.length;
    var pattern0 = patterns[0];
    var patternWidth = pattern0[0].length,
      patternHeight = pattern0.length;
    var bitsPerValue = log2(numberOfPatterns);
    var at = [];
    if (!mmr) {
      at.push({
        x: template <= 1 ? 3 : 2,
        y: -1
      });
      if (template === 0) {
        at.push({
          x: -3,
          y: -1
        });
        at.push({
          x: 2,
          y: -2
        });
        at.push({
          x: -2,
          y: -2
        });
      }
    }
    // Annex C. Gray-scale Image Decoding Procedure.
    var grayScaleBitPlanes = [];
    var mmrInput, bitmap;
    if (mmr) {
      // MMR bit planes are in one continuous stream. Only EOFB codes indicate
      // the end of each bitmap, so EOFBs must be decoded.
      mmrInput = new Reader(decodingContext.data, decodingContext.start, decodingContext.end);
    }
    for (i = bitsPerValue - 1; i >= 0; i--) {
      if (mmr) {
        bitmap = decodeMMRBitmap(mmrInput, gridWidth, gridHeight, true);
      } else {
        bitmap = decodeBitmap(false, gridWidth, gridHeight, template, false, skip, at, decodingContext);
      }
      grayScaleBitPlanes[i] = bitmap;
    }
    // 6.6.5.2 Rendering the patterns.
    var mg, ng, bit, patternIndex, patternBitmap, x, y, patternRow, regionRow;
    for (mg = 0; mg < gridHeight; mg++) {
      for (ng = 0; ng < gridWidth; ng++) {
        bit = 0;
        patternIndex = 0;
        for (j = bitsPerValue - 1; j >= 0; j--) {
          bit = grayScaleBitPlanes[j][mg][ng] ^ bit; // Gray decoding
          patternIndex |= bit << j;
        }
        patternBitmap = patterns[patternIndex];
        x = gridOffsetX + mg * gridVectorY + ng * gridVectorX >> 8;
        y = gridOffsetY + mg * gridVectorX - ng * gridVectorY >> 8;
        // Draw patternBitmap at (x, y).
        if (x >= 0 && x + patternWidth <= regionWidth && y >= 0 && y + patternHeight <= regionHeight) {
          for (i = 0; i < patternHeight; i++) {
            regionRow = regionBitmap[y + i];
            patternRow = patternBitmap[i];
            for (j = 0; j < patternWidth; j++) {
              regionRow[x + j] |= patternRow[j];
            }
          }
        } else {
          var regionX = void 0,
            regionY = void 0;
          for (i = 0; i < patternHeight; i++) {
            regionY = y + i;
            if (regionY < 0 || regionY >= regionHeight) {
              continue;
            }
            regionRow = regionBitmap[regionY];
            patternRow = patternBitmap[i];
            for (j = 0; j < patternWidth; j++) {
              regionX = x + j;
              if (regionX >= 0 && regionX < regionWidth) {
                regionRow[regionX] |= patternRow[j];
              }
            }
          }
        }
      }
    }
    return regionBitmap;
  }
  function readSegmentHeader(data, start) {
    var segmentHeader = {};
    segmentHeader.number = readUint32(data, start);
    var flags = data[start + 4];
    var segmentType = flags & 0x3f;
    if (!SegmentTypes[segmentType]) {
      throw new Jbig2Error("invalid segment type: " + segmentType);
    }
    segmentHeader.type = segmentType;
    segmentHeader.typeName = SegmentTypes[segmentType];
    segmentHeader.deferredNonRetain = !!(flags & 0x80);
    var pageAssociationFieldSize = !!(flags & 0x40);
    var referredFlags = data[start + 5];
    var referredToCount = referredFlags >> 5 & 7;
    var retainBits = [referredFlags & 31];
    var position = start + 6;
    if (referredFlags === 7) {
      referredToCount = readUint32(data, position - 1) & 0x1fffffff;
      position += 3;
      var bytes = referredToCount + 7 >> 3;
      retainBits[0] = data[position++];
      while (--bytes > 0) {
        retainBits.push(data[position++]);
      }
    } else if (referredFlags === 5 || referredFlags === 6) {
      throw new Jbig2Error("invalid referred-to flags");
    }
    segmentHeader.retainBits = retainBits;
    var referredToSegmentNumberSize = 4;
    if (segmentHeader.number <= 256) {
      referredToSegmentNumberSize = 1;
    } else if (segmentHeader.number <= 65536) {
      referredToSegmentNumberSize = 2;
    }
    var referredTo = [];
    var i, ii;
    for (i = 0; i < referredToCount; i++) {
      var number = void 0;
      if (referredToSegmentNumberSize === 1) {
        number = data[position];
      } else if (referredToSegmentNumberSize === 2) {
        number = readUint16(data, position);
      } else {
        number = readUint32(data, position);
      }
      referredTo.push(number);
      position += referredToSegmentNumberSize;
    }
    segmentHeader.referredTo = referredTo;
    if (!pageAssociationFieldSize) {
      segmentHeader.pageAssociation = data[position++];
    } else {
      segmentHeader.pageAssociation = readUint32(data, position);
      position += 4;
    }
    segmentHeader.length = readUint32(data, position);
    position += 4;
    if (segmentHeader.length === 0xffffffff) {
      // 7.2.7 Segment data length, unknown segment length
      if (segmentType === 38) {
        // ImmediateGenericRegion
        var genericRegionInfo = readRegionSegmentInformation(data, position);
        var genericRegionSegmentFlags = data[position + RegionSegmentInformationFieldLength];
        var genericRegionMmr = !!(genericRegionSegmentFlags & 1);
        // searching for the segment end
        var searchPatternLength = 6;
        var searchPattern = new Uint8Array(searchPatternLength);
        if (!genericRegionMmr) {
          searchPattern[0] = 0xff;
          searchPattern[1] = 0xac;
        }
        searchPattern[2] = genericRegionInfo.height >>> 24 & 0xff;
        searchPattern[3] = genericRegionInfo.height >> 16 & 0xff;
        searchPattern[4] = genericRegionInfo.height >> 8 & 0xff;
        searchPattern[5] = genericRegionInfo.height & 0xff;
        for (i = position, ii = data.length; i < ii; i++) {
          var j = 0;
          while (j < searchPatternLength && searchPattern[j] === data[i + j]) {
            j++;
          }
          if (j === searchPatternLength) {
            segmentHeader.length = i + searchPatternLength;
            break;
          }
        }
        if (segmentHeader.length === 0xffffffff) {
          throw new Jbig2Error("segment end was not found");
        }
      } else {
        throw new Jbig2Error("invalid unknown segment length");
      }
    }
    segmentHeader.headerEnd = position;
    return segmentHeader;
  }
  function readSegments(header, data, start, end) {
    var segments = [];
    var position = start;
    while (position < end) {
      var segmentHeader = readSegmentHeader(data, position);
      position = segmentHeader.headerEnd;
      var segment = {
        header: segmentHeader,
        data: data
      };
      if (!header.randomAccess) {
        segment.start = position;
        position += segmentHeader.length;
        segment.end = position;
      }
      segments.push(segment);
      if (segmentHeader.type === 51) {
        break; // end of file is found
      }
    }

    if (header.randomAccess) {
      for (var i = 0, ii = segments.length; i < ii; i++) {
        segments[i].start = position;
        position += segments[i].header.length;
        segments[i].end = position;
      }
    }
    return segments;
  }

  // 7.4.1 Region segment information field
  function readRegionSegmentInformation(data, start) {
    return {
      width: readUint32(data, start),
      height: readUint32(data, start + 4),
      x: readUint32(data, start + 8),
      y: readUint32(data, start + 12),
      combinationOperator: data[start + 16] & 7
    };
  }
  var RegionSegmentInformationFieldLength = 17;
  function processSegment(segment, visitor) {
    var header = segment.header;
    var data = segment.data,
      position = segment.start,
      end = segment.end;
    var args, at, i, atLength;
    switch (header.type) {
      case 0:
        // SymbolDictionary
        // 7.4.2 Symbol dictionary segment syntax
        var dictionary = {};
        var dictionaryFlags = readUint16(data, position); // 7.4.2.1.1
        dictionary.huffman = !!(dictionaryFlags & 1);
        dictionary.refinement = !!(dictionaryFlags & 2);
        dictionary.huffmanDHSelector = dictionaryFlags >> 2 & 3;
        dictionary.huffmanDWSelector = dictionaryFlags >> 4 & 3;
        dictionary.bitmapSizeSelector = dictionaryFlags >> 6 & 1;
        dictionary.aggregationInstancesSelector = dictionaryFlags >> 7 & 1;
        dictionary.bitmapCodingContextUsed = !!(dictionaryFlags & 256);
        dictionary.bitmapCodingContextRetained = !!(dictionaryFlags & 512);
        dictionary.template = dictionaryFlags >> 10 & 3;
        dictionary.refinementTemplate = dictionaryFlags >> 12 & 1;
        position += 2;
        if (!dictionary.huffman) {
          atLength = dictionary.template === 0 ? 4 : 1;
          at = [];
          for (i = 0; i < atLength; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          dictionary.at = at;
        }
        if (dictionary.refinement && !dictionary.refinementTemplate) {
          at = [];
          for (i = 0; i < 2; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          dictionary.refinementAt = at;
        }
        dictionary.numberOfExportedSymbols = readUint32(data, position);
        position += 4;
        dictionary.numberOfNewSymbols = readUint32(data, position);
        position += 4;
        args = [dictionary, header.number, header.referredTo, data, position, end];
        break;
      case 6: // ImmediateTextRegion
      case 7:
        // ImmediateLosslessTextRegion
        var textRegion = {};
        textRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var textRegionSegmentFlags = readUint16(data, position);
        position += 2;
        textRegion.huffman = !!(textRegionSegmentFlags & 1);
        textRegion.refinement = !!(textRegionSegmentFlags & 2);
        textRegion.logStripSize = textRegionSegmentFlags >> 2 & 3;
        textRegion.stripSize = 1 << textRegion.logStripSize;
        textRegion.referenceCorner = textRegionSegmentFlags >> 4 & 3;
        textRegion.transposed = !!(textRegionSegmentFlags & 64);
        textRegion.combinationOperator = textRegionSegmentFlags >> 7 & 3;
        textRegion.defaultPixelValue = textRegionSegmentFlags >> 9 & 1;
        textRegion.dsOffset = textRegionSegmentFlags << 17 >> 27;
        textRegion.refinementTemplate = textRegionSegmentFlags >> 15 & 1;
        if (textRegion.huffman) {
          var textRegionHuffmanFlags = readUint16(data, position);
          position += 2;
          textRegion.huffmanFS = textRegionHuffmanFlags & 3;
          textRegion.huffmanDS = textRegionHuffmanFlags >> 2 & 3;
          textRegion.huffmanDT = textRegionHuffmanFlags >> 4 & 3;
          textRegion.huffmanRefinementDW = textRegionHuffmanFlags >> 6 & 3;
          textRegion.huffmanRefinementDH = textRegionHuffmanFlags >> 8 & 3;
          textRegion.huffmanRefinementDX = textRegionHuffmanFlags >> 10 & 3;
          textRegion.huffmanRefinementDY = textRegionHuffmanFlags >> 12 & 3;
          textRegion.huffmanRefinementSizeSelector = !!(textRegionHuffmanFlags & 0x4000);
        }
        if (textRegion.refinement && !textRegion.refinementTemplate) {
          at = [];
          for (i = 0; i < 2; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          textRegion.refinementAt = at;
        }
        textRegion.numberOfSymbolInstances = readUint32(data, position);
        position += 4;
        args = [textRegion, header.referredTo, data, position, end];
        break;
      case 16:
        // PatternDictionary
        // 7.4.4. Pattern dictionary segment syntax
        var patternDictionary = {};
        var patternDictionaryFlags = data[position++];
        patternDictionary.mmr = !!(patternDictionaryFlags & 1);
        patternDictionary.template = patternDictionaryFlags >> 1 & 3;
        patternDictionary.patternWidth = data[position++];
        patternDictionary.patternHeight = data[position++];
        patternDictionary.maxPatternIndex = readUint32(data, position);
        position += 4;
        args = [patternDictionary, header.number, data, position, end];
        break;
      case 22: // ImmediateHalftoneRegion
      case 23:
        // ImmediateLosslessHalftoneRegion
        // 7.4.5 Halftone region segment syntax
        var halftoneRegion = {};
        halftoneRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var halftoneRegionFlags = data[position++];
        halftoneRegion.mmr = !!(halftoneRegionFlags & 1);
        halftoneRegion.template = halftoneRegionFlags >> 1 & 3;
        halftoneRegion.enableSkip = !!(halftoneRegionFlags & 8);
        halftoneRegion.combinationOperator = halftoneRegionFlags >> 4 & 7;
        halftoneRegion.defaultPixelValue = halftoneRegionFlags >> 7 & 1;
        halftoneRegion.gridWidth = readUint32(data, position);
        position += 4;
        halftoneRegion.gridHeight = readUint32(data, position);
        position += 4;
        halftoneRegion.gridOffsetX = readUint32(data, position) & 0xffffffff;
        position += 4;
        halftoneRegion.gridOffsetY = readUint32(data, position) & 0xffffffff;
        position += 4;
        halftoneRegion.gridVectorX = readUint16(data, position);
        position += 2;
        halftoneRegion.gridVectorY = readUint16(data, position);
        position += 2;
        args = [halftoneRegion, header.referredTo, data, position, end];
        break;
      case 38: // ImmediateGenericRegion
      case 39:
        // ImmediateLosslessGenericRegion
        var genericRegion = {};
        genericRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var genericRegionSegmentFlags = data[position++];
        genericRegion.mmr = !!(genericRegionSegmentFlags & 1);
        genericRegion.template = genericRegionSegmentFlags >> 1 & 3;
        genericRegion.prediction = !!(genericRegionSegmentFlags & 8);
        if (!genericRegion.mmr) {
          atLength = genericRegion.template === 0 ? 4 : 1;
          at = [];
          for (i = 0; i < atLength; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          genericRegion.at = at;
        }
        args = [genericRegion, data, position, end];
        break;
      case 48:
        // PageInformation
        var pageInfo = {
          width: readUint32(data, position),
          height: readUint32(data, position + 4),
          resolutionX: readUint32(data, position + 8),
          resolutionY: readUint32(data, position + 12)
        };
        if (pageInfo.height === 0xffffffff) {
          delete pageInfo.height;
        }
        var pageSegmentFlags = data[position + 16];
        readUint16(data, position + 17); // pageStripingInformation
        pageInfo.lossless = !!(pageSegmentFlags & 1);
        pageInfo.refinement = !!(pageSegmentFlags & 2);
        pageInfo.defaultPixelValue = pageSegmentFlags >> 2 & 1;
        pageInfo.combinationOperator = pageSegmentFlags >> 3 & 3;
        pageInfo.requiresBuffer = !!(pageSegmentFlags & 32);
        pageInfo.combinationOperatorOverride = !!(pageSegmentFlags & 64);
        args = [pageInfo];
        break;
      case 49:
        // EndOfPage
        break;
      case 50:
        // EndOfStripe
        break;
      case 51:
        // EndOfFile
        break;
      case 53:
        // Tables
        args = [header.number, data, position, end];
        break;
      case 62:
        // 7.4.15 defines 2 extension types which
        // are comments and can be ignored.
        break;
      default:
        throw new Jbig2Error("segment type ".concat(header.typeName, "(").concat(header.type, ")") + " is not implemented");
    }
    var callbackName = "on" + header.typeName;
    if (callbackName in visitor) {
      visitor[callbackName].apply(visitor, args);
    }
  }
  function processSegments(segments, visitor) {
    for (var i = 0, ii = segments.length; i < ii; i++) {
      processSegment(segments[i], visitor);
    }
  }
  function parseJbig2Chunks(chunks) {
    var visitor = new SimpleSegmentVisitor();
    for (var i = 0, ii = chunks.length; i < ii; i++) {
      var chunk = chunks[i];
      var segments = readSegments({}, chunk.data, chunk.start, chunk.end);
      processSegments(segments, visitor);
    }
    return visitor.buffer;
  }
  function parseJbig2(data) {
    var end = data.length;
    var position = 0;
    if (data[position] !== 0x97 || data[position + 1] !== 0x4a || data[position + 2] !== 0x42 || data[position + 3] !== 0x32 || data[position + 4] !== 0x0d || data[position + 5] !== 0x0a || data[position + 6] !== 0x1a || data[position + 7] !== 0x0a) {
      throw new Jbig2Error("parseJbig2 - invalid header.");
    }
    var header = Object.create(null);
    position += 8;
    var flags = data[position++];
    header.randomAccess = !(flags & 1);
    if (!(flags & 2)) {
      header.numberOfPages = readUint32(data, position);
      position += 4;
    }
    var segments = readSegments(header, data, position, end);
    var visitor = new SimpleSegmentVisitor();
    processSegments(segments, visitor);
    var _visitor$currentPageI = visitor.currentPageInfo,
      width = _visitor$currentPageI.width,
      height = _visitor$currentPageI.height;
    var bitPacked = visitor.buffer;
    var imgData = new Uint8ClampedArray(width * height);
    var q = 0,
      k = 0;
    for (var i = 0; i < height; i++) {
      var mask = 0,
        buffer = void 0;
      for (var j = 0; j < width; j++) {
        if (!mask) {
          mask = 128;
          buffer = bitPacked[k++];
        }
        imgData[q++] = buffer & mask ? 0 : 255;
        mask >>= 1;
      }
    }
    return {
      imgData: imgData,
      width: width,
      height: height
    };
  }
  function SimpleSegmentVisitor() {}
  SimpleSegmentVisitor.prototype = {
    onPageInformation: function SimpleSegmentVisitor_onPageInformation(info) {
      this.currentPageInfo = info;
      var rowSize = info.width + 7 >> 3;
      var buffer = new Uint8ClampedArray(rowSize * info.height);
      // The contents of ArrayBuffers are initialized to 0.
      // Fill the buffer with 0xFF only if info.defaultPixelValue is set
      if (info.defaultPixelValue) {
        for (var i = 0, ii = buffer.length; i < ii; i++) {
          buffer[i] = 0xff;
        }
      }
      this.buffer = buffer;
    },
    drawBitmap: function SimpleSegmentVisitor_drawBitmap(regionInfo, bitmap) {
      var pageInfo = this.currentPageInfo;
      var width = regionInfo.width,
        height = regionInfo.height;
      var rowSize = pageInfo.width + 7 >> 3;
      var combinationOperator = pageInfo.combinationOperatorOverride ? regionInfo.combinationOperator : pageInfo.combinationOperator;
      var buffer = this.buffer;
      var mask0 = 128 >> (regionInfo.x & 7);
      var offset0 = regionInfo.y * rowSize + (regionInfo.x >> 3);
      var i, j, mask, offset;
      switch (combinationOperator) {
        case 0:
          // OR
          for (i = 0; i < height; i++) {
            mask = mask0;
            offset = offset0;
            for (j = 0; j < width; j++) {
              if (bitmap[i][j]) {
                buffer[offset] |= mask;
              }
              mask >>= 1;
              if (!mask) {
                mask = 128;
                offset++;
              }
            }
            offset0 += rowSize;
          }
          break;
        case 2:
          // XOR
          for (i = 0; i < height; i++) {
            mask = mask0;
            offset = offset0;
            for (j = 0; j < width; j++) {
              if (bitmap[i][j]) {
                buffer[offset] ^= mask;
              }
              mask >>= 1;
              if (!mask) {
                mask = 128;
                offset++;
              }
            }
            offset0 += rowSize;
          }
          break;
        default:
          throw new Jbig2Error("operator ".concat(combinationOperator, " is not supported"));
      }
    },
    onImmediateGenericRegion: function SimpleSegmentVisitor_onImmediateGenericRegion(region, data, start, end) {
      var regionInfo = region.info;
      var decodingContext = new DecodingContext(data, start, end);
      var bitmap = decodeBitmap(region.mmr, regionInfo.width, regionInfo.height, region.template, region.prediction, null, region.at, decodingContext);
      this.drawBitmap(regionInfo, bitmap);
    },
    onImmediateLosslessGenericRegion: function SimpleSegmentVisitor_onImmediateLosslessGenericRegion() {
      this.onImmediateGenericRegion.apply(this, arguments);
    },
    onSymbolDictionary: function SimpleSegmentVisitor_onSymbolDictionary(dictionary, currentSegment, referredSegments, data, start, end) {
      var huffmanTables, huffmanInput;
      if (dictionary.huffman) {
        huffmanTables = getSymbolDictionaryHuffmanTables(dictionary, referredSegments, this.customTables);
        huffmanInput = new Reader(data, start, end);
      }

      // Combines exported symbols from all referred segments
      var symbols = this.symbols;
      if (!symbols) {
        this.symbols = symbols = {};
      }
      var inputSymbols = [];
      for (var i = 0, ii = referredSegments.length; i < ii; i++) {
        var referredSymbols = symbols[referredSegments[i]];
        // referredSymbols is undefined when we have a reference to a Tables
        // segment instead of a SymbolDictionary.
        if (referredSymbols) {
          inputSymbols = inputSymbols.concat(referredSymbols);
        }
      }
      var decodingContext = new DecodingContext(data, start, end);
      symbols[currentSegment] = decodeSymbolDictionary(dictionary.huffman, dictionary.refinement, inputSymbols, dictionary.numberOfNewSymbols, dictionary.numberOfExportedSymbols, huffmanTables, dictionary.template, dictionary.at, dictionary.refinementTemplate, dictionary.refinementAt, decodingContext, huffmanInput);
    },
    onImmediateTextRegion: function SimpleSegmentVisitor_onImmediateTextRegion(region, referredSegments, data, start, end) {
      var regionInfo = region.info;
      var huffmanTables, huffmanInput;

      // Combines exported symbols from all referred segments
      var symbols = this.symbols;
      var inputSymbols = [];
      for (var i = 0, ii = referredSegments.length; i < ii; i++) {
        var referredSymbols = symbols[referredSegments[i]];
        // referredSymbols is undefined when we have a reference to a Tables
        // segment instead of a SymbolDictionary.
        if (referredSymbols) {
          inputSymbols = inputSymbols.concat(referredSymbols);
        }
      }
      var symbolCodeLength = log2(inputSymbols.length);
      if (region.huffman) {
        huffmanInput = new Reader(data, start, end);
        huffmanTables = getTextRegionHuffmanTables(region, referredSegments, this.customTables, inputSymbols.length, huffmanInput);
      }
      var decodingContext = new DecodingContext(data, start, end);
      var bitmap = decodeTextRegion(region.huffman, region.refinement, regionInfo.width, regionInfo.height, region.defaultPixelValue, region.numberOfSymbolInstances, region.stripSize, inputSymbols, symbolCodeLength, region.transposed, region.dsOffset, region.referenceCorner, region.combinationOperator, huffmanTables, region.refinementTemplate, region.refinementAt, decodingContext, region.logStripSize, huffmanInput);
      this.drawBitmap(regionInfo, bitmap);
    },
    onImmediateLosslessTextRegion: function SimpleSegmentVisitor_onImmediateLosslessTextRegion() {
      this.onImmediateTextRegion.apply(this, arguments);
    },
    onPatternDictionary: function onPatternDictionary(dictionary, currentSegment, data, start, end) {
      var patterns = this.patterns;
      if (!patterns) {
        this.patterns = patterns = {};
      }
      var decodingContext = new DecodingContext(data, start, end);
      patterns[currentSegment] = decodePatternDictionary(dictionary.mmr, dictionary.patternWidth, dictionary.patternHeight, dictionary.maxPatternIndex, dictionary.template, decodingContext);
    },
    onImmediateHalftoneRegion: function onImmediateHalftoneRegion(region, referredSegments, data, start, end) {
      // HalftoneRegion refers to exactly one PatternDictionary.
      var patterns = this.patterns[referredSegments[0]];
      var regionInfo = region.info;
      var decodingContext = new DecodingContext(data, start, end);
      var bitmap = decodeHalftoneRegion(region.mmr, patterns, region.template, regionInfo.width, regionInfo.height, region.defaultPixelValue, region.enableSkip, region.combinationOperator, region.gridWidth, region.gridHeight, region.gridOffsetX, region.gridOffsetY, region.gridVectorX, region.gridVectorY, decodingContext);
      this.drawBitmap(regionInfo, bitmap);
    },
    onImmediateLosslessHalftoneRegion: function onImmediateLosslessHalftoneRegion() {
      this.onImmediateHalftoneRegion.apply(this, arguments);
    },
    onTables: function onTables(currentSegment, data, start, end) {
      var customTables = this.customTables;
      if (!customTables) {
        this.customTables = customTables = {};
      }
      customTables[currentSegment] = decodeTablesSegment(data, start, end);
    }
  };
  function HuffmanLine(lineData) {
    if (lineData.length === 2) {
      // OOB line.
      this.isOOB = true;
      this.rangeLow = 0;
      this.prefixLength = lineData[0];
      this.rangeLength = 0;
      this.prefixCode = lineData[1];
      this.isLowerRange = false;
    } else {
      // Normal, upper range or lower range line.
      // Upper range lines are processed like normal lines.
      this.isOOB = false;
      this.rangeLow = lineData[0];
      this.prefixLength = lineData[1];
      this.rangeLength = lineData[2];
      this.prefixCode = lineData[3];
      this.isLowerRange = lineData[4] === "lower";
    }
  }
  function HuffmanTreeNode(line) {
    this.children = [];
    if (line) {
      // Leaf node
      this.isLeaf = true;
      this.rangeLength = line.rangeLength;
      this.rangeLow = line.rangeLow;
      this.isLowerRange = line.isLowerRange;
      this.isOOB = line.isOOB;
    } else {
      // Intermediate or root node
      this.isLeaf = false;
    }
  }
  HuffmanTreeNode.prototype = {
    buildTree: function buildTree(line, shift) {
      var bit = line.prefixCode >> shift & 1;
      if (shift <= 0) {
        // Create a leaf node.
        this.children[bit] = new HuffmanTreeNode(line);
      } else {
        // Create an intermediate node and continue recursively.
        var node = this.children[bit];
        if (!node) {
          this.children[bit] = node = new HuffmanTreeNode(null);
        }
        node.buildTree(line, shift - 1);
      }
    },
    decodeNode: function decodeNode(reader) {
      if (this.isLeaf) {
        if (this.isOOB) {
          return null;
        }
        var htOffset = reader.readBits(this.rangeLength);
        return this.rangeLow + (this.isLowerRange ? -htOffset : htOffset);
      }
      var node = this.children[reader.readBit()];
      if (!node) {
        throw new Jbig2Error("invalid Huffman data");
      }
      return node.decodeNode(reader);
    }
  };
  function HuffmanTable(lines, prefixCodesDone) {
    if (!prefixCodesDone) {
      this.assignPrefixCodes(lines);
    }
    // Create Huffman tree.
    this.rootNode = new HuffmanTreeNode(null);
    for (var i = 0, ii = lines.length; i < ii; i++) {
      var line = lines[i];
      if (line.prefixLength > 0) {
        this.rootNode.buildTree(line, line.prefixLength - 1);
      }
    }
  }
  HuffmanTable.prototype = {
    decode: function decode(reader) {
      return this.rootNode.decodeNode(reader);
    },
    assignPrefixCodes: function assignPrefixCodes(lines) {
      // Annex B.3 Assigning the prefix codes.
      var linesLength = lines.length;
      var prefixLengthMax = 0;
      for (var i = 0; i < linesLength; i++) {
        prefixLengthMax = Math.max(prefixLengthMax, lines[i].prefixLength);
      }
      var histogram = new Uint32Array(prefixLengthMax + 1);
      for (var _i2 = 0; _i2 < linesLength; _i2++) {
        histogram[lines[_i2].prefixLength]++;
      }
      var currentLength = 1,
        firstCode = 0,
        currentCode,
        currentTemp,
        line;
      histogram[0] = 0;
      while (currentLength <= prefixLengthMax) {
        firstCode = firstCode + histogram[currentLength - 1] << 1;
        currentCode = firstCode;
        currentTemp = 0;
        while (currentTemp < linesLength) {
          line = lines[currentTemp];
          if (line.prefixLength === currentLength) {
            line.prefixCode = currentCode;
            currentCode++;
          }
          currentTemp++;
        }
        currentLength++;
      }
    }
  };
  function decodeTablesSegment(data, start, end) {
    // Decodes a Tables segment, i.e., a custom Huffman table.
    // Annex B.2 Code table structure.
    var flags = data[start];
    var lowestValue = readUint32(data, start + 1) & 0xffffffff;
    var highestValue = readUint32(data, start + 5) & 0xffffffff;
    var reader = new Reader(data, start + 9, end);
    var prefixSizeBits = (flags >> 1 & 7) + 1;
    var rangeSizeBits = (flags >> 4 & 7) + 1;
    var lines = [];
    var prefixLength,
      rangeLength,
      currentRangeLow = lowestValue;

    // Normal table lines
    do {
      prefixLength = reader.readBits(prefixSizeBits);
      rangeLength = reader.readBits(rangeSizeBits);
      lines.push(new HuffmanLine([currentRangeLow, prefixLength, rangeLength, 0]));
      currentRangeLow += 1 << rangeLength;
    } while (currentRangeLow < highestValue);

    // Lower range table line
    prefixLength = reader.readBits(prefixSizeBits);
    lines.push(new HuffmanLine([lowestValue - 1, prefixLength, 32, 0, "lower"]));

    // Upper range table line
    prefixLength = reader.readBits(prefixSizeBits);
    lines.push(new HuffmanLine([highestValue, prefixLength, 32, 0]));
    if (flags & 1) {
      // Out-of-band table line
      prefixLength = reader.readBits(prefixSizeBits);
      lines.push(new HuffmanLine([prefixLength, 0]));
    }
    return new HuffmanTable(lines, false);
  }
  var standardTablesCache = {};
  function getStandardTable(number) {
    // Annex B.5 Standard Huffman tables.
    var table = standardTablesCache[number];
    if (table) {
      return table;
    }
    var lines;
    switch (number) {
      case 1:
        lines = [[0, 1, 4, 0x0], [16, 2, 8, 0x2], [272, 3, 16, 0x6], [65808, 3, 32, 0x7] // upper
        ];

        break;
      case 2:
        lines = [[0, 1, 0, 0x0], [1, 2, 0, 0x2], [2, 3, 0, 0x6], [3, 4, 3, 0xe], [11, 5, 6, 0x1e], [75, 6, 32, 0x3e],
        // upper
        [6, 0x3f] // OOB
        ];

        break;
      case 3:
        lines = [[-256, 8, 8, 0xfe], [0, 1, 0, 0x0], [1, 2, 0, 0x2], [2, 3, 0, 0x6], [3, 4, 3, 0xe], [11, 5, 6, 0x1e], [-257, 8, 32, 0xff, "lower"], [75, 7, 32, 0x7e],
        // upper
        [6, 0x3e] // OOB
        ];

        break;
      case 4:
        lines = [[1, 1, 0, 0x0], [2, 2, 0, 0x2], [3, 3, 0, 0x6], [4, 4, 3, 0xe], [12, 5, 6, 0x1e], [76, 5, 32, 0x1f] // upper
        ];

        break;
      case 5:
        lines = [[-255, 7, 8, 0x7e], [1, 1, 0, 0x0], [2, 2, 0, 0x2], [3, 3, 0, 0x6], [4, 4, 3, 0xe], [12, 5, 6, 0x1e], [-256, 7, 32, 0x7f, "lower"], [76, 6, 32, 0x3e] // upper
        ];

        break;
      case 6:
        lines = [[-2048, 5, 10, 0x1c], [-1024, 4, 9, 0x8], [-512, 4, 8, 0x9], [-256, 4, 7, 0xa], [-128, 5, 6, 0x1d], [-64, 5, 5, 0x1e], [-32, 4, 5, 0xb], [0, 2, 7, 0x0], [128, 3, 7, 0x2], [256, 3, 8, 0x3], [512, 4, 9, 0xc], [1024, 4, 10, 0xd], [-2049, 6, 32, 0x3e, "lower"], [2048, 6, 32, 0x3f] // upper
        ];

        break;
      case 7:
        lines = [[-1024, 4, 9, 0x8], [-512, 3, 8, 0x0], [-256, 4, 7, 0x9], [-128, 5, 6, 0x1a], [-64, 5, 5, 0x1b], [-32, 4, 5, 0xa], [0, 4, 5, 0xb], [32, 5, 5, 0x1c], [64, 5, 6, 0x1d], [128, 4, 7, 0xc], [256, 3, 8, 0x1], [512, 3, 9, 0x2], [1024, 3, 10, 0x3], [-1025, 5, 32, 0x1e, "lower"], [2048, 5, 32, 0x1f] // upper
        ];

        break;
      case 8:
        lines = [[-15, 8, 3, 0xfc], [-7, 9, 1, 0x1fc], [-5, 8, 1, 0xfd], [-3, 9, 0, 0x1fd], [-2, 7, 0, 0x7c], [-1, 4, 0, 0xa], [0, 2, 1, 0x0], [2, 5, 0, 0x1a], [3, 6, 0, 0x3a], [4, 3, 4, 0x4], [20, 6, 1, 0x3b], [22, 4, 4, 0xb], [38, 4, 5, 0xc], [70, 5, 6, 0x1b], [134, 5, 7, 0x1c], [262, 6, 7, 0x3c], [390, 7, 8, 0x7d], [646, 6, 10, 0x3d], [-16, 9, 32, 0x1fe, "lower"], [1670, 9, 32, 0x1ff],
        // upper
        [2, 0x1] // OOB
        ];

        break;
      case 9:
        lines = [[-31, 8, 4, 0xfc], [-15, 9, 2, 0x1fc], [-11, 8, 2, 0xfd], [-7, 9, 1, 0x1fd], [-5, 7, 1, 0x7c], [-3, 4, 1, 0xa], [-1, 3, 1, 0x2], [1, 3, 1, 0x3], [3, 5, 1, 0x1a], [5, 6, 1, 0x3a], [7, 3, 5, 0x4], [39, 6, 2, 0x3b], [43, 4, 5, 0xb], [75, 4, 6, 0xc], [139, 5, 7, 0x1b], [267, 5, 8, 0x1c], [523, 6, 8, 0x3c], [779, 7, 9, 0x7d], [1291, 6, 11, 0x3d], [-32, 9, 32, 0x1fe, "lower"], [3339, 9, 32, 0x1ff],
        // upper
        [2, 0x0] // OOB
        ];

        break;
      case 10:
        lines = [[-21, 7, 4, 0x7a], [-5, 8, 0, 0xfc], [-4, 7, 0, 0x7b], [-3, 5, 0, 0x18], [-2, 2, 2, 0x0], [2, 5, 0, 0x19], [3, 6, 0, 0x36], [4, 7, 0, 0x7c], [5, 8, 0, 0xfd], [6, 2, 6, 0x1], [70, 5, 5, 0x1a], [102, 6, 5, 0x37], [134, 6, 6, 0x38], [198, 6, 7, 0x39], [326, 6, 8, 0x3a], [582, 6, 9, 0x3b], [1094, 6, 10, 0x3c], [2118, 7, 11, 0x7d], [-22, 8, 32, 0xfe, "lower"], [4166, 8, 32, 0xff],
        // upper
        [2, 0x2] // OOB
        ];

        break;
      case 11:
        lines = [[1, 1, 0, 0x0], [2, 2, 1, 0x2], [4, 4, 0, 0xc], [5, 4, 1, 0xd], [7, 5, 1, 0x1c], [9, 5, 2, 0x1d], [13, 6, 2, 0x3c], [17, 7, 2, 0x7a], [21, 7, 3, 0x7b], [29, 7, 4, 0x7c], [45, 7, 5, 0x7d], [77, 7, 6, 0x7e], [141, 7, 32, 0x7f] // upper
        ];

        break;
      case 12:
        lines = [[1, 1, 0, 0x0], [2, 2, 0, 0x2], [3, 3, 1, 0x6], [5, 5, 0, 0x1c], [6, 5, 1, 0x1d], [8, 6, 1, 0x3c], [10, 7, 0, 0x7a], [11, 7, 1, 0x7b], [13, 7, 2, 0x7c], [17, 7, 3, 0x7d], [25, 7, 4, 0x7e], [41, 8, 5, 0xfe], [73, 8, 32, 0xff] // upper
        ];

        break;
      case 13:
        lines = [[1, 1, 0, 0x0], [2, 3, 0, 0x4], [3, 4, 0, 0xc], [4, 5, 0, 0x1c], [5, 4, 1, 0xd], [7, 3, 3, 0x5], [15, 6, 1, 0x3a], [17, 6, 2, 0x3b], [21, 6, 3, 0x3c], [29, 6, 4, 0x3d], [45, 6, 5, 0x3e], [77, 7, 6, 0x7e], [141, 7, 32, 0x7f] // upper
        ];

        break;
      case 14:
        lines = [[-2, 3, 0, 0x4], [-1, 3, 0, 0x5], [0, 1, 0, 0x0], [1, 3, 0, 0x6], [2, 3, 0, 0x7]];
        break;
      case 15:
        lines = [[-24, 7, 4, 0x7c], [-8, 6, 2, 0x3c], [-4, 5, 1, 0x1c], [-2, 4, 0, 0xc], [-1, 3, 0, 0x4], [0, 1, 0, 0x0], [1, 3, 0, 0x5], [2, 4, 0, 0xd], [3, 5, 1, 0x1d], [5, 6, 2, 0x3d], [9, 7, 4, 0x7d], [-25, 7, 32, 0x7e, "lower"], [25, 7, 32, 0x7f] // upper
        ];

        break;
      default:
        throw new Jbig2Error("standard table B.".concat(number, " does not exist"));
    }
    for (var i = 0, ii = lines.length; i < ii; i++) {
      lines[i] = new HuffmanLine(lines[i]);
    }
    table = new HuffmanTable(lines, true);
    standardTablesCache[number] = table;
    return table;
  }
  function Reader(data, start, end) {
    this.data = data;
    this.start = start;
    this.end = end;
    this.position = start;
    this.shift = -1;
    this.currentByte = 0;
  }
  Reader.prototype = {
    readBit: function readBit() {
      if (this.shift < 0) {
        if (this.position >= this.end) {
          throw new Jbig2Error("end of data while reading bit");
        }
        this.currentByte = this.data[this.position++];
        this.shift = 7;
      }
      var bit = this.currentByte >> this.shift & 1;
      this.shift--;
      return bit;
    },
    readBits: function readBits(numBits) {
      var result = 0,
        i;
      for (i = numBits - 1; i >= 0; i--) {
        result |= this.readBit() << i;
      }
      return result;
    },
    byteAlign: function byteAlign() {
      this.shift = -1;
    },
    next: function next() {
      if (this.position >= this.end) {
        return -1;
      }
      return this.data[this.position++];
    }
  };
  function getCustomHuffmanTable(index, referredTo, customTables) {
    // Returns a Tables segment that has been earlier decoded.
    // See 7.4.2.1.6 (symbol dictionary) or 7.4.3.1.6 (text region).
    var currentIndex = 0;
    for (var i = 0, ii = referredTo.length; i < ii; i++) {
      var table = customTables[referredTo[i]];
      if (table) {
        if (index === currentIndex) {
          return table;
        }
        currentIndex++;
      }
    }
    throw new Jbig2Error("can't find custom Huffman table");
  }
  function getTextRegionHuffmanTables(textRegion, referredTo, customTables, numberOfSymbols, reader) {
    // 7.4.3.1.7 Symbol ID Huffman table decoding

    // Read code lengths for RUNCODEs 0...34.
    var codes = [];
    for (var i = 0; i <= 34; i++) {
      var codeLength = reader.readBits(4);
      codes.push(new HuffmanLine([i, codeLength, 0, 0]));
    }
    // Assign Huffman codes for RUNCODEs.
    var runCodesTable = new HuffmanTable(codes, false);

    // Read a Huffman code using the assignment above.
    // Interpret the RUNCODE codes and the additional bits (if any).
    codes.length = 0;
    for (var _i3 = 0; _i3 < numberOfSymbols;) {
      var _codeLength = runCodesTable.decode(reader);
      if (_codeLength >= 32) {
        var repeatedLength = void 0,
          numberOfRepeats = void 0,
          j = void 0;
        switch (_codeLength) {
          case 32:
            if (_i3 === 0) {
              throw new Jbig2Error("no previous value in symbol ID table");
            }
            numberOfRepeats = reader.readBits(2) + 3;
            repeatedLength = codes[_i3 - 1].prefixLength;
            break;
          case 33:
            numberOfRepeats = reader.readBits(3) + 3;
            repeatedLength = 0;
            break;
          case 34:
            numberOfRepeats = reader.readBits(7) + 11;
            repeatedLength = 0;
            break;
          default:
            throw new Jbig2Error("invalid code length in symbol ID table");
        }
        for (j = 0; j < numberOfRepeats; j++) {
          codes.push(new HuffmanLine([_i3, repeatedLength, 0, 0]));
          _i3++;
        }
      } else {
        codes.push(new HuffmanLine([_i3, _codeLength, 0, 0]));
        _i3++;
      }
    }
    reader.byteAlign();
    var symbolIDTable = new HuffmanTable(codes, false);

    // 7.4.3.1.6 Text region segment Huffman table selection

    var customIndex = 0,
      tableFirstS,
      tableDeltaS,
      tableDeltaT;
    switch (textRegion.huffmanFS) {
      case 0:
      case 1:
        tableFirstS = getStandardTable(textRegion.huffmanFS + 6);
        break;
      case 3:
        tableFirstS = getCustomHuffmanTable(customIndex, referredTo, customTables);
        customIndex++;
        break;
      default:
        throw new Jbig2Error("invalid Huffman FS selector");
    }
    switch (textRegion.huffmanDS) {
      case 0:
      case 1:
      case 2:
        tableDeltaS = getStandardTable(textRegion.huffmanDS + 8);
        break;
      case 3:
        tableDeltaS = getCustomHuffmanTable(customIndex, referredTo, customTables);
        customIndex++;
        break;
      default:
        throw new Jbig2Error("invalid Huffman DS selector");
    }
    switch (textRegion.huffmanDT) {
      case 0:
      case 1:
      case 2:
        tableDeltaT = getStandardTable(textRegion.huffmanDT + 11);
        break;
      case 3:
        tableDeltaT = getCustomHuffmanTable(customIndex, referredTo, customTables);
        customIndex++;
        break;
      default:
        throw new Jbig2Error("invalid Huffman DT selector");
    }
    if (textRegion.refinement) {
      // Load tables RDW, RDH, RDX and RDY.
      throw new Jbig2Error("refinement with Huffman is not supported");
    }
    return {
      symbolIDTable: symbolIDTable,
      tableFirstS: tableFirstS,
      tableDeltaS: tableDeltaS,
      tableDeltaT: tableDeltaT
    };
  }
  function getSymbolDictionaryHuffmanTables(dictionary, referredTo, customTables) {
    // 7.4.2.1.6 Symbol dictionary segment Huffman table selection

    var customIndex = 0,
      tableDeltaHeight,
      tableDeltaWidth;
    switch (dictionary.huffmanDHSelector) {
      case 0:
      case 1:
        tableDeltaHeight = getStandardTable(dictionary.huffmanDHSelector + 4);
        break;
      case 3:
        tableDeltaHeight = getCustomHuffmanTable(customIndex, referredTo, customTables);
        customIndex++;
        break;
      default:
        throw new Jbig2Error("invalid Huffman DH selector");
    }
    switch (dictionary.huffmanDWSelector) {
      case 0:
      case 1:
        tableDeltaWidth = getStandardTable(dictionary.huffmanDWSelector + 2);
        break;
      case 3:
        tableDeltaWidth = getCustomHuffmanTable(customIndex, referredTo, customTables);
        customIndex++;
        break;
      default:
        throw new Jbig2Error("invalid Huffman DW selector");
    }
    var tableBitmapSize, tableAggregateInstances;
    if (dictionary.bitmapSizeSelector) {
      tableBitmapSize = getCustomHuffmanTable(customIndex, referredTo, customTables);
      customIndex++;
    } else {
      tableBitmapSize = getStandardTable(1);
    }
    if (dictionary.aggregationInstancesSelector) {
      tableAggregateInstances = getCustomHuffmanTable(customIndex, referredTo, customTables);
    } else {
      tableAggregateInstances = getStandardTable(1);
    }
    return {
      tableDeltaHeight: tableDeltaHeight,
      tableDeltaWidth: tableDeltaWidth,
      tableBitmapSize: tableBitmapSize,
      tableAggregateInstances: tableAggregateInstances
    };
  }
  function readUncompressedBitmap(reader, width, height) {
    var bitmap = [];
    for (var y = 0; y < height; y++) {
      var row = new Uint8Array(width);
      bitmap.push(row);
      for (var x = 0; x < width; x++) {
        row[x] = reader.readBit();
      }
      reader.byteAlign();
    }
    return bitmap;
  }
  function decodeMMRBitmap(input, width, height, endOfBlock) {
    // MMR is the same compression algorithm as the PDF filter
    // CCITTFaxDecode with /K -1.
    var params = {
      K: -1,
      Columns: width,
      Rows: height,
      BlackIs1: true,
      EndOfBlock: endOfBlock
    };
    var decoder = new CCITTFaxDecoder(input, params);
    var bitmap = [];
    var currentByte,
      eof = false;
    for (var y = 0; y < height; y++) {
      var row = new Uint8Array(width);
      bitmap.push(row);
      var shift = -1;
      for (var x = 0; x < width; x++) {
        if (shift < 0) {
          currentByte = decoder.readNextChar();
          if (currentByte === -1) {
            // Set the rest of the bits to zero.
            currentByte = 0;
            eof = true;
          }
          shift = 7;
        }
        row[x] = currentByte >> shift & 1;
        shift--;
      }
    }
    if (endOfBlock && !eof) {
      // Read until EOFB has been consumed.
      var lookForEOFLimit = 5;
      for (var i = 0; i < lookForEOFLimit; i++) {
        if (decoder.readNextChar() === -1) {
          break;
        }
      }
    }
    return bitmap;
  }

  // eslint-disable-next-line no-shadow
  function Jbig2Image() {}
  Jbig2Image.prototype = {
    parseChunks: function parseChunks(chunks) {
      return parseJbig2Chunks(chunks);
    },
    parse: function parse(data) {
      var _parseJbig = parseJbig2(data),
        imgData = _parseJbig.imgData,
        width = _parseJbig.width,
        height = _parseJbig.height;
      this.width = width;
      this.height = height;
      return imgData;
    }
  };
  return Jbig2Image;
}();

/**
 * 左补0到指定长度
 */
function leftPad(input, num) {
  if (input.length >= num) return input;
  return new Array(num - input.length + 1).join('0') + input;
}

/**
 * 二进制转化为十六进制
 */
function binary2hex(binary) {
  var binaryLength = 8;
  var hex = '';
  for (var i = 0; i < binary.length / binaryLength; i++) {
    hex += leftPad(parseInt(binary.substr(i * binaryLength, binaryLength), 2).toString(16), 2);
  }
  return hex;
}

/**
 * 十六进制转化为二进制
 */
function hex2binary(hex) {
  var hexLength = 2;
  var binary = '';
  for (var i = 0; i < hex.length / hexLength; i++) {
    binary += leftPad(parseInt(hex.substr(i * hexLength, hexLength), 16).toString(2), 8);
  }
  return binary;
}

/**
 * 循环左移
 */
function rol(str, n) {
  return str.substring(n % str.length) + str.substr(0, n % str.length);
}

/**
 * 二进制运算
 */
function binaryCal(x, y, method) {
  var a = x || '';
  var b = y || '';
  var result = [];
  var prevResult;
  for (var i = a.length - 1; i >= 0; i--) {
    // 大端
    prevResult = method(a[i], b[i], prevResult);
    result[i] = prevResult[0];
  }
  return result.join('');
}

/**
 * 二进制异或运算
 */
function xor(x, y) {
  return binaryCal(x, y, function (a, b) {
    return [a === b ? '0' : '1'];
  });
}

/**
 * 二进制与运算
 */
function and(x, y) {
  return binaryCal(x, y, function (a, b) {
    return [a === '1' && b === '1' ? '1' : '0'];
  });
}

/**
 * 二进制或运算
 */
function or(x, y) {
  return binaryCal(x, y, function (a, b) {
    return [a === '1' || b === '1' ? '1' : '0'];
  }); // a === '0' && b === '0' ? '0' : '1'
}

/**
 * 二进制与运算
 */
function add(x, y) {
  var result = binaryCal(x, y, function (a, b, prevResult) {
    var carry = prevResult ? prevResult[1] : '0' ;

    // a,b不等时,carry不变，结果与carry相反
    // a,b相等时，结果等于原carry，新carry等于a
    if (a !== b) return [carry === '0' ? '1' : '0', carry];
    return [carry, a];
  });
  return result;
}

/**
 * 二进制非运算
 */
function not(x) {
  return binaryCal(x, undefined, function (a) {
    return [a === '1' ? '0' : '1'];
  });
}
function calMulti(method) {
  return function () {
    for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
      arr[_key] = arguments[_key];
    }
    return arr.reduce(function (prev, curr) {
      return method(prev, curr);
    });
  };
}

/**
 * 压缩函数中的置换函数 P1(X) = X xor (X <<< 9) xor (X <<< 17)
 */
function P0(X) {
  return calMulti(xor)(X, rol(X, 9), rol(X, 17));
}

/**
 * 消息扩展中的置换函数 P1(X) = X xor (X <<< 15) xor (X <<< 23)
 */
function P1(X) {
  return calMulti(xor)(X, rol(X, 15), rol(X, 23));
}
function FF(X, Y, Z, j) {
  return j >= 0 && j <= 15 ? calMulti(xor)(X, Y, Z) : calMulti(or)(and(X, Y), and(X, Z), and(Y, Z));
}
function GG(X, Y, Z, j) {
  return j >= 0 && j <= 15 ? calMulti(xor)(X, Y, Z) : or(and(X, Y), and(not(X), Z));
}
function T(j) {
  return j >= 0 && j <= 15 ? hex2binary('79cc4519') : hex2binary('7a879d8a');
}

/**
 * 压缩函数
 */
function CF(V, Bi) {
  // 消息扩展
  var wordLength = 32;
  var W = [];
  var M = []; // W'

  // 将消息分组B划分为16个字W0， W1，…… ，W15 （字为长度为32的比特串）
  for (var i = 0; i < 16; i++) {
    W.push(Bi.substr(i * wordLength, wordLength));
  }

  // W[j] <- P1(W[j−16] xor W[j−9] xor (W[j−3] <<< 15)) xor (W[j−13] <<< 7) xor W[j−6]
  for (var j = 16; j < 68; j++) {
    W.push(calMulti(xor)(P1(calMulti(xor)(W[j - 16], W[j - 9], rol(W[j - 3], 15))), rol(W[j - 13], 7), W[j - 6]));
  }

  // W′[j] = W[j] xor W[j+4]
  for (var _j = 0; _j < 64; _j++) {
    M.push(xor(W[_j], W[_j + 4]));
  }

  // 压缩
  var wordRegister = []; // 字寄存器
  for (var _j2 = 0; _j2 < 8; _j2++) {
    wordRegister.push(V.substr(_j2 * wordLength, wordLength));
  }
  var A = wordRegister[0];
  var B = wordRegister[1];
  var C = wordRegister[2];
  var D = wordRegister[3];
  var E = wordRegister[4];
  var F = wordRegister[5];
  var G = wordRegister[6];
  var H = wordRegister[7];

  // 中间变量
  var SS1;
  var SS2;
  var TT1;
  var TT2;
  for (var _j3 = 0; _j3 < 64; _j3++) {
    SS1 = rol(calMulti(add)(rol(A, 12), E, rol(T(_j3), _j3)), 7);
    SS2 = xor(SS1, rol(A, 12));
    TT1 = calMulti(add)(FF(A, B, C, _j3), D, SS2, M[_j3]);
    TT2 = calMulti(add)(GG(E, F, G, _j3), H, SS1, W[_j3]);
    D = C;
    C = rol(B, 9);
    B = A;
    A = TT1;
    H = G;
    G = rol(F, 19);
    F = E;
    E = P0(TT2);
  }
  return xor([A, B, C, D, E, F, G, H].join(''), V);
}

//export function sm3(str: string): string;
function sm3(hexstr) {
  var binary = hex2binary(hexstr);
  // 填充
  var len = binary.length;

  // k是满足len + 1 + k = 448mod512的最小的非负整数
  var k = len % 512;

  // 如果 448 <= (512 % len) < 512，需要多补充 (len % 448) 比特'0'以满足总比特长度为512的倍数
  k = k >= 448 ? 512 - k % 448 - 1 : 448 - k - 1;
  var m = "".concat(binary, "1").concat(leftPad('', k)).concat(leftPad(len.toString(2), 64)).toString(); // k个0

  // 迭代压缩
  var n = (len + k + 65) / 512;
  var V = hex2binary('7380166f4914b2b9172442d7da8a0600a96f30bc163138aae38dee4db0fb0e4e');
  for (var i = 0; i <= n - 1; i++) {
    var B = m.substr(512 * i, 512);
    V = CF(V, B);
  }
  return binary2hex(V);
}

var digestByteArray = function digestByteArray(data, hashedBase64, checkMethod) {
  var hashedHex = Uint8ArrayToHexString(Base64.decode(hashedBase64));
  checkMethod = checkMethod.toLowerCase();
  if (checkMethod.indexOf('1.2.156.10197.1.401') >= 0 || checkMethod.indexOf('sm3') >= 0) {
    return hashedHex == sm3(Uint8ArrayToHexString(data));
  } else if (checkMethod.indexOf('md5') >= 0) {
    return hashedHex == md5(data);
  } else if (checkMethod.indexOf('sha1') >= 0) {
    return hashedHex == sha1(data);
  } else {
    return '';
  }
};
var SES_Signature_Verify = function SES_Signature_Verify(SES_Signature) {
  try {
    var signAlg = SES_Signature.realVersion < 4 ? SES_Signature.toSign.signatureAlgorithm : SES_Signature.signatureAlgID;
    signAlg = signAlg.toLowerCase();
    var msg = SES_Signature.toSignDer;
    if (signAlg.indexOf('1.2.156.10197.1.501') >= 0 || signAlg.indexOf('sm2') >= 0) {
      var sigValueHex = SES_Signature.signature.replace(/ /g, '').replace(/\n/g, '');
      if (sigValueHex.indexOf('00') == 0) {
        sigValueHex = sigValueHex.substr(2, sigValueHex.length - 2);
      }
      var cert = SES_Signature.realVersion < 4 ? SES_Signature.toSign.cert : SES_Signature.cert;
      var publicKey = cert.subjectPublicKeyInfo.subjectPublicKey.replace(/ /g, '').replace(/\n/g, '');
      if (publicKey.indexOf('00') == 0) {
        publicKey = publicKey.substr(2, publicKey.length - 2);
      }
      return smCrypto.sm2.doVerifySignature(msg, sigValueHex, publicKey, {
        der: true,
        hash: true,
        userId: '1234567812345678'
      });
    } else {
      var sig = new rsa.KJUR.crypto.Signature({
        alg: 'SHA1withRSA'
      });
      var _cert = SES_Signature.realVersion < 4 ? SES_Signature.toSign.cert : SES_Signature.cert;
      var _sigValueHex = SES_Signature.signature.replace(/ /g, '').replace(/\n/g, '');
      if (_sigValueHex.indexOf('00') == 0) {
        _sigValueHex = _sigValueHex.substr(2, _sigValueHex.length - 2);
      }
      sig.init(_cert);
      sig.updateHex(msg);
      return sig.verify(_sigValueHex);
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
var parseSesSignature = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(zip, name) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            zip.files[name].async('base64').then(function (bytes) {
              var res = decodeText(bytes);
              resolve(res);
            }, function error(e) {
              reject(e);
            });
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function parseSesSignature(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var digestCheckProcess = function digestCheckProcess(arr) {
  var ret = true;
  var _iterator = _createForOfIteratorHelper(arr),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var val = _step.value;
      var value = digestByteArray(val.fileData, val.hashed, val.checkMethod);
      ret = ret && value;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return ret;
};
var decodeText = function decodeText(val) {
  try {
    var der = reHex.test(val) ? Hex.decode(val) : Base64.unarmor(val);
    return decode(der);
  } catch (e) {
    console.log(e);
    return {};
  }
};
var decode = function decode(der, offset) {
  offset = offset || 0;
  try {
    var SES_Signature = decodeSES_Signature(der, offset);
    var type = SES_Signature.toSign.eseal.esealInfo.picture.type;
    var ofdArray = SES_Signature.toSign.eseal.esealInfo.picture.data["byte"];
    return {
      ofdArray: ofdArray,
      type: type.str.toLowerCase(),
      SES_Signature: SES_Signature,
      verifyRet: SES_Signature_Verify(SES_Signature)
    };
  } catch (e) {
    console.log(e);
    return {};
  }
};
var decodeUTCTime = function decodeUTCTime(str) {
  str = str.replace('Unrecognized time: ', '');
  str.indexOf('Z') > 0;
  str = str.replace('Z', '');
  str = str.substr(0, 1) < '5' ? '20' + str : '19' + str;
  return str;
};
var decodeSES_Signature = function decodeSES_Signature(der, offset) {
  offset = offset || 0;
  var asn1 = ASN1.decode(der, offset);
  var SES_Signature;
  try {
    var _asn1$sub$, _asn1$sub$$sub$, _asn1$sub$$sub$$sub$, _asn1$sub$$sub$$sub$$, _asn1$sub$$sub$$sub$$2, _asn1$sub$2, _asn1$sub$2$sub$, _asn1$sub$2$sub$$sub$, _asn1$sub$2$sub$$sub$2, _asn1$sub$2$sub$$sub$3, _asn1$sub$3, _asn1$sub$3$sub$, _asn1$sub$3$sub$$sub$, _asn1$sub$3$sub$$sub$2, _asn1$sub$3$sub$$sub$3, _asn1$sub$4, _asn1$sub$4$sub$, _asn1$sub$5, _asn1$sub$5$sub$, _asn1$sub$5$sub$$sub$, _asn1$sub$5$sub$$sub$2, _asn1$sub$6, _asn1$sub$6$sub$, _asn1$sub$6$sub$$sub$, _asn1$sub$7, _asn1$sub$8, _asn1$sub$8$sub$, _asn1$sub$9, _asn1$sub$9$sub$, _asn1$sub$9$sub$$sub$, _asn1$sub$9$sub$$sub$2, _asn1$sub$9$sub$$sub$3, _asn1$sub$10, _asn1$sub$10$sub$, _asn1$sub$10$sub$$sub, _asn1$sub$10$sub$$sub2, _asn1$sub$10$sub$$sub3, _asn1$sub$11, _asn1$sub$11$sub$, _asn1$sub$11$sub$$sub, _asn1$sub$11$sub$$sub2, _asn1$sub$11$sub$$sub3, _asn1$sub$12, _asn1$sub$12$sub$, _asn1$sub$12$sub$$sub, _asn1$sub$12$sub$$sub2, _asn1$sub$13, _asn1$sub$13$sub$, _asn1$sub$13$sub$$sub, _asn1$sub$13$sub$$sub2, _asn1$sub$13$sub$$sub3, _asn1$sub$14, _asn1$sub$14$sub$, _asn1$sub$14$sub$$sub, _asn1$sub$14$sub$$sub2, _asn1$sub$14$sub$$sub3, _asn1$sub$15, _asn1$sub$15$sub$, _asn1$sub$15$sub$$sub, _asn1$sub$15$sub$$sub2, _asn1$sub$15$sub$$sub3, _asn1$sub$16, _asn1$sub$16$sub$, _asn1$sub$16$sub$$sub, _asn1$sub$16$sub$$sub2, _asn1$sub$16$sub$$sub3, _asn1$sub$17, _asn1$sub$17$sub$, _asn1$sub$17$sub$$sub, _asn1$sub$17$sub$$sub2, _asn1$sub$17$sub$$sub3, _asn1$sub$18, _asn1$sub$18$sub$, _asn1$sub$18$sub$$sub, _asn1$sub$18$sub$$sub2, _asn1$sub$18$sub$$sub3, _asn1$sub$19, _asn1$sub$19$sub$, _asn1$sub$19$sub$$sub, _asn1$sub$19$sub$$sub2, _asn1$sub$19$sub$$sub3, _asn1$sub$20, _asn1$sub$20$sub$, _asn1$sub$20$sub$$sub, _asn1$sub$21, _asn1$sub$21$sub$, _asn1$sub$21$sub$$sub, _asn1$sub$21$sub$$sub2, _asn1$sub$22, _asn1$sub$22$sub$, _asn1$sub$22$sub$$sub, _asn1$sub$22$sub$$sub2, _asn1$sub$23, _asn1$sub$23$sub$, _asn1$sub$24, _asn1$sub$24$sub$, _asn1$sub$25, _asn1$sub$26, _asn1$sub$26$sub$, _asn1$sub$27;
    //V1 V4分支判断
    //V1
    //Unrecognized time:
    var createDate = decodeUTCTime((_asn1$sub$ = asn1.sub[0]) === null || _asn1$sub$ === void 0 ? void 0 : (_asn1$sub$$sub$ = _asn1$sub$.sub[1]) === null || _asn1$sub$$sub$ === void 0 ? void 0 : (_asn1$sub$$sub$$sub$ = _asn1$sub$$sub$.sub[0]) === null || _asn1$sub$$sub$$sub$ === void 0 ? void 0 : (_asn1$sub$$sub$$sub$$ = _asn1$sub$$sub$$sub$.sub[2]) === null || _asn1$sub$$sub$$sub$$ === void 0 ? void 0 : (_asn1$sub$$sub$$sub$$2 = _asn1$sub$$sub$$sub$$.sub[3]) === null || _asn1$sub$$sub$$sub$$2 === void 0 ? void 0 : _asn1$sub$$sub$$sub$$2.stream.parseTime(asn1.sub[0].sub[1].sub[0].sub[2].sub[3].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[3].header, asn1.sub[0].sub[1].sub[0].sub[2].sub[3].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[3].header + asn1.sub[0].sub[1].sub[0].sub[2].sub[3].length));
    var validStart = decodeUTCTime((_asn1$sub$2 = asn1.sub[0]) === null || _asn1$sub$2 === void 0 ? void 0 : (_asn1$sub$2$sub$ = _asn1$sub$2.sub[1]) === null || _asn1$sub$2$sub$ === void 0 ? void 0 : (_asn1$sub$2$sub$$sub$ = _asn1$sub$2$sub$.sub[0]) === null || _asn1$sub$2$sub$$sub$ === void 0 ? void 0 : (_asn1$sub$2$sub$$sub$2 = _asn1$sub$2$sub$$sub$.sub[2]) === null || _asn1$sub$2$sub$$sub$2 === void 0 ? void 0 : (_asn1$sub$2$sub$$sub$3 = _asn1$sub$2$sub$$sub$2.sub[4]) === null || _asn1$sub$2$sub$$sub$3 === void 0 ? void 0 : _asn1$sub$2$sub$$sub$3.stream.parseTime(asn1.sub[0].sub[1].sub[0].sub[2].sub[4].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[4].header, asn1.sub[0].sub[1].sub[0].sub[2].sub[4].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[4].header + asn1.sub[0].sub[1].sub[0].sub[2].sub[4].length));
    var validEnd = decodeUTCTime((_asn1$sub$3 = asn1.sub[0]) === null || _asn1$sub$3 === void 0 ? void 0 : (_asn1$sub$3$sub$ = _asn1$sub$3.sub[1]) === null || _asn1$sub$3$sub$ === void 0 ? void 0 : (_asn1$sub$3$sub$$sub$ = _asn1$sub$3$sub$.sub[0]) === null || _asn1$sub$3$sub$$sub$ === void 0 ? void 0 : (_asn1$sub$3$sub$$sub$2 = _asn1$sub$3$sub$$sub$.sub[2]) === null || _asn1$sub$3$sub$$sub$2 === void 0 ? void 0 : (_asn1$sub$3$sub$$sub$3 = _asn1$sub$3$sub$$sub$2.sub[5]) === null || _asn1$sub$3$sub$$sub$3 === void 0 ? void 0 : _asn1$sub$3$sub$$sub$3.stream.parseTime(asn1.sub[0].sub[1].sub[0].sub[2].sub[5].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[5].header, asn1.sub[0].sub[1].sub[0].sub[2].sub[5].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[5].header + asn1.sub[0].sub[1].sub[0].sub[2].sub[5].length));
    var timeInfo = decodeUTCTime((_asn1$sub$4 = asn1.sub[0]) === null || _asn1$sub$4 === void 0 ? void 0 : (_asn1$sub$4$sub$ = _asn1$sub$4.sub[2]) === null || _asn1$sub$4$sub$ === void 0 ? void 0 : _asn1$sub$4$sub$.stream.parseTime(asn1.sub[0].sub[2].stream.pos + asn1.sub[0].sub[2].header, asn1.sub[0].sub[2].stream.pos + asn1.sub[0].sub[2].header + asn1.sub[0].sub[2].length, false));
    var asn1CertList = (_asn1$sub$5 = asn1.sub[0]) === null || _asn1$sub$5 === void 0 ? void 0 : (_asn1$sub$5$sub$ = _asn1$sub$5.sub[1]) === null || _asn1$sub$5$sub$ === void 0 ? void 0 : (_asn1$sub$5$sub$$sub$ = _asn1$sub$5$sub$.sub[0]) === null || _asn1$sub$5$sub$$sub$ === void 0 ? void 0 : (_asn1$sub$5$sub$$sub$2 = _asn1$sub$5$sub$$sub$.sub[2]) === null || _asn1$sub$5$sub$$sub$2 === void 0 ? void 0 : _asn1$sub$5$sub$$sub$2.sub[2];
    var certList = new Array();
    if (asn1CertList) {
      asn1CertList.sub.forEach(function (asn1Cert) {
        certList.push(asn1Cert.stream.parseOctetString(asn1Cert.stream.pos + asn1Cert.header, asn1Cert.stream.pos + asn1Cert.header + asn1Cert.length));
      });
    }
    var asn1ExtDatas = (_asn1$sub$6 = asn1.sub[0]) === null || _asn1$sub$6 === void 0 ? void 0 : (_asn1$sub$6$sub$ = _asn1$sub$6.sub[1]) === null || _asn1$sub$6$sub$ === void 0 ? void 0 : (_asn1$sub$6$sub$$sub$ = _asn1$sub$6$sub$.sub[0]) === null || _asn1$sub$6$sub$$sub$ === void 0 ? void 0 : _asn1$sub$6$sub$$sub$.sub[4];
    var extDatas = new Array();
    if (asn1ExtDatas) {
      asn1ExtDatas.sub.forEach(function (asn1ExtData) {
        var _asn1ExtData$sub$, _asn1ExtData$sub$2, _asn1ExtData$sub$3;
        extDatas.push({
          extnID: (_asn1ExtData$sub$ = asn1ExtData.sub[0]) === null || _asn1ExtData$sub$ === void 0 ? void 0 : _asn1ExtData$sub$.stream.parseOID(asn1ExtData.sub[0].stream.pos + asn1ExtData.sub[0].header, asn1ExtData.sub[0].stream.pos + asn1ExtData.sub[0].header + asn1ExtData.sub[0].length),
          critical: (_asn1ExtData$sub$2 = asn1ExtData.sub[1]) === null || _asn1ExtData$sub$2 === void 0 ? void 0 : _asn1ExtData$sub$2.stream.parseInteger(asn1ExtData.sub[1].stream.pos + asn1ExtData.sub[1].header, asn1ExtData.sub[1].stream.pos + asn1ExtData.sub[1].header + asn1ExtData.sub[1].length),
          extnValue: (_asn1ExtData$sub$3 = asn1ExtData.sub[2]) === null || _asn1ExtData$sub$3 === void 0 ? void 0 : _asn1ExtData$sub$3.stream.parseOctetString(asn1ExtData.sub[2].stream.pos + asn1ExtData.sub[2].header, asn1ExtData.sub[2].stream.pos + asn1ExtData.sub[2].header + asn1ExtData.sub[2].length)
        });
      });
    }
    //ASN1.decode(asn1.sub[0]?.sub[1]?.sub[0]?.sub[2]?.sub[3]);
    SES_Signature = {
      realVersion: 1,
      toSignDer: (_asn1$sub$7 = asn1.sub[0]) === null || _asn1$sub$7 === void 0 ? void 0 : _asn1$sub$7.stream.enc.subarray(asn1.sub[0].stream.pos, asn1.sub[0].stream.pos + asn1.sub[0].header + asn1.sub[0].length),
      toSign: {
        version: (_asn1$sub$8 = asn1.sub[0]) === null || _asn1$sub$8 === void 0 ? void 0 : (_asn1$sub$8$sub$ = _asn1$sub$8.sub[0]) === null || _asn1$sub$8$sub$ === void 0 ? void 0 : _asn1$sub$8$sub$.stream.parseInteger(asn1.sub[0].sub[0].stream.pos + asn1.sub[0].sub[0].header, asn1.sub[0].sub[0].stream.pos + asn1.sub[0].sub[0].header + asn1.sub[0].sub[0].length),
        eseal: {
          esealInfo: {
            header: {
              ID: (_asn1$sub$9 = asn1.sub[0]) === null || _asn1$sub$9 === void 0 ? void 0 : (_asn1$sub$9$sub$ = _asn1$sub$9.sub[1]) === null || _asn1$sub$9$sub$ === void 0 ? void 0 : (_asn1$sub$9$sub$$sub$ = _asn1$sub$9$sub$.sub[0]) === null || _asn1$sub$9$sub$$sub$ === void 0 ? void 0 : (_asn1$sub$9$sub$$sub$2 = _asn1$sub$9$sub$$sub$.sub[0]) === null || _asn1$sub$9$sub$$sub$2 === void 0 ? void 0 : (_asn1$sub$9$sub$$sub$3 = _asn1$sub$9$sub$$sub$2.sub[0]) === null || _asn1$sub$9$sub$$sub$3 === void 0 ? void 0 : _asn1$sub$9$sub$$sub$3.stream.parseStringUTF(asn1.sub[0].sub[1].sub[0].sub[0].sub[0].stream.pos + asn1.sub[0].sub[1].sub[0].sub[0].sub[0].header, asn1.sub[0].sub[1].sub[0].sub[0].sub[0].stream.pos + asn1.sub[0].sub[1].sub[0].sub[0].sub[0].header + asn1.sub[0].sub[1].sub[0].sub[0].sub[0].length),
              version: (_asn1$sub$10 = asn1.sub[0]) === null || _asn1$sub$10 === void 0 ? void 0 : (_asn1$sub$10$sub$ = _asn1$sub$10.sub[1]) === null || _asn1$sub$10$sub$ === void 0 ? void 0 : (_asn1$sub$10$sub$$sub = _asn1$sub$10$sub$.sub[0]) === null || _asn1$sub$10$sub$$sub === void 0 ? void 0 : (_asn1$sub$10$sub$$sub2 = _asn1$sub$10$sub$$sub.sub[0]) === null || _asn1$sub$10$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$10$sub$$sub3 = _asn1$sub$10$sub$$sub2.sub[1]) === null || _asn1$sub$10$sub$$sub3 === void 0 ? void 0 : _asn1$sub$10$sub$$sub3.stream.parseInteger(asn1.sub[0].sub[1].sub[0].sub[0].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[0].sub[1].header, asn1.sub[0].sub[1].sub[0].sub[0].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[0].sub[1].header + asn1.sub[0].sub[1].sub[0].sub[0].sub[1].length),
              Vid: (_asn1$sub$11 = asn1.sub[0]) === null || _asn1$sub$11 === void 0 ? void 0 : (_asn1$sub$11$sub$ = _asn1$sub$11.sub[1]) === null || _asn1$sub$11$sub$ === void 0 ? void 0 : (_asn1$sub$11$sub$$sub = _asn1$sub$11$sub$.sub[0]) === null || _asn1$sub$11$sub$$sub === void 0 ? void 0 : (_asn1$sub$11$sub$$sub2 = _asn1$sub$11$sub$$sub.sub[0]) === null || _asn1$sub$11$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$11$sub$$sub3 = _asn1$sub$11$sub$$sub2.sub[2]) === null || _asn1$sub$11$sub$$sub3 === void 0 ? void 0 : _asn1$sub$11$sub$$sub3.stream.parseStringUTF(asn1.sub[0].sub[1].sub[0].sub[0].sub[2].stream.pos + asn1.sub[0].sub[1].sub[0].sub[0].sub[2].header, asn1.sub[0].sub[1].sub[0].sub[0].sub[2].stream.pos + asn1.sub[0].sub[1].sub[0].sub[0].sub[2].header + asn1.sub[0].sub[1].sub[0].sub[0].sub[2].length)
            },
            esID: (_asn1$sub$12 = asn1.sub[0]) === null || _asn1$sub$12 === void 0 ? void 0 : (_asn1$sub$12$sub$ = _asn1$sub$12.sub[1]) === null || _asn1$sub$12$sub$ === void 0 ? void 0 : (_asn1$sub$12$sub$$sub = _asn1$sub$12$sub$.sub[0]) === null || _asn1$sub$12$sub$$sub === void 0 ? void 0 : (_asn1$sub$12$sub$$sub2 = _asn1$sub$12$sub$$sub.sub[1]) === null || _asn1$sub$12$sub$$sub2 === void 0 ? void 0 : _asn1$sub$12$sub$$sub2.stream.parseStringUTF(asn1.sub[0].sub[1].sub[0].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[1].header, asn1.sub[0].sub[1].sub[0].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[1].header + asn1.sub[0].sub[1].sub[0].sub[1].length),
            property: {
              type: (_asn1$sub$13 = asn1.sub[0]) === null || _asn1$sub$13 === void 0 ? void 0 : (_asn1$sub$13$sub$ = _asn1$sub$13.sub[1]) === null || _asn1$sub$13$sub$ === void 0 ? void 0 : (_asn1$sub$13$sub$$sub = _asn1$sub$13$sub$.sub[0]) === null || _asn1$sub$13$sub$$sub === void 0 ? void 0 : (_asn1$sub$13$sub$$sub2 = _asn1$sub$13$sub$$sub.sub[2]) === null || _asn1$sub$13$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$13$sub$$sub3 = _asn1$sub$13$sub$$sub2.sub[0]) === null || _asn1$sub$13$sub$$sub3 === void 0 ? void 0 : _asn1$sub$13$sub$$sub3.stream.parseInteger(asn1.sub[0].sub[1].sub[0].sub[2].sub[0].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[0].header, asn1.sub[0].sub[1].sub[0].sub[2].sub[0].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[0].header + asn1.sub[0].sub[1].sub[0].sub[2].sub[0].length),
              name: (_asn1$sub$14 = asn1.sub[0]) === null || _asn1$sub$14 === void 0 ? void 0 : (_asn1$sub$14$sub$ = _asn1$sub$14.sub[1]) === null || _asn1$sub$14$sub$ === void 0 ? void 0 : (_asn1$sub$14$sub$$sub = _asn1$sub$14$sub$.sub[0]) === null || _asn1$sub$14$sub$$sub === void 0 ? void 0 : (_asn1$sub$14$sub$$sub2 = _asn1$sub$14$sub$$sub.sub[2]) === null || _asn1$sub$14$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$14$sub$$sub3 = _asn1$sub$14$sub$$sub2.sub[1]) === null || _asn1$sub$14$sub$$sub3 === void 0 ? void 0 : _asn1$sub$14$sub$$sub3.stream.parseStringUTF(asn1.sub[0].sub[1].sub[0].sub[2].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[1].header, asn1.sub[0].sub[1].sub[0].sub[2].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[1].header + asn1.sub[0].sub[1].sub[0].sub[2].sub[1].length),
              certList: certList,
              createDate: createDate,
              validStart: validStart,
              validEnd: validEnd
            },
            picture: {
              type: (_asn1$sub$15 = asn1.sub[0]) === null || _asn1$sub$15 === void 0 ? void 0 : (_asn1$sub$15$sub$ = _asn1$sub$15.sub[1]) === null || _asn1$sub$15$sub$ === void 0 ? void 0 : (_asn1$sub$15$sub$$sub = _asn1$sub$15$sub$.sub[0]) === null || _asn1$sub$15$sub$$sub === void 0 ? void 0 : (_asn1$sub$15$sub$$sub2 = _asn1$sub$15$sub$$sub.sub[3]) === null || _asn1$sub$15$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$15$sub$$sub3 = _asn1$sub$15$sub$$sub2.sub[0]) === null || _asn1$sub$15$sub$$sub3 === void 0 ? void 0 : _asn1$sub$15$sub$$sub3.stream.parseStringUTF(asn1.sub[0].sub[1].sub[0].sub[3].sub[0].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[0].header, asn1.sub[0].sub[1].sub[0].sub[3].sub[0].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[0].header + asn1.sub[0].sub[1].sub[0].sub[3].sub[0].length),
              data: {
                hex: (_asn1$sub$16 = asn1.sub[0]) === null || _asn1$sub$16 === void 0 ? void 0 : (_asn1$sub$16$sub$ = _asn1$sub$16.sub[1]) === null || _asn1$sub$16$sub$ === void 0 ? void 0 : (_asn1$sub$16$sub$$sub = _asn1$sub$16$sub$.sub[0]) === null || _asn1$sub$16$sub$$sub === void 0 ? void 0 : (_asn1$sub$16$sub$$sub2 = _asn1$sub$16$sub$$sub.sub[3]) === null || _asn1$sub$16$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$16$sub$$sub3 = _asn1$sub$16$sub$$sub2.sub[1]) === null || _asn1$sub$16$sub$$sub3 === void 0 ? void 0 : _asn1$sub$16$sub$$sub3.stream.parseOctetString(asn1.sub[0].sub[1].sub[0].sub[3].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[1].header, asn1.sub[0].sub[1].sub[0].sub[3].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[1].header + asn1.sub[0].sub[1].sub[0].sub[3].sub[1].length),
                "byte": (_asn1$sub$17 = asn1.sub[0]) === null || _asn1$sub$17 === void 0 ? void 0 : (_asn1$sub$17$sub$ = _asn1$sub$17.sub[1]) === null || _asn1$sub$17$sub$ === void 0 ? void 0 : (_asn1$sub$17$sub$$sub = _asn1$sub$17$sub$.sub[0]) === null || _asn1$sub$17$sub$$sub === void 0 ? void 0 : (_asn1$sub$17$sub$$sub2 = _asn1$sub$17$sub$$sub.sub[3]) === null || _asn1$sub$17$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$17$sub$$sub3 = _asn1$sub$17$sub$$sub2.sub[1]) === null || _asn1$sub$17$sub$$sub3 === void 0 ? void 0 : _asn1$sub$17$sub$$sub3.stream.enc.subarray(asn1.sub[0].sub[1].sub[0].sub[3].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[1].header, asn1.sub[0].sub[1].sub[0].sub[3].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[1].header + asn1.sub[0].sub[1].sub[0].sub[3].sub[1].length)
              },
              width: (_asn1$sub$18 = asn1.sub[0]) === null || _asn1$sub$18 === void 0 ? void 0 : (_asn1$sub$18$sub$ = _asn1$sub$18.sub[1]) === null || _asn1$sub$18$sub$ === void 0 ? void 0 : (_asn1$sub$18$sub$$sub = _asn1$sub$18$sub$.sub[0]) === null || _asn1$sub$18$sub$$sub === void 0 ? void 0 : (_asn1$sub$18$sub$$sub2 = _asn1$sub$18$sub$$sub.sub[3]) === null || _asn1$sub$18$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$18$sub$$sub3 = _asn1$sub$18$sub$$sub2.sub[2]) === null || _asn1$sub$18$sub$$sub3 === void 0 ? void 0 : _asn1$sub$18$sub$$sub3.stream.parseInteger(asn1.sub[0].sub[1].sub[0].sub[3].sub[2].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[2].header, asn1.sub[0].sub[1].sub[0].sub[3].sub[2].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[2].header + asn1.sub[0].sub[1].sub[0].sub[3].sub[2].length),
              height: (_asn1$sub$19 = asn1.sub[0]) === null || _asn1$sub$19 === void 0 ? void 0 : (_asn1$sub$19$sub$ = _asn1$sub$19.sub[1]) === null || _asn1$sub$19$sub$ === void 0 ? void 0 : (_asn1$sub$19$sub$$sub = _asn1$sub$19$sub$.sub[0]) === null || _asn1$sub$19$sub$$sub === void 0 ? void 0 : (_asn1$sub$19$sub$$sub2 = _asn1$sub$19$sub$$sub.sub[3]) === null || _asn1$sub$19$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$19$sub$$sub3 = _asn1$sub$19$sub$$sub2.sub[3]) === null || _asn1$sub$19$sub$$sub3 === void 0 ? void 0 : _asn1$sub$19$sub$$sub3.stream.parseInteger(asn1.sub[0].sub[1].sub[0].sub[3].sub[3].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[3].header, asn1.sub[0].sub[1].sub[0].sub[3].sub[3].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[3].header + asn1.sub[0].sub[1].sub[0].sub[3].sub[3].length)
            },
            extDatas: extDatas
          },
          signInfo: {
            cert: decodeCert((_asn1$sub$20 = asn1.sub[0]) === null || _asn1$sub$20 === void 0 ? void 0 : (_asn1$sub$20$sub$ = _asn1$sub$20.sub[1]) === null || _asn1$sub$20$sub$ === void 0 ? void 0 : (_asn1$sub$20$sub$$sub = _asn1$sub$20$sub$.sub[1]) === null || _asn1$sub$20$sub$$sub === void 0 ? void 0 : _asn1$sub$20$sub$$sub.sub[0]),
            signatureAlgorithm: (_asn1$sub$21 = asn1.sub[0]) === null || _asn1$sub$21 === void 0 ? void 0 : (_asn1$sub$21$sub$ = _asn1$sub$21.sub[1]) === null || _asn1$sub$21$sub$ === void 0 ? void 0 : (_asn1$sub$21$sub$$sub = _asn1$sub$21$sub$.sub[1]) === null || _asn1$sub$21$sub$$sub === void 0 ? void 0 : (_asn1$sub$21$sub$$sub2 = _asn1$sub$21$sub$$sub.sub[1]) === null || _asn1$sub$21$sub$$sub2 === void 0 ? void 0 : _asn1$sub$21$sub$$sub2.stream.parseOID(asn1.sub[0].sub[1].sub[1].sub[1].stream.pos + asn1.sub[0].sub[1].sub[1].sub[1].header, asn1.sub[0].sub[1].sub[1].sub[1].stream.pos + asn1.sub[0].sub[1].sub[1].sub[1].header + asn1.sub[0].sub[1].sub[1].sub[1].length),
            signData: (_asn1$sub$22 = asn1.sub[0]) === null || _asn1$sub$22 === void 0 ? void 0 : (_asn1$sub$22$sub$ = _asn1$sub$22.sub[1]) === null || _asn1$sub$22$sub$ === void 0 ? void 0 : (_asn1$sub$22$sub$$sub = _asn1$sub$22$sub$.sub[1]) === null || _asn1$sub$22$sub$$sub === void 0 ? void 0 : (_asn1$sub$22$sub$$sub2 = _asn1$sub$22$sub$$sub.sub[2]) === null || _asn1$sub$22$sub$$sub2 === void 0 ? void 0 : _asn1$sub$22$sub$$sub2.stream.hexDump(asn1.sub[0].sub[1].sub[1].sub[2].stream.pos + asn1.sub[0].sub[1].sub[1].sub[2].header, asn1.sub[0].sub[1].sub[1].sub[2].stream.pos + asn1.sub[0].sub[1].sub[1].sub[2].header + asn1.sub[0].sub[1].sub[1].sub[2].length, false)
          }
        },
        timeInfo: timeInfo,
        dataHash: (_asn1$sub$23 = asn1.sub[0]) === null || _asn1$sub$23 === void 0 ? void 0 : (_asn1$sub$23$sub$ = _asn1$sub$23.sub[3]) === null || _asn1$sub$23$sub$ === void 0 ? void 0 : _asn1$sub$23$sub$.stream.hexDump(asn1.sub[0].sub[3].stream.pos + asn1.sub[0].sub[3].header, asn1.sub[0].sub[3].stream.pos + asn1.sub[0].sub[3].header + asn1.sub[0].sub[3].length, false),
        propertyInfo: (_asn1$sub$24 = asn1.sub[0]) === null || _asn1$sub$24 === void 0 ? void 0 : (_asn1$sub$24$sub$ = _asn1$sub$24.sub[4]) === null || _asn1$sub$24$sub$ === void 0 ? void 0 : _asn1$sub$24$sub$.stream.parseStringUTF(asn1.sub[0].sub[4].stream.pos + asn1.sub[0].sub[4].header, asn1.sub[0].sub[4].stream.pos + asn1.sub[0].sub[4].header + asn1.sub[0].sub[4].length),
        cert: decodeCert((_asn1$sub$25 = asn1.sub[0]) === null || _asn1$sub$25 === void 0 ? void 0 : _asn1$sub$25.sub[5]),
        signatureAlgorithm: (_asn1$sub$26 = asn1.sub[0]) === null || _asn1$sub$26 === void 0 ? void 0 : (_asn1$sub$26$sub$ = _asn1$sub$26.sub[6]) === null || _asn1$sub$26$sub$ === void 0 ? void 0 : _asn1$sub$26$sub$.stream.parseOID(asn1.sub[0].sub[6].stream.pos + asn1.sub[0].sub[6].header, asn1.sub[0].sub[6].stream.pos + asn1.sub[0].sub[6].header + asn1.sub[0].sub[6].length)
      },
      signature: (_asn1$sub$27 = asn1.sub[1]) === null || _asn1$sub$27 === void 0 ? void 0 : _asn1$sub$27.stream.hexDump(asn1.sub[1].stream.pos + asn1.sub[1].header, asn1.sub[1].stream.pos + asn1.sub[1].header + asn1.sub[1].length, false)
    };
  } catch (e) {
    try {
      var _asn1$sub$28, _asn1$sub$28$sub$, _asn1$sub$28$sub$$sub, _asn1$sub$28$sub$$sub2, _asn1$sub$28$sub$$sub3, _asn1$sub$29, _asn1$sub$29$sub$, _asn1$sub$29$sub$$sub, _asn1$sub$29$sub$$sub2, _asn1$sub$30, _asn1$sub$30$sub$, _asn1$sub$30$sub$$sub, _asn1$sub$31, _asn1$sub$32, _asn1$sub$32$sub$, _asn1$sub$33, _asn1$sub$33$sub$, _asn1$sub$33$sub$$sub, _asn1$sub$33$sub$$sub2, _asn1$sub$33$sub$$sub3, _asn1$sub$34, _asn1$sub$34$sub$, _asn1$sub$34$sub$$sub, _asn1$sub$34$sub$$sub2, _asn1$sub$34$sub$$sub3, _asn1$sub$35, _asn1$sub$35$sub$, _asn1$sub$35$sub$$sub, _asn1$sub$35$sub$$sub2, _asn1$sub$35$sub$$sub3, _asn1$sub$36, _asn1$sub$36$sub$, _asn1$sub$36$sub$$sub, _asn1$sub$36$sub$$sub2, _asn1$sub$37, _asn1$sub$37$sub$, _asn1$sub$37$sub$$sub, _asn1$sub$37$sub$$sub2, _asn1$sub$37$sub$$sub3, _asn1$sub$38, _asn1$sub$38$sub$, _asn1$sub$38$sub$$sub, _asn1$sub$38$sub$$sub2, _asn1$sub$38$sub$$sub3, _asn1$sub$39, _asn1$sub$39$sub$, _asn1$sub$39$sub$$sub, _asn1$sub$39$sub$$sub2, _asn1$sub$39$sub$$sub3, _asn1$sub$40, _asn1$sub$40$sub$, _asn1$sub$40$sub$$sub, _asn1$sub$40$sub$$sub2, _asn1$sub$40$sub$$sub3, _asn1$sub$41, _asn1$sub$41$sub$, _asn1$sub$41$sub$$sub, _asn1$sub$41$sub$$sub2, _asn1$sub$41$sub$$sub3, _asn1$sub$42, _asn1$sub$42$sub$, _asn1$sub$42$sub$$sub, _asn1$sub$42$sub$$sub2, _asn1$sub$42$sub$$sub3, _asn1$sub$43, _asn1$sub$43$sub$, _asn1$sub$43$sub$$sub, _asn1$sub$43$sub$$sub2, _asn1$sub$43$sub$$sub3, _asn1$sub$44, _asn1$sub$44$sub$, _asn1$sub$44$sub$$sub, _asn1$sub$44$sub$$sub2, _asn1$sub$44$sub$$sub3, _asn1$sub$45, _asn1$sub$45$sub$, _asn1$sub$45$sub$$sub, _asn1$sub$45$sub$$sub2, _asn1$sub$45$sub$$sub3, _asn1$sub$46, _asn1$sub$46$sub$, _asn1$sub$46$sub$$sub, _asn1$sub$46$sub$$sub2, _asn1$sub$46$sub$$sub3, _asn1$sub$47, _asn1$sub$47$sub$, _asn1$sub$48, _asn1$sub$48$sub$, _asn1$sub$48$sub$$sub, _asn1$sub$49, _asn1$sub$49$sub$, _asn1$sub$49$sub$$sub, _asn1$sub$50, _asn1$sub$50$sub$, _asn1$sub$51, _asn1$sub$51$sub$, _asn1$sub$52, _asn1$sub$53, _asn1$sub$54;
      //V4
      var certListType = (_asn1$sub$28 = asn1.sub[0]) === null || _asn1$sub$28 === void 0 ? void 0 : (_asn1$sub$28$sub$ = _asn1$sub$28.sub[1]) === null || _asn1$sub$28$sub$ === void 0 ? void 0 : (_asn1$sub$28$sub$$sub = _asn1$sub$28$sub$.sub[0]) === null || _asn1$sub$28$sub$$sub === void 0 ? void 0 : (_asn1$sub$28$sub$$sub2 = _asn1$sub$28$sub$$sub.sub[2]) === null || _asn1$sub$28$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$28$sub$$sub3 = _asn1$sub$28$sub$$sub2.sub[2]) === null || _asn1$sub$28$sub$$sub3 === void 0 ? void 0 : _asn1$sub$28$sub$$sub3.stream.parseInteger(asn1.sub[0].sub[1].sub[0].sub[2].sub[2].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[2].header, asn1.sub[0].sub[1].sub[0].sub[2].sub[2].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[2].header + asn1.sub[0].sub[1].sub[0].sub[2].sub[2].length);
      var _asn1CertList = (_asn1$sub$29 = asn1.sub[0]) === null || _asn1$sub$29 === void 0 ? void 0 : (_asn1$sub$29$sub$ = _asn1$sub$29.sub[1]) === null || _asn1$sub$29$sub$ === void 0 ? void 0 : (_asn1$sub$29$sub$$sub = _asn1$sub$29$sub$.sub[0]) === null || _asn1$sub$29$sub$$sub === void 0 ? void 0 : (_asn1$sub$29$sub$$sub2 = _asn1$sub$29$sub$$sub.sub[2]) === null || _asn1$sub$29$sub$$sub2 === void 0 ? void 0 : _asn1$sub$29$sub$$sub2.sub[3];
      var _certList = new Array();
      if (_asn1CertList) {
        _asn1CertList.sub.forEach(function (asn1Cert) {
          _certList.push(asn1Cert.stream.parseOctetString(asn1Cert.stream.pos + asn1Cert.header, asn1Cert.stream.pos + asn1Cert.header + asn1Cert.length));
        });
      }
      var _asn1ExtDatas = (_asn1$sub$30 = asn1.sub[0]) === null || _asn1$sub$30 === void 0 ? void 0 : (_asn1$sub$30$sub$ = _asn1$sub$30.sub[1]) === null || _asn1$sub$30$sub$ === void 0 ? void 0 : (_asn1$sub$30$sub$$sub = _asn1$sub$30$sub$.sub[0]) === null || _asn1$sub$30$sub$$sub === void 0 ? void 0 : _asn1$sub$30$sub$$sub.sub[4];
      var _extDatas = new Array();
      if (_asn1ExtDatas) {
        _asn1ExtDatas.sub.forEach(function (asn1ExtData) {
          var _asn1ExtData$sub$4, _asn1ExtData$sub$5, _asn1ExtData$sub$6;
          _extDatas.push({
            extnID: (_asn1ExtData$sub$4 = asn1ExtData.sub[0]) === null || _asn1ExtData$sub$4 === void 0 ? void 0 : _asn1ExtData$sub$4.stream.parseOID(asn1ExtData.sub[0].stream.pos + asn1ExtData.sub[0].header, asn1ExtData.sub[0].stream.pos + asn1ExtData.sub[0].header + asn1ExtData.sub[0].length),
            critical: (_asn1ExtData$sub$5 = asn1ExtData.sub[1]) === null || _asn1ExtData$sub$5 === void 0 ? void 0 : _asn1ExtData$sub$5.stream.parseInteger(asn1ExtData.sub[1].stream.pos + asn1ExtData.sub[1].header, asn1ExtData.sub[1].stream.pos + asn1ExtData.sub[1].header + asn1ExtData.sub[1].length),
            extnValue: (_asn1ExtData$sub$6 = asn1ExtData.sub[2]) === null || _asn1ExtData$sub$6 === void 0 ? void 0 : _asn1ExtData$sub$6.stream.parseOctetString(asn1ExtData.sub[2].stream.pos + asn1ExtData.sub[2].header, asn1ExtData.sub[2].stream.pos + asn1ExtData.sub[2].header + asn1ExtData.sub[2].length)
          });
        });
      }
      SES_Signature = {
        realVersion: 4,
        toSignDer: (_asn1$sub$31 = asn1.sub[0]) === null || _asn1$sub$31 === void 0 ? void 0 : _asn1$sub$31.stream.enc.subarray(asn1.sub[0].stream.pos, asn1.sub[0].stream.pos + asn1.sub[0].header + asn1.sub[0].length),
        toSign: {
          version: (_asn1$sub$32 = asn1.sub[0]) === null || _asn1$sub$32 === void 0 ? void 0 : (_asn1$sub$32$sub$ = _asn1$sub$32.sub[0]) === null || _asn1$sub$32$sub$ === void 0 ? void 0 : _asn1$sub$32$sub$.stream.parseInteger(asn1.sub[0].sub[0].stream.pos + asn1.sub[0].sub[0].header, asn1.sub[0].sub[0].stream.pos + asn1.sub[0].sub[0].header + asn1.sub[0].sub[0].length),
          eseal: {
            esealInfo: {
              header: {
                ID: (_asn1$sub$33 = asn1.sub[0]) === null || _asn1$sub$33 === void 0 ? void 0 : (_asn1$sub$33$sub$ = _asn1$sub$33.sub[1]) === null || _asn1$sub$33$sub$ === void 0 ? void 0 : (_asn1$sub$33$sub$$sub = _asn1$sub$33$sub$.sub[0]) === null || _asn1$sub$33$sub$$sub === void 0 ? void 0 : (_asn1$sub$33$sub$$sub2 = _asn1$sub$33$sub$$sub.sub[0]) === null || _asn1$sub$33$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$33$sub$$sub3 = _asn1$sub$33$sub$$sub2.sub[0]) === null || _asn1$sub$33$sub$$sub3 === void 0 ? void 0 : _asn1$sub$33$sub$$sub3.stream.parseStringUTF(asn1.sub[0].sub[1].sub[0].sub[0].sub[0].stream.pos + asn1.sub[0].sub[1].sub[0].sub[0].sub[0].header, asn1.sub[0].sub[1].sub[0].sub[0].sub[0].stream.pos + asn1.sub[0].sub[1].sub[0].sub[0].sub[0].header + asn1.sub[0].sub[1].sub[0].sub[0].sub[0].length),
                version: (_asn1$sub$34 = asn1.sub[0]) === null || _asn1$sub$34 === void 0 ? void 0 : (_asn1$sub$34$sub$ = _asn1$sub$34.sub[1]) === null || _asn1$sub$34$sub$ === void 0 ? void 0 : (_asn1$sub$34$sub$$sub = _asn1$sub$34$sub$.sub[0]) === null || _asn1$sub$34$sub$$sub === void 0 ? void 0 : (_asn1$sub$34$sub$$sub2 = _asn1$sub$34$sub$$sub.sub[0]) === null || _asn1$sub$34$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$34$sub$$sub3 = _asn1$sub$34$sub$$sub2.sub[1]) === null || _asn1$sub$34$sub$$sub3 === void 0 ? void 0 : _asn1$sub$34$sub$$sub3.stream.parseInteger(asn1.sub[0].sub[1].sub[0].sub[0].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[0].sub[1].header, asn1.sub[0].sub[1].sub[0].sub[0].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[0].sub[1].header + asn1.sub[0].sub[1].sub[0].sub[0].sub[1].length),
                Vid: (_asn1$sub$35 = asn1.sub[0]) === null || _asn1$sub$35 === void 0 ? void 0 : (_asn1$sub$35$sub$ = _asn1$sub$35.sub[1]) === null || _asn1$sub$35$sub$ === void 0 ? void 0 : (_asn1$sub$35$sub$$sub = _asn1$sub$35$sub$.sub[0]) === null || _asn1$sub$35$sub$$sub === void 0 ? void 0 : (_asn1$sub$35$sub$$sub2 = _asn1$sub$35$sub$$sub.sub[0]) === null || _asn1$sub$35$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$35$sub$$sub3 = _asn1$sub$35$sub$$sub2.sub[2]) === null || _asn1$sub$35$sub$$sub3 === void 0 ? void 0 : _asn1$sub$35$sub$$sub3.stream.parseStringUTF(asn1.sub[0].sub[1].sub[0].sub[0].sub[2].stream.pos + asn1.sub[0].sub[1].sub[0].sub[0].sub[2].header, asn1.sub[0].sub[1].sub[0].sub[0].sub[2].stream.pos + asn1.sub[0].sub[1].sub[0].sub[0].sub[2].header + asn1.sub[0].sub[1].sub[0].sub[0].sub[2].length)
              },
              esID: (_asn1$sub$36 = asn1.sub[0]) === null || _asn1$sub$36 === void 0 ? void 0 : (_asn1$sub$36$sub$ = _asn1$sub$36.sub[1]) === null || _asn1$sub$36$sub$ === void 0 ? void 0 : (_asn1$sub$36$sub$$sub = _asn1$sub$36$sub$.sub[0]) === null || _asn1$sub$36$sub$$sub === void 0 ? void 0 : (_asn1$sub$36$sub$$sub2 = _asn1$sub$36$sub$$sub.sub[1]) === null || _asn1$sub$36$sub$$sub2 === void 0 ? void 0 : _asn1$sub$36$sub$$sub2.stream.parseStringUTF(asn1.sub[0].sub[1].sub[0].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[1].header, asn1.sub[0].sub[1].sub[0].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[1].header + asn1.sub[0].sub[1].sub[0].sub[1].length),
              property: {
                type: (_asn1$sub$37 = asn1.sub[0]) === null || _asn1$sub$37 === void 0 ? void 0 : (_asn1$sub$37$sub$ = _asn1$sub$37.sub[1]) === null || _asn1$sub$37$sub$ === void 0 ? void 0 : (_asn1$sub$37$sub$$sub = _asn1$sub$37$sub$.sub[0]) === null || _asn1$sub$37$sub$$sub === void 0 ? void 0 : (_asn1$sub$37$sub$$sub2 = _asn1$sub$37$sub$$sub.sub[2]) === null || _asn1$sub$37$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$37$sub$$sub3 = _asn1$sub$37$sub$$sub2.sub[0]) === null || _asn1$sub$37$sub$$sub3 === void 0 ? void 0 : _asn1$sub$37$sub$$sub3.stream.parseInteger(asn1.sub[0].sub[1].sub[0].sub[2].sub[0].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[0].header, asn1.sub[0].sub[1].sub[0].sub[2].sub[0].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[0].header + asn1.sub[0].sub[1].sub[0].sub[2].sub[0].length),
                name: (_asn1$sub$38 = asn1.sub[0]) === null || _asn1$sub$38 === void 0 ? void 0 : (_asn1$sub$38$sub$ = _asn1$sub$38.sub[1]) === null || _asn1$sub$38$sub$ === void 0 ? void 0 : (_asn1$sub$38$sub$$sub = _asn1$sub$38$sub$.sub[0]) === null || _asn1$sub$38$sub$$sub === void 0 ? void 0 : (_asn1$sub$38$sub$$sub2 = _asn1$sub$38$sub$$sub.sub[2]) === null || _asn1$sub$38$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$38$sub$$sub3 = _asn1$sub$38$sub$$sub2.sub[1]) === null || _asn1$sub$38$sub$$sub3 === void 0 ? void 0 : _asn1$sub$38$sub$$sub3.stream.parseStringUTF(asn1.sub[0].sub[1].sub[0].sub[2].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[1].header, asn1.sub[0].sub[1].sub[0].sub[2].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[1].header + asn1.sub[0].sub[1].sub[0].sub[2].sub[1].length),
                certListType: certListType,
                certList: _certList,
                createDate: (_asn1$sub$39 = asn1.sub[0]) === null || _asn1$sub$39 === void 0 ? void 0 : (_asn1$sub$39$sub$ = _asn1$sub$39.sub[1]) === null || _asn1$sub$39$sub$ === void 0 ? void 0 : (_asn1$sub$39$sub$$sub = _asn1$sub$39$sub$.sub[0]) === null || _asn1$sub$39$sub$$sub === void 0 ? void 0 : (_asn1$sub$39$sub$$sub2 = _asn1$sub$39$sub$$sub.sub[2]) === null || _asn1$sub$39$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$39$sub$$sub3 = _asn1$sub$39$sub$$sub2.sub[4]) === null || _asn1$sub$39$sub$$sub3 === void 0 ? void 0 : _asn1$sub$39$sub$$sub3.stream.parseTime(asn1.sub[0].sub[1].sub[0].sub[2].sub[4].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[4].header, asn1.sub[0].sub[1].sub[0].sub[2].sub[4].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[4].header + asn1.sub[0].sub[1].sub[0].sub[2].sub[4].length),
                validStart: (_asn1$sub$40 = asn1.sub[0]) === null || _asn1$sub$40 === void 0 ? void 0 : (_asn1$sub$40$sub$ = _asn1$sub$40.sub[1]) === null || _asn1$sub$40$sub$ === void 0 ? void 0 : (_asn1$sub$40$sub$$sub = _asn1$sub$40$sub$.sub[0]) === null || _asn1$sub$40$sub$$sub === void 0 ? void 0 : (_asn1$sub$40$sub$$sub2 = _asn1$sub$40$sub$$sub.sub[2]) === null || _asn1$sub$40$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$40$sub$$sub3 = _asn1$sub$40$sub$$sub2.sub[5]) === null || _asn1$sub$40$sub$$sub3 === void 0 ? void 0 : _asn1$sub$40$sub$$sub3.stream.parseTime(asn1.sub[0].sub[1].sub[0].sub[2].sub[5].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[5].header, asn1.sub[0].sub[1].sub[0].sub[2].sub[5].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[5].header + asn1.sub[0].sub[1].sub[0].sub[2].sub[5].length),
                validEnd: (_asn1$sub$41 = asn1.sub[0]) === null || _asn1$sub$41 === void 0 ? void 0 : (_asn1$sub$41$sub$ = _asn1$sub$41.sub[1]) === null || _asn1$sub$41$sub$ === void 0 ? void 0 : (_asn1$sub$41$sub$$sub = _asn1$sub$41$sub$.sub[0]) === null || _asn1$sub$41$sub$$sub === void 0 ? void 0 : (_asn1$sub$41$sub$$sub2 = _asn1$sub$41$sub$$sub.sub[2]) === null || _asn1$sub$41$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$41$sub$$sub3 = _asn1$sub$41$sub$$sub2.sub[6]) === null || _asn1$sub$41$sub$$sub3 === void 0 ? void 0 : _asn1$sub$41$sub$$sub3.stream.parseTime(asn1.sub[0].sub[1].sub[0].sub[2].sub[6].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[6].header, asn1.sub[0].sub[1].sub[0].sub[2].sub[6].stream.pos + asn1.sub[0].sub[1].sub[0].sub[2].sub[6].header + asn1.sub[0].sub[1].sub[0].sub[2].sub[6].length)
              },
              picture: {
                type: (_asn1$sub$42 = asn1.sub[0]) === null || _asn1$sub$42 === void 0 ? void 0 : (_asn1$sub$42$sub$ = _asn1$sub$42.sub[1]) === null || _asn1$sub$42$sub$ === void 0 ? void 0 : (_asn1$sub$42$sub$$sub = _asn1$sub$42$sub$.sub[0]) === null || _asn1$sub$42$sub$$sub === void 0 ? void 0 : (_asn1$sub$42$sub$$sub2 = _asn1$sub$42$sub$$sub.sub[3]) === null || _asn1$sub$42$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$42$sub$$sub3 = _asn1$sub$42$sub$$sub2.sub[0]) === null || _asn1$sub$42$sub$$sub3 === void 0 ? void 0 : _asn1$sub$42$sub$$sub3.stream.parseStringUTF(asn1.sub[0].sub[1].sub[0].sub[3].sub[0].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[0].header, asn1.sub[0].sub[1].sub[0].sub[3].sub[0].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[0].header + asn1.sub[0].sub[1].sub[0].sub[3].sub[0].length),
                data: {
                  hex: (_asn1$sub$43 = asn1.sub[0]) === null || _asn1$sub$43 === void 0 ? void 0 : (_asn1$sub$43$sub$ = _asn1$sub$43.sub[1]) === null || _asn1$sub$43$sub$ === void 0 ? void 0 : (_asn1$sub$43$sub$$sub = _asn1$sub$43$sub$.sub[0]) === null || _asn1$sub$43$sub$$sub === void 0 ? void 0 : (_asn1$sub$43$sub$$sub2 = _asn1$sub$43$sub$$sub.sub[3]) === null || _asn1$sub$43$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$43$sub$$sub3 = _asn1$sub$43$sub$$sub2.sub[1]) === null || _asn1$sub$43$sub$$sub3 === void 0 ? void 0 : _asn1$sub$43$sub$$sub3.stream.parseOctetString(asn1.sub[0].sub[1].sub[0].sub[3].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[1].header, asn1.sub[0].sub[1].sub[0].sub[3].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[1].header + asn1.sub[0].sub[1].sub[0].sub[3].sub[1].length),
                  "byte": (_asn1$sub$44 = asn1.sub[0]) === null || _asn1$sub$44 === void 0 ? void 0 : (_asn1$sub$44$sub$ = _asn1$sub$44.sub[1]) === null || _asn1$sub$44$sub$ === void 0 ? void 0 : (_asn1$sub$44$sub$$sub = _asn1$sub$44$sub$.sub[0]) === null || _asn1$sub$44$sub$$sub === void 0 ? void 0 : (_asn1$sub$44$sub$$sub2 = _asn1$sub$44$sub$$sub.sub[3]) === null || _asn1$sub$44$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$44$sub$$sub3 = _asn1$sub$44$sub$$sub2.sub[1]) === null || _asn1$sub$44$sub$$sub3 === void 0 ? void 0 : _asn1$sub$44$sub$$sub3.stream.enc.subarray(asn1.sub[0].sub[1].sub[0].sub[3].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[1].header, asn1.sub[0].sub[1].sub[0].sub[3].sub[1].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[1].header + asn1.sub[0].sub[1].sub[0].sub[3].sub[1].length)
                },
                width: (_asn1$sub$45 = asn1.sub[0]) === null || _asn1$sub$45 === void 0 ? void 0 : (_asn1$sub$45$sub$ = _asn1$sub$45.sub[1]) === null || _asn1$sub$45$sub$ === void 0 ? void 0 : (_asn1$sub$45$sub$$sub = _asn1$sub$45$sub$.sub[0]) === null || _asn1$sub$45$sub$$sub === void 0 ? void 0 : (_asn1$sub$45$sub$$sub2 = _asn1$sub$45$sub$$sub.sub[3]) === null || _asn1$sub$45$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$45$sub$$sub3 = _asn1$sub$45$sub$$sub2.sub[2]) === null || _asn1$sub$45$sub$$sub3 === void 0 ? void 0 : _asn1$sub$45$sub$$sub3.stream.parseInteger(asn1.sub[0].sub[1].sub[0].sub[3].sub[2].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[2].header, asn1.sub[0].sub[1].sub[0].sub[3].sub[2].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[2].header + asn1.sub[0].sub[1].sub[0].sub[3].sub[2].length),
                height: (_asn1$sub$46 = asn1.sub[0]) === null || _asn1$sub$46 === void 0 ? void 0 : (_asn1$sub$46$sub$ = _asn1$sub$46.sub[1]) === null || _asn1$sub$46$sub$ === void 0 ? void 0 : (_asn1$sub$46$sub$$sub = _asn1$sub$46$sub$.sub[0]) === null || _asn1$sub$46$sub$$sub === void 0 ? void 0 : (_asn1$sub$46$sub$$sub2 = _asn1$sub$46$sub$$sub.sub[3]) === null || _asn1$sub$46$sub$$sub2 === void 0 ? void 0 : (_asn1$sub$46$sub$$sub3 = _asn1$sub$46$sub$$sub2.sub[3]) === null || _asn1$sub$46$sub$$sub3 === void 0 ? void 0 : _asn1$sub$46$sub$$sub3.stream.parseInteger(asn1.sub[0].sub[1].sub[0].sub[3].sub[3].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[3].header, asn1.sub[0].sub[1].sub[0].sub[3].sub[3].stream.pos + asn1.sub[0].sub[1].sub[0].sub[3].sub[3].header + asn1.sub[0].sub[1].sub[0].sub[3].sub[3].length)
              },
              extDatas: _extDatas
            },
            cert: decodeCert((_asn1$sub$47 = asn1.sub[0]) === null || _asn1$sub$47 === void 0 ? void 0 : (_asn1$sub$47$sub$ = _asn1$sub$47.sub[1]) === null || _asn1$sub$47$sub$ === void 0 ? void 0 : _asn1$sub$47$sub$.sub[1]),
            signAlgID: (_asn1$sub$48 = asn1.sub[0]) === null || _asn1$sub$48 === void 0 ? void 0 : (_asn1$sub$48$sub$ = _asn1$sub$48.sub[1]) === null || _asn1$sub$48$sub$ === void 0 ? void 0 : (_asn1$sub$48$sub$$sub = _asn1$sub$48$sub$.sub[2]) === null || _asn1$sub$48$sub$$sub === void 0 ? void 0 : _asn1$sub$48$sub$$sub.stream.parseOID(asn1.sub[0].sub[1].sub[2].stream.pos + asn1.sub[0].sub[1].sub[2].header, asn1.sub[0].sub[1].sub[2].stream.pos + asn1.sub[0].sub[1].sub[2].header + asn1.sub[0].sub[1].sub[2].length),
            signedValue: (_asn1$sub$49 = asn1.sub[0]) === null || _asn1$sub$49 === void 0 ? void 0 : (_asn1$sub$49$sub$ = _asn1$sub$49.sub[1]) === null || _asn1$sub$49$sub$ === void 0 ? void 0 : (_asn1$sub$49$sub$$sub = _asn1$sub$49$sub$.sub[3]) === null || _asn1$sub$49$sub$$sub === void 0 ? void 0 : _asn1$sub$49$sub$$sub.stream.hexDump(asn1.sub[0].sub[1].sub[3].stream.pos + asn1.sub[0].sub[1].sub[3].header, asn1.sub[0].sub[1].sub[3].stream.pos + asn1.sub[0].sub[1].sub[3].header + asn1.sub[0].sub[1].sub[3].length, false)
          },
          timeInfo: (_asn1$sub$50 = asn1.sub[0]) === null || _asn1$sub$50 === void 0 ? void 0 : (_asn1$sub$50$sub$ = _asn1$sub$50.sub[2]) === null || _asn1$sub$50$sub$ === void 0 ? void 0 : _asn1$sub$50$sub$.stream.parseTime(asn1.sub[0].sub[2].stream.pos + asn1.sub[0].sub[2].header, asn1.sub[0].sub[2].stream.pos + asn1.sub[0].sub[2].header + asn1.sub[0].sub[2].length, false),
          dataHash: (_asn1$sub$51 = asn1.sub[0]) === null || _asn1$sub$51 === void 0 ? void 0 : (_asn1$sub$51$sub$ = _asn1$sub$51.sub[3]) === null || _asn1$sub$51$sub$ === void 0 ? void 0 : _asn1$sub$51$sub$.stream.hexDump(asn1.sub[0].sub[3].stream.pos + asn1.sub[0].sub[3].header, asn1.sub[0].sub[3].stream.pos + asn1.sub[0].sub[3].header + asn1.sub[0].sub[3].length, false),
          propertyInfo: Uint8ArrayToString(asn1.sub[0].sub[4])
        },
        cert: decodeCert(asn1.sub[1]),
        signatureAlgID: (_asn1$sub$52 = asn1.sub[2]) === null || _asn1$sub$52 === void 0 ? void 0 : _asn1$sub$52.stream.parseOID(asn1.sub[2].stream.pos + asn1.sub[2].header, asn1.sub[2].stream.pos + asn1.sub[2].header + asn1.sub[2].length),
        signature: (_asn1$sub$53 = asn1.sub[3]) === null || _asn1$sub$53 === void 0 ? void 0 : _asn1$sub$53.stream.hexDump(asn1.sub[3].stream.pos + asn1.sub[3].header, asn1.sub[3].stream.pos + asn1.sub[3].header + asn1.sub[3].length, false),
        timpStamp: (_asn1$sub$54 = asn1.sub[4]) === null || _asn1$sub$54 === void 0 ? void 0 : _asn1$sub$54.stream.parseTime(asn1.sub[4].stream.pos + asn1.sub[4].header, asn1.sub[4].stream.pos + asn1.sub[4].header + asn1.sub[4].length)
      };
    } catch (e) {
      console.log(e);
      SES_Signature = {};
    }
  }
  return SES_Signature;
};
var decodeCert = function decodeCert(asn1, offset) {
  try {
    var _asn1PublicKeyInfo$su, _asn1PublicKeyInfo$su2;
    var asn1Subject = asn1.sub[0].sub[0].sub[5];
    var subject = new Map();
    asn1Subject.sub.forEach(function (element) {
      var _element$sub$0$sub$;
      var key = element.sub[0].sub[0].content().split('\n')[0];
      var value = (_element$sub$0$sub$ = element.sub[0].sub[1]) === null || _element$sub$0$sub$ === void 0 ? void 0 : _element$sub$0$sub$.stream.parseStringUTF(element.sub[0].sub[1].stream.pos + element.sub[0].sub[1].header, element.sub[0].sub[1].stream.pos + element.sub[0].sub[1].header + element.sub[0].sub[1].length);
      subject.set(key, value);
    });
    var asn1PublicKeyInfo = asn1.sub[0].sub[0].sub[6];
    return {
      subject: subject,
      commonName: subject.get('2.5.4.3'),
      subjectPublicKeyInfo: {
        algorithm: (_asn1PublicKeyInfo$su = asn1PublicKeyInfo.sub[0]) === null || _asn1PublicKeyInfo$su === void 0 ? void 0 : _asn1PublicKeyInfo$su.stream.parseOID(asn1PublicKeyInfo.sub[0].stream.pos + asn1PublicKeyInfo.sub[0].header, asn1PublicKeyInfo.sub[0].stream.pos + asn1PublicKeyInfo.sub[0].header + asn1PublicKeyInfo.sub[0].length),
        subjectPublicKey: (_asn1PublicKeyInfo$su2 = asn1PublicKeyInfo.sub[1]) === null || _asn1PublicKeyInfo$su2 === void 0 ? void 0 : _asn1PublicKeyInfo$su2.stream.hexDump(asn1PublicKeyInfo.sub[1].stream.pos + asn1PublicKeyInfo.sub[1].header, asn1PublicKeyInfo.sub[1].stream.pos + asn1PublicKeyInfo.sub[1].header + asn1PublicKeyInfo.sub[1].length)
      }
    };
  } catch (e) {
    console.log(e);
    return {};
  }
};
var Uint8ArrayToString = function Uint8ArrayToString(fileData) {
  var dataString = '';
  for (var i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }
  return dataString;
};

var unzipOfd = function unzipOfd(file) {
  return new Promise(function (resolve, reject) {
    JsZip.loadAsync(file).then(function (zip) {
      resolve(zip);
    }, function (e) {
      reject(e);
    });
  });
};
var getDocRoots = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(zip) {
    var data, docbodys, array;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getJsonFromXmlContent(zip, 'OFD.xml');
        case 2:
          data = _context.sent;
          docbodys = data['json']['ofd:OFD']['ofd:DocBody'];
          array = [];
          array = array.concat(docbodys);
          return _context.abrupt("return", [zip, array]);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getDocRoots(_x) {
    return _ref.apply(this, arguments);
  };
}();
var parseSingleDoc = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref2) {
    var _ref4, zip, array, docs, _iterator, _step, docbody, res;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _ref4 = _slicedToArray(_ref2, 2), zip = _ref4[0], array = _ref4[1];
          docs = [];
          _iterator = _createForOfIteratorHelper(array);
          _context2.prev = 3;
          _iterator.s();
        case 5:
          if ((_step = _iterator.n()).done) {
            _context2.next = 29;
            break;
          }
          docbody = _step.value;
          if (!docbody) {
            _context2.next = 27;
            break;
          }
          _context2.next = 10;
          return doGetDocRoot(zip, docbody);
        case 10:
          res = _context2.sent;
          _context2.next = 13;
          return getDocument(res);
        case 13:
          res = _context2.sent;
          _context2.next = 16;
          return getDocumentRes(res);
        case 16:
          res = _context2.sent;
          _context2.next = 19;
          return getPublicRes(res);
        case 19:
          res = _context2.sent;
          _context2.next = 22;
          return getTemplatePage(res);
        case 22:
          res = _context2.sent;
          _context2.next = 25;
          return getPage(res);
        case 25:
          res = _context2.sent;
          docs.push(res);
        case 27:
          _context2.next = 5;
          break;
        case 29:
          _context2.next = 34;
          break;
        case 31:
          _context2.prev = 31;
          _context2.t0 = _context2["catch"](3);
          _iterator.e(_context2.t0);
        case 34:
          _context2.prev = 34;
          _iterator.f();
          return _context2.finish(34);
        case 37:
          return _context2.abrupt("return", docs);
        case 38:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 31, 34, 37]]);
  }));
  return function parseSingleDoc(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
var doGetDocRoot = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(zip, docbody) {
    var docRoot, doc, signatures, stampAnnot, stampAnnotArray, _iterator2, _step2, stamp, stampObjs, _iterator3, _step3, stampObj, img, stampArray, _iterator4, _step4, annot, _stampObj;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          docRoot = docbody['ofd:DocRoot'];
          docRoot = replaceFirstSlash(docRoot);
          doc = docRoot.split('/')[0];
          signatures = docbody['ofd:Signatures'];
          _context3.next = 6;
          return getSignature(zip, signatures, doc);
        case 6:
          stampAnnot = _context3.sent;
          stampAnnotArray = {};
          _iterator2 = _createForOfIteratorHelper(stampAnnot);
          _context3.prev = 9;
          _iterator2.s();
        case 11:
          if ((_step2 = _iterator2.n()).done) {
            _context3.next = 25;
            break;
          }
          stamp = _step2.value;
          if (!(stamp.sealObj && Object.keys(stamp.sealObj).length > 0)) {
            _context3.next = 23;
            break;
          }
          if (!(stamp.sealObj.type === 'ofd')) {
            _context3.next = 22;
            break;
          }
          _context3.next = 17;
          return getSealDocumentObj(stamp);
        case 17:
          stampObjs = _context3.sent;
          _iterator3 = _createForOfIteratorHelper(stampObjs);
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              stampObj = _step3.value;
              stamp.stampAnnot.boundary = parseStBox(stamp.stampAnnot['@_Boundary']);
              //console.log(stamp.stampAnnot.boundary)
              stamp.stampAnnot.pageRef = stamp.stampAnnot['@_PageRef'];
              if (!stampAnnotArray[stamp.stampAnnot['@_PageRef']]) {
                stampAnnotArray[stamp.stampAnnot['@_PageRef']] = [];
              }
              stampAnnotArray[stamp.stampAnnot['@_PageRef']].push({
                type: 'ofd',
                obj: stampObj,
                stamp: stamp
              });
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          _context3.next = 23;
          break;
        case 22:
          if (stamp.sealObj.type === 'png') {
            img = 'data:image/png;base64,' + btoa(String.fromCharCode.apply(null, stamp.sealObj.ofdArray));
            stampArray = [];
            stampArray = stampArray.concat(stamp.stampAnnot);
            _iterator4 = _createForOfIteratorHelper(stampArray);
            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                annot = _step4.value;
                if (annot) {
                  _stampObj = {
                    img: img,
                    pageId: annot['@_PageRef'],
                    boundary: parseStBox(annot['@_Boundary']),
                    clip: parseStBox(annot['@_Clip'])
                  };
                  if (!stampAnnotArray[annot['@_PageRef']]) {
                    stampAnnotArray[annot['@_PageRef']] = [];
                  }
                  stampAnnotArray[annot['@_PageRef']].push({
                    type: 'png',
                    obj: _stampObj,
                    stamp: stamp
                  });
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          }
        case 23:
          _context3.next = 11;
          break;
        case 25:
          _context3.next = 30;
          break;
        case 27:
          _context3.prev = 27;
          _context3.t0 = _context3["catch"](9);
          _iterator2.e(_context3.t0);
        case 30:
          _context3.prev = 30;
          _iterator2.f();
          return _context3.finish(30);
        case 33:
          return _context3.abrupt("return", [zip, doc, docRoot, stampAnnotArray]);
        case 34:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[9, 27, 30, 33]]);
  }));
  return function doGetDocRoot(_x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}();
var getDocument = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref6) {
    var _ref8, zip, doc, docRoot, stampAnnot, data, documentObj, annotations, array, annoBase, annotationObjs;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _ref8 = _slicedToArray(_ref6, 4), zip = _ref8[0], doc = _ref8[1], docRoot = _ref8[2], stampAnnot = _ref8[3];
          _context4.next = 3;
          return getJsonFromXmlContent(zip, docRoot);
        case 3:
          data = _context4.sent;
          documentObj = data['json']['ofd:Document'];
          annotations = documentObj['ofd:Annotations'];
          array = [];
          if (!annotations) {
            _context4.next = 15;
            break;
          }
          if (annotations.indexOf('/') !== -1) {
            annoBase = annotations.substring(0, annotations.indexOf('/'));
          }
          if (annotations.indexOf(doc) === -1) {
            annotations = "".concat(doc, "/").concat(annotations);
          }
          if (!zip.files[annotations]) {
            _context4.next = 15;
            break;
          }
          _context4.next = 13;
          return getJsonFromXmlContent(zip, annotations);
        case 13:
          annotations = _context4.sent;
          array = array.concat(annotations['json']['ofd:Annotations']['ofd:Page']);
        case 15:
          _context4.next = 17;
          return getAnnotations(annoBase, array, doc, zip);
        case 17:
          annotationObjs = _context4.sent;
          return _context4.abrupt("return", [zip, doc, documentObj, stampAnnot, annotationObjs]);
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getDocument(_x5) {
    return _ref7.apply(this, arguments);
  };
}();
var getAnnotations = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(annoBase, annotations, doc, zip) {
    var annotationObjs, _iterator5, _step5, anno, pageId, fileLoc, data, array, _iterator6, _step6, annot, type, visible, appearance, appearanceObj;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          annotationObjs = {};
          _iterator5 = _createForOfIteratorHelper(annotations);
          _context5.prev = 2;
          _iterator5.s();
        case 4:
          if ((_step5 = _iterator5.n()).done) {
            _context5.next = 44;
            break;
          }
          anno = _step5.value;
          if (anno) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("continue", 42);
        case 8:
          pageId = anno['@_PageID'];
          fileLoc = anno['ofd:FileLoc'];
          fileLoc = replaceFirstSlash(fileLoc);
          if (annoBase && fileLoc.indexOf(annoBase) === -1) {
            fileLoc = "".concat(annoBase, "/").concat(fileLoc);
          }
          if (fileLoc.indexOf(doc) === -1) {
            fileLoc = "".concat(doc, "/").concat(fileLoc);
          }
          if (!zip.files[fileLoc]) {
            _context5.next = 42;
            break;
          }
          _context5.next = 16;
          return getJsonFromXmlContent(zip, fileLoc);
        case 16:
          data = _context5.sent;
          array = [];
          array = array.concat(data['json']['ofd:PageAnnot']['ofd:Annot']);
          if (!annotationObjs[pageId]) {
            annotationObjs[pageId] = [];
          }
          _iterator6 = _createForOfIteratorHelper(array);
          _context5.prev = 21;
          _iterator6.s();
        case 23:
          if ((_step6 = _iterator6.n()).done) {
            _context5.next = 34;
            break;
          }
          annot = _step6.value;
          if (annot) {
            _context5.next = 27;
            break;
          }
          return _context5.abrupt("continue", 32);
        case 27:
          type = annot['@_Type'];
          visible = annot['@_Visible'] ? annot['@_Visible'] : true;
          appearance = annot['ofd:Appearance'];
          appearanceObj = {
            type: type,
            appearance: appearance,
            visible: visible
          };
          annotationObjs[pageId].push(appearanceObj);
        case 32:
          _context5.next = 23;
          break;
        case 34:
          _context5.next = 39;
          break;
        case 36:
          _context5.prev = 36;
          _context5.t0 = _context5["catch"](21);
          _iterator6.e(_context5.t0);
        case 39:
          _context5.prev = 39;
          _iterator6.f();
          return _context5.finish(39);
        case 42:
          _context5.next = 4;
          break;
        case 44:
          _context5.next = 49;
          break;
        case 46:
          _context5.prev = 46;
          _context5.t1 = _context5["catch"](2);
          _iterator5.e(_context5.t1);
        case 49:
          _context5.prev = 49;
          _iterator5.f();
          return _context5.finish(49);
        case 52:
          return _context5.abrupt("return", annotationObjs);
        case 53:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 46, 49, 52], [21, 36, 39, 42]]);
  }));
  return function getAnnotations(_x6, _x7, _x8, _x9) {
    return _ref9.apply(this, arguments);
  };
}();
var getDocumentRes = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref10) {
    var _ref12, zip, doc, Document, stampAnnot, annotationObjs, documentResPath, fontResObj, drawParamResObj, multiMediaResObj, data, documentResObj;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _ref12 = _slicedToArray(_ref10, 5), zip = _ref12[0], doc = _ref12[1], Document = _ref12[2], stampAnnot = _ref12[3], annotationObjs = _ref12[4];
          documentResPath = Document['ofd:CommonData']['ofd:DocumentRes'];
          fontResObj = {};
          drawParamResObj = {};
          multiMediaResObj = {};
          if (!documentResPath) {
            _context6.next = 21;
            break;
          }
          if (documentResPath.indexOf(doc) == -1) {
            documentResPath = "".concat(doc, "/").concat(documentResPath);
          }
          if (!zip.files[documentResPath]) {
            _context6.next = 21;
            break;
          }
          _context6.next = 10;
          return getJsonFromXmlContent(zip, documentResPath);
        case 10:
          data = _context6.sent;
          documentResObj = data['json']['ofd:Res'];
          _context6.next = 14;
          return getFont(documentResObj);
        case 14:
          fontResObj = _context6.sent;
          _context6.next = 17;
          return getDrawParam(documentResObj);
        case 17:
          drawParamResObj = _context6.sent;
          _context6.next = 20;
          return getMultiMediaRes(zip, documentResObj, doc);
        case 20:
          multiMediaResObj = _context6.sent;
        case 21:
          return _context6.abrupt("return", [zip, doc, Document, stampAnnot, annotationObjs, fontResObj, drawParamResObj, multiMediaResObj]);
        case 22:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getDocumentRes(_x10) {
    return _ref11.apply(this, arguments);
  };
}();
var getPublicRes = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(_ref13) {
    var _ref15, zip, doc, Document, stampAnnot, annotationObjs, fontResObj, drawParamResObj, multiMediaResObj, publicResPath, data, publicResObj, fontObj, drawParamObj, multiMediaObj;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _ref15 = _slicedToArray(_ref13, 8), zip = _ref15[0], doc = _ref15[1], Document = _ref15[2], stampAnnot = _ref15[3], annotationObjs = _ref15[4], fontResObj = _ref15[5], drawParamResObj = _ref15[6], multiMediaResObj = _ref15[7];
          publicResPath = Document['ofd:CommonData']['ofd:PublicRes'];
          if (!publicResPath) {
            _context7.next = 21;
            break;
          }
          if (publicResPath.indexOf(doc) == -1) {
            publicResPath = "".concat(doc, "/").concat(publicResPath);
          }
          if (!zip.files[publicResPath]) {
            _context7.next = 21;
            break;
          }
          _context7.next = 7;
          return getJsonFromXmlContent(zip, publicResPath);
        case 7:
          data = _context7.sent;
          publicResObj = data['json']['ofd:Res'];
          _context7.next = 11;
          return getFont(publicResObj);
        case 11:
          fontObj = _context7.sent;
          fontResObj = Object.assign(fontResObj, fontObj);
          _context7.next = 15;
          return getDrawParam(publicResObj);
        case 15:
          drawParamObj = _context7.sent;
          drawParamResObj = Object.assign(drawParamResObj, drawParamObj);
          _context7.next = 19;
          return getMultiMediaRes(zip, publicResObj, doc);
        case 19:
          multiMediaObj = _context7.sent;
          multiMediaResObj = Object.assign(multiMediaResObj, multiMediaObj);
        case 21:
          return _context7.abrupt("return", [zip, doc, Document, stampAnnot, annotationObjs, fontResObj, drawParamResObj, multiMediaResObj]);
        case 22:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function getPublicRes(_x11) {
    return _ref14.apply(this, arguments);
  };
}();
var getTemplatePage = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(_ref16) {
    var _ref18, zip, doc, Document, stampAnnot, annotationObjs, fontResObj, drawParamResObj, multiMediaResObj, templatePages, array, tpls, _iterator7, _step7, templatePage, pageObj;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _ref18 = _slicedToArray(_ref16, 8), zip = _ref18[0], doc = _ref18[1], Document = _ref18[2], stampAnnot = _ref18[3], annotationObjs = _ref18[4], fontResObj = _ref18[5], drawParamResObj = _ref18[6], multiMediaResObj = _ref18[7];
          templatePages = Document['ofd:CommonData']['ofd:TemplatePage'];
          array = [];
          array = array.concat(templatePages);
          tpls = {};
          _iterator7 = _createForOfIteratorHelper(array);
          _context8.prev = 6;
          _iterator7.s();
        case 8:
          if ((_step7 = _iterator7.n()).done) {
            _context8.next = 17;
            break;
          }
          templatePage = _step7.value;
          if (!templatePage) {
            _context8.next = 15;
            break;
          }
          _context8.next = 13;
          return parsePage(zip, templatePage, doc);
        case 13:
          pageObj = _context8.sent;
          tpls[Object.keys(pageObj)[0]] = pageObj[Object.keys(pageObj)[0]];
        case 15:
          _context8.next = 8;
          break;
        case 17:
          _context8.next = 22;
          break;
        case 19:
          _context8.prev = 19;
          _context8.t0 = _context8["catch"](6);
          _iterator7.e(_context8.t0);
        case 22:
          _context8.prev = 22;
          _iterator7.f();
          return _context8.finish(22);
        case 25:
          return _context8.abrupt("return", [zip, doc, Document, stampAnnot, annotationObjs, tpls, fontResObj, drawParamResObj, multiMediaResObj]);
        case 26:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[6, 19, 22, 25]]);
  }));
  return function getTemplatePage(_x12) {
    return _ref17.apply(this, arguments);
  };
}();
var getPage = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(_ref19) {
    var _ref21, zip, doc, Document, stampAnnot, annotationObjs, tpls, fontResObj, drawParamResObj, multiMediaResObj, pages, array, res, _iterator8, _step8, page, pageObj, pageId, currentPageStamp, annotationObj;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _ref21 = _slicedToArray(_ref19, 9), zip = _ref21[0], doc = _ref21[1], Document = _ref21[2], stampAnnot = _ref21[3], annotationObjs = _ref21[4], tpls = _ref21[5], fontResObj = _ref21[6], drawParamResObj = _ref21[7], multiMediaResObj = _ref21[8];
          pages = Document['ofd:Pages']['ofd:Page'];
          array = [];
          array = array.concat(pages);
          res = [];
          _iterator8 = _createForOfIteratorHelper(array);
          _context9.prev = 6;
          _iterator8.s();
        case 8:
          if ((_step8 = _iterator8.n()).done) {
            _context9.next = 22;
            break;
          }
          page = _step8.value;
          if (!page) {
            _context9.next = 20;
            break;
          }
          _context9.next = 13;
          return parsePage(zip, page, doc);
        case 13:
          pageObj = _context9.sent;
          pageId = Object.keys(pageObj)[0];
          currentPageStamp = stampAnnot[pageId];
          if (currentPageStamp) {
            pageObj[pageId].stamp = currentPageStamp;
          }
          annotationObj = annotationObjs[pageId];
          if (annotationObj) {
            pageObj[pageId].annotation = annotationObj;
          }
          res.push(pageObj);
        case 20:
          _context9.next = 8;
          break;
        case 22:
          _context9.next = 27;
          break;
        case 24:
          _context9.prev = 24;
          _context9.t0 = _context9["catch"](6);
          _iterator8.e(_context9.t0);
        case 27:
          _context9.prev = 27;
          _iterator8.f();
          return _context9.finish(27);
        case 30:
          return _context9.abrupt("return", {
            doc: doc,
            document: Document,
            pages: res,
            tpls: tpls,
            stampAnnot: stampAnnot,
            fontResObj: fontResObj,
            drawParamResObj: drawParamResObj,
            multiMediaResObj: multiMediaResObj
          });
        case 31:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[6, 24, 27, 30]]);
  }));
  return function getPage(_x13) {
    return _ref20.apply(this, arguments);
  };
}();
var getFont = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(res) {
    var fonts, fontResObj, fontArray, _iterator9, _step9, font;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          fonts = res['ofd:Fonts'];
          fontResObj = {};
          if (fonts) {
            fontArray = [];
            fontArray = fontArray.concat(fonts['ofd:Font']);
            _iterator9 = _createForOfIteratorHelper(fontArray);
            try {
              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                font = _step9.value;
                if (font) {
                  if (font['@_FamilyName']) {
                    fontResObj[font['@_ID']] = font['@_FamilyName'];
                  } else {
                    fontResObj[font['@_ID']] = font['@_FontName'];
                  }
                }
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }
          }
          return _context10.abrupt("return", fontResObj);
        case 4:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function getFont(_x14) {
    return _ref22.apply(this, arguments);
  };
}();
var getDrawParam = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(res) {
    var drawParams, drawParamResObj, array, _iterator10, _step10, item;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          drawParams = res['ofd:DrawParams'];
          drawParamResObj = {};
          if (drawParams) {
            array = [];
            array = array.concat(drawParams['ofd:DrawParam']);
            _iterator10 = _createForOfIteratorHelper(array);
            try {
              for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                item = _step10.value;
                if (item) {
                  drawParamResObj[item['@_ID']] = {
                    LineWidth: item['@_LineWidth'],
                    FillColor: item['ofd:FillColor'] ? item['ofd:FillColor']['@_Value'] : '',
                    StrokeColor: item['ofd:StrokeColor'] ? item['ofd:StrokeColor']['@_Value'] : '',
                    relative: item['@_Relative']
                  };
                }
              }
            } catch (err) {
              _iterator10.e(err);
            } finally {
              _iterator10.f();
            }
          }
          return _context11.abrupt("return", drawParamResObj);
        case 4:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function getDrawParam(_x15) {
    return _ref23.apply(this, arguments);
  };
}();
var getMultiMediaRes = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(zip, res, doc) {
    var multiMedias, multiMediaResObj, array, _iterator11, _step11, item, file, format, ext, jbig2, img;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          multiMedias = res['ofd:MultiMedias'];
          multiMediaResObj = {};
          if (!multiMedias) {
            _context12.next = 41;
            break;
          }
          array = [];
          array = array.concat(multiMedias['ofd:MultiMedia']);
          _iterator11 = _createForOfIteratorHelper(array);
          _context12.prev = 6;
          _iterator11.s();
        case 8:
          if ((_step11 = _iterator11.n()).done) {
            _context12.next = 33;
            break;
          }
          item = _step11.value;
          if (!item) {
            _context12.next = 31;
            break;
          }
          file = item['ofd:MediaFile'];
          if (res['@_BaseLoc']) {
            if (file.indexOf(res['@_BaseLoc']) === -1) {
              file = "".concat(res['@_BaseLoc'], "/").concat(file);
            }
          }
          if (file.indexOf(doc) === -1) {
            file = "".concat(doc, "/").concat(file);
          }
          if (!(item['@_Type'].toLowerCase() === 'image')) {
            _context12.next = 30;
            break;
          }
          format = item['@_Format'];
          ext = getExtensionByPath(file);
          if (!(format && (format.toLowerCase() === 'gbig2' || format.toLowerCase() === 'jb2') || ext && (ext.toLowerCase() === 'jb2' || ext.toLowerCase() === 'gbig2'))) {
            _context12.next = 24;
            break;
          }
          _context12.next = 20;
          return parseJbig2ImageFromZip(zip, file);
        case 20:
          jbig2 = _context12.sent;
          multiMediaResObj[item['@_ID']] = jbig2;
          _context12.next = 28;
          break;
        case 24:
          _context12.next = 26;
          return parseOtherImageFromZip(zip, file);
        case 26:
          img = _context12.sent;
          multiMediaResObj[item['@_ID']] = {
            img: img,
            format: 'png'
          };
        case 28:
          _context12.next = 31;
          break;
        case 30:
          multiMediaResObj[item['@_ID']] = file;
        case 31:
          _context12.next = 8;
          break;
        case 33:
          _context12.next = 38;
          break;
        case 35:
          _context12.prev = 35;
          _context12.t0 = _context12["catch"](6);
          _iterator11.e(_context12.t0);
        case 38:
          _context12.prev = 38;
          _iterator11.f();
          return _context12.finish(38);
        case 41:
          return _context12.abrupt("return", multiMediaResObj);
        case 42:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[6, 35, 38, 41]]);
  }));
  return function getMultiMediaRes(_x16, _x17, _x18) {
    return _ref24.apply(this, arguments);
  };
}();
var parsePage = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(zip, obj, doc) {
    var pagePath, data, pageObj;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          pagePath = obj['@_BaseLoc'];
          if (pagePath.indexOf(doc) == -1) {
            pagePath = "".concat(doc, "/").concat(pagePath);
          }
          _context13.next = 4;
          return getJsonFromXmlContent(zip, pagePath);
        case 4:
          data = _context13.sent;
          pageObj = {};
          pageObj[obj['@_ID']] = {
            json: data['json']['ofd:Page'],
            xml: data['xml']
          };
          return _context13.abrupt("return", pageObj);
        case 8:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function parsePage(_x19, _x20, _x21) {
    return _ref25.apply(this, arguments);
  };
}();
var getSignature = /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(zip, signatures, doc) {
    var stampAnnot, data, signature, signatureArray, _iterator12, _step12, sign, signatureLoc, signatureID;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          stampAnnot = [];
          if (!signatures) {
            _context14.next = 37;
            break;
          }
          signatures = replaceFirstSlash(signatures);
          if (signatures.indexOf(doc) === -1) {
            signatures = "".concat(doc, "/").concat(signatures);
          }
          if (!zip.files[signatures]) {
            _context14.next = 37;
            break;
          }
          _context14.next = 7;
          return getJsonFromXmlContent(zip, signatures);
        case 7:
          data = _context14.sent;
          signature = data['json']['ofd:Signatures']['ofd:Signature'];
          signatureArray = [];
          signatureArray = signatureArray.concat(signature);
          _iterator12 = _createForOfIteratorHelper(signatureArray);
          _context14.prev = 12;
          _iterator12.s();
        case 14:
          if ((_step12 = _iterator12.n()).done) {
            _context14.next = 29;
            break;
          }
          sign = _step12.value;
          if (!sign) {
            _context14.next = 27;
            break;
          }
          signatureLoc = sign['@_BaseLoc'];
          signatureID = sign['@_ID'];
          signatureLoc = replaceFirstSlash(signatureLoc);
          if (signatureLoc.indexOf('Signs') === -1) {
            signatureLoc = "Signs/".concat(signatureLoc);
          }
          if (signatureLoc.indexOf(doc) === -1) {
            signatureLoc = "".concat(doc, "/").concat(signatureLoc);
          }
          _context14.t0 = stampAnnot;
          _context14.next = 25;
          return getSignatureData(zip, signatureLoc, signatureID);
        case 25:
          _context14.t1 = _context14.sent;
          _context14.t0.push.call(_context14.t0, _context14.t1);
        case 27:
          _context14.next = 14;
          break;
        case 29:
          _context14.next = 34;
          break;
        case 31:
          _context14.prev = 31;
          _context14.t2 = _context14["catch"](12);
          _iterator12.e(_context14.t2);
        case 34:
          _context14.prev = 34;
          _iterator12.f();
          return _context14.finish(34);
        case 37:
          return _context14.abrupt("return", stampAnnot);
        case 38:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[12, 31, 34, 37]]);
  }));
  return function getSignature(_x22, _x23, _x24) {
    return _ref26.apply(this, arguments);
  };
}();
var getFileData = /*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(zip, name) {
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          return _context15.abrupt("return", zip.files[name].async('uint8array'));
        case 1:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return function getFileData(_x25, _x26) {
    return _ref27.apply(this, arguments);
  };
}();
var getSignatureData = /*#__PURE__*/function () {
  var _ref28 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(zip, signature, signatureID) {
    var data, signedValue, sealObj, checkMethod, arr;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return getJsonFromXmlContent(zip, signature);
        case 2:
          data = _context17.sent;
          signedValue = data['json']['ofd:Signature']['ofd:SignedValue'];
          signedValue = signedValue.toString().replace('/', '');
          if (!zip.files[signedValue]) {
            signedValue = "".concat(signature.substring(0, signature.lastIndexOf('/')), "/").concat(signedValue);
          }
          _context17.next = 8;
          return parseSesSignature(zip, signedValue);
        case 8:
          sealObj = _context17.sent;
          checkMethod = data['json']['ofd:Signature']['ofd:SignedInfo']['ofd:References']['@_CheckMethod'];
          global.toBeChecked = new Map();
          arr = new Array();
          data['json']['ofd:Signature']['ofd:SignedInfo']['ofd:References']['ofd:Reference'].forEach( /*#__PURE__*/function () {
            var _ref29 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(reference) {
              var hashed, key, fileData;
              return _regeneratorRuntime().wrap(function _callee16$(_context16) {
                while (1) switch (_context16.prev = _context16.next) {
                  case 0:
                    if (!(Object.keys(reference).length == 0 || Object.keys(reference['@_FileRef']).length == 0)) {
                      _context16.next = 2;
                      break;
                    }
                    return _context16.abrupt("return", true);
                  case 2:
                    hashed = reference['ofd:CheckValue'];
                    key = reference['@_FileRef'].replace('/', '');
                    _context16.next = 6;
                    return getFileData(zip, key);
                  case 6:
                    fileData = _context16.sent;
                    arr.push({
                      fileData: fileData,
                      hashed: hashed,
                      checkMethod: checkMethod
                    });
                  case 8:
                  case "end":
                    return _context16.stop();
                }
              }, _callee16);
            }));
            return function (_x30) {
              return _ref29.apply(this, arguments);
            };
          }());
          global.toBeChecked.set(signatureID, arr);
          return _context17.abrupt("return", {
            stampAnnot: data['json']['ofd:Signature']['ofd:SignedInfo']['ofd:StampAnnot'],
            sealObj: sealObj,
            signedInfo: {
              signatureID: signatureID,
              VerifyRet: sealObj.verifyRet,
              Provider: data['json']['ofd:Signature']['ofd:SignedInfo']['ofd:Provider'],
              SignatureMethod: data['json']['ofd:Signature']['ofd:SignedInfo']['ofd:SignatureMethod'],
              SignatureDateTime: data['json']['ofd:Signature']['ofd:SignedInfo']['ofd:SignatureDateTime']
            }
          });
        case 15:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return function getSignatureData(_x27, _x28, _x29) {
    return _ref28.apply(this, arguments);
  };
}();
var getSealDocumentObj = function getSealDocumentObj(stampAnnot) {
  var _this = this;
  return new Promise(function (resolve, reject) {
    pipeline.call(_this, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
      return _regeneratorRuntime().wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return unzipOfd(stampAnnot.sealObj.ofdArray);
          case 2:
            return _context18.abrupt("return", _context18.sent);
          case 3:
          case "end":
            return _context18.stop();
        }
      }, _callee18);
    })), getDocRoots, parseSingleDoc).then(function (res) {
      resolve(res);
    })["catch"](function (res) {
      reject(res);
    });
  });
};
var getJsonFromXmlContent = /*#__PURE__*/function () {
  var _ref31 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(zip, xmlName) {
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          return _context19.abrupt("return", new Promise(function (resolve, reject) {
            zip.files[xmlName].async('string').then(function (content) {
              var ops = {
                attributeNamePrefix: '@_',
                ignoreAttributes: false,
                parseNodeValue: false,
                trimValues: false
              };
              var jsonObj = parser.parse(content, ops);
              var result = {
                xml: content,
                json: jsonObj
              };
              resolve(result);
            }, function error(e) {
              reject(e);
            });
          }));
        case 1:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  }));
  return function getJsonFromXmlContent(_x31, _x32) {
    return _ref31.apply(this, arguments);
  };
}();
var parseJbig2ImageFromZip = /*#__PURE__*/function () {
  var _ref32 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(zip, name) {
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          return _context20.abrupt("return", new Promise(function (resolve, reject) {
            zip.files[name].async('uint8array').then(function (bytes) {
              var jbig2 = new Jbig2Image();
              var img = jbig2.parse(bytes);
              resolve({
                img: img,
                width: jbig2.width,
                height: jbig2.height,
                format: 'gbig2'
              });
            }, function error(e) {
              reject(e);
            });
          }));
        case 1:
        case "end":
          return _context20.stop();
      }
    }, _callee20);
  }));
  return function parseJbig2ImageFromZip(_x33, _x34) {
    return _ref32.apply(this, arguments);
  };
}();
var parseOtherImageFromZip = /*#__PURE__*/function () {
  var _ref33 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(zip, name) {
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          return _context21.abrupt("return", new Promise(function (resolve, reject) {
            zip.files[name].async('base64').then(function (bytes) {
              var img = 'data:image/png;base64,' + bytes;
              resolve(img);
            }, function error(e) {
              reject(e);
            });
          }));
        case 1:
        case "end":
          return _context21.stop();
      }
    }, _callee21);
  }));
  return function parseOtherImageFromZip(_x35, _x36) {
    return _ref33.apply(this, arguments);
  };
}();

var parseOfdDocument = function parseOfdDocument(options) {
  if (options.ofd instanceof File || options.ofd instanceof ArrayBuffer) {
    doParseOFD(options);
  } else {
    JSZipUtils__namespace.getBinaryContent(options.ofd, function (err, data) {
      if (err) {
        if (options.fail) {
          options.fail(err);
        }
      } else {
        options.ofd = data;
        doParseOFD(options);
      }
    });
  }
};
var doParseOFD = function doParseOFD(options) {
  global.xmlParseFlag = 0;
  pipeline.call(this, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return unzipOfd(options.ofd);
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })), getDocRoots, parseSingleDoc).then(function (res) {
    if (options.success) {
      options.success(res);
    }
  })["catch"](function (res) {
    console.log(res);
    if (options.fail) {
      options.fail(res);
    }
  });
};
var renderOfd = function renderOfd(screenWidth, ofd) {
  var divArray = [];
  if (!ofd) {
    return divArray;
  }
  var _iterator = _createForOfIteratorHelper(ofd.pages),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var page = _step.value;
      var box = calPageBox(screenWidth, ofd.document, page);
      var pageId = Object.keys(page)[0];
      var pageDiv = document.createElement('div');
      pageDiv.id = pageId;
      pageDiv.setAttribute('style', "margin-bottom: 20px;position: relative;width:".concat(box.w, "px;height:").concat(box.h, "px;background: white;"));
      renderPage(pageDiv, page, ofd.tpls, ofd.fontResObj, ofd.drawParamResObj, ofd.multiMediaResObj);
      divArray.push(pageDiv);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return divArray;
};
var renderOfdByScale = function renderOfdByScale(ofd) {
  var divArray = [];
  if (!ofd) {
    return divArray;
  }
  var _iterator2 = _createForOfIteratorHelper(ofd.pages),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var page = _step2.value;
      var box = calPageBoxScale(ofd.document, page);
      var pageId = Object.keys(page)[0];
      var pageDiv = document.createElement('div');
      pageDiv.id = pageId;
      pageDiv.setAttribute('style', "margin-bottom: 20px;position: relative;width:".concat(box.w, "px;height:").concat(box.h, "px;background: white;"));
      renderPage(pageDiv, page, ofd.tpls, ofd.fontResObj, ofd.drawParamResObj, ofd.multiMediaResObj);
      divArray.push(pageDiv);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return divArray;
};

exports.digestCheck = digestCheckProcess;
exports.getPageScale = getPageScale;
exports.parseOfdDocument = parseOfdDocument;
exports.renderOfd = renderOfd;
exports.renderOfdByScale = renderOfdByScale;
exports.setPageScale = setPageScale;
