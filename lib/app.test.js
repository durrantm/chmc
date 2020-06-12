"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getElement = function getElement(obj, path) {
  try {
    return obj[path];
  } catch (_unused) {
    return undefined;
  }
};

var access = function access(objectIn, pathParts) {
  var object = _objectSpread({}, objectIn);

  var _iterator = _createForOfIteratorHelper(pathParts),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var pathPart = _step.value;
      object = getElement(object, pathPart);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return object;
};

var object;
describe('Use a object locator to find an element using:', function () {
  beforeEach(function () {
    object = {
      a: 2,
      b: {
        a: "x",
        b: [1, {
          a: 3
        }]
      }
    };
  });
  it('access(obj, "a") -> 2', function () {
    var pathParts = 'a'.split('.');
    var result = access(object, pathParts);
    expect(result).toBe(2);
  });
  it('access(obj, "b.a") -> "x"', function () {
    var pathParts = 'b.a'.split('.');
    var result = access(object, pathParts);
    expect(result).toBe("x");
  });
  it('access(obj, "b.b.1") -> { a: 3 }', function () {
    var pathParts = 'b.b.1'.split('.');
    object = access(object, pathParts);
    expect(object).toEqual({
      a: 3
    });
  });
  it('access("obj, "b.b.1.a") -> 3', function () {
    var path = 'b.b.1.a';
    var pathParts = path.split('.');
    object = access(object, pathParts);
    expect(object).toEqual(3);
  });
  it('access("obj, "b.b.5.a") -> undefined', function () {
    var path = 'b.b.5.c';
    var pathParts = path.split('.');
    object = access(object, pathParts);
    expect(object).toEqual(undefined);
  });
});