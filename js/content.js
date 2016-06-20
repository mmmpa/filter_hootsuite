(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _selector = require('./selector');

var _selector2 = _interopRequireDefault(_selector);

var _store = require('../util/store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filter = function () {
  function Filter() {
    var _this = this;

    _classCallCheck(this, Filter);

    _store.store.loadIgnoreSet(function (v) {
      return _this.ignoreSet = v;
    });
  }

  _createClass(Filter, [{
    key: 'append',
    value: function append(dom) {
      this.detect(dom);
    }
  }, {
    key: 'detect',
    value: function detect(dom) {
      switch (true) {
        case _selector2.default.isMessage(dom):
          return this.filterMessage(dom);
        default:
          return null;
      }
    }
  }, {
    key: 'filterMessage',
    value: function filterMessage(dom) {
      var _this2 = this;

      if (dom.style.display === 'none') {
        return;
      }

      var matched = dom.innerText.match(/@[0-9a-zA-z_]+/ig);

      if (!matched) {
        return;
      }

      try {
        matched.forEach(function (name) {
          if (!_this2.ignoreSet.has(name)) {
            return;
          }
          dom.style.display = 'none';
          throw 'done';
        });
      } catch (e) {
        return null;
      }
    }
  }]);

  return Filter;
}();

exports.default = Filter;

},{"../util/store":4,"./selector":3}],2:[function(require,module,exports){
'use strict';

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var body = document.getElementsByTagName('body')[0];
  var filter = new _filter2.default();
  body.addEventListener("DOMNodeInserted", function (e) {
    filter.append(e.target);
  }, false);
})();

},{"./filter":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Selector = function () {
  function Selector() {
    _classCallCheck(this, Selector);
  }

  _createClass(Selector, null, [{
    key: 'isMessage',
    value: function isMessage(dom) {
      return this.pickClassName(dom).indexOf(this.messageContainerName) !== -1;
    }
  }, {
    key: 'pickClassName',
    value: function pickClassName(dom) {
      if (!dom.getAttribute || typeof dom.getAttribute !== "function") {
        return '';
      }

      return dom.getAttribute('class') || '';
    }
  }, {
    key: 'messageContainerName',
    get: function get() {
      return 'rc-MessageContext';
    }
  }]);

  return Selector;
}();

exports.default = Selector;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
  function Store() {
    _classCallCheck(this, Store);
  }

  _createClass(Store, [{
    key: 'saveIgnoreSet',

    // value:Set
    value: function saveIgnoreSet(value) {
      var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {
        return null;
      } : arguments[1];

      chrome.storage.local.set({ 'ignoreList': [].concat(_toConsumableArray(value)) }, callback);
    }
  }, {
    key: 'loadIgnoreSet',
    value: function loadIgnoreSet(callback) {
      chrome.storage.local.get('ignoreList', function (value) {
        callback(new Set(value.ignoreList || []));
      });
    }
  }]);

  return Store;
}();

var store = exports.store = new Store();

},{}]},{},[2]);
