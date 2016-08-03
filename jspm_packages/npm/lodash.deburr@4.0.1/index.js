/* */ 
(function(process) {
  var INFINITY = 1 / 0;
  var symbolTag = '[object Symbol]';
  var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;
  var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
      rsComboSymbolsRange = '\\u20d0-\\u20f0';
  var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';
  var reComboMark = RegExp(rsCombo, 'g');
  var deburredLetters = {
    '\xc0': 'A',
    '\xc1': 'A',
    '\xc2': 'A',
    '\xc3': 'A',
    '\xc4': 'A',
    '\xc5': 'A',
    '\xe0': 'a',
    '\xe1': 'a',
    '\xe2': 'a',
    '\xe3': 'a',
    '\xe4': 'a',
    '\xe5': 'a',
    '\xc7': 'C',
    '\xe7': 'c',
    '\xd0': 'D',
    '\xf0': 'd',
    '\xc8': 'E',
    '\xc9': 'E',
    '\xca': 'E',
    '\xcb': 'E',
    '\xe8': 'e',
    '\xe9': 'e',
    '\xea': 'e',
    '\xeb': 'e',
    '\xcC': 'I',
    '\xcd': 'I',
    '\xce': 'I',
    '\xcf': 'I',
    '\xeC': 'i',
    '\xed': 'i',
    '\xee': 'i',
    '\xef': 'i',
    '\xd1': 'N',
    '\xf1': 'n',
    '\xd2': 'O',
    '\xd3': 'O',
    '\xd4': 'O',
    '\xd5': 'O',
    '\xd6': 'O',
    '\xd8': 'O',
    '\xf2': 'o',
    '\xf3': 'o',
    '\xf4': 'o',
    '\xf5': 'o',
    '\xf6': 'o',
    '\xf8': 'o',
    '\xd9': 'U',
    '\xda': 'U',
    '\xdb': 'U',
    '\xdc': 'U',
    '\xf9': 'u',
    '\xfa': 'u',
    '\xfb': 'u',
    '\xfc': 'u',
    '\xdd': 'Y',
    '\xfd': 'y',
    '\xff': 'y',
    '\xc6': 'Ae',
    '\xe6': 'ae',
    '\xde': 'Th',
    '\xfe': 'th',
    '\xdf': 'ss'
  };
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function('return this')();
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? undefined : object[key];
    };
  }
  var deburrLetter = basePropertyOf(deburredLetters);
  var objectProto = Object.prototype;
  var objectToString = objectProto.toString;
  var Symbol = root.Symbol;
  var symbolProto = Symbol ? Symbol.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;
  function baseToString(value) {
    if (typeof value == 'string') {
      return value;
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }
  function isSymbol(value) {
    return typeof value == 'symbol' || (isObjectLike(value) && objectToString.call(value) == symbolTag);
  }
  function toString(value) {
    return value == null ? '' : baseToString(value);
  }
  function deburr(string) {
    string = toString(string);
    return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
  }
  module.exports = deburr;
})(require('process'));
