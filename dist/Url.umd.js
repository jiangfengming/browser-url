(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Url = factory());
}(this, (function () { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Url =
  /*#__PURE__*/
  function () {
    function Url(url) {
      this.parse(url);
    }

    var _proto = Url.prototype;

    _proto.parse = function parse(url) {
      var obj;

      if (!url) {
        obj = location;
      } else {
        obj = document.createElement('a');
        obj.href = url; // IE doesn't populate all link properties when setting .href with a relative URL,
        // however .href will return an absolute URL which then can be used on itself
        // to populate these additional fields.

        obj.href = obj.href;
      }

      this.protocol = obj.protocol;
      this.hostname = obj.hostname;
      this.port = obj.port;
      this.search = obj.search;
      this.hash = obj.hash;
      this.query = Url.parseSearch(obj.search); // pathname doesn't include the leading slash in IE

      this.pathname = obj.pathname;

      if (this.pathname.charAt(0) !== '/') {
        this.pathname = '/' + this.pathname;
      }
    };

    _proto.set = function set(key, value) {
      this[key] = value;
      return this;
    };

    _proto.format = function format() {
      if (this.host) {
        return this.protocol + '//' + this.host + this.pathname + this.search + this.hash;
      } else {
        return this.protocol + this.pathname + this.search + this.hash;
      }
    };

    _proto.addQuery = function addQuery(name, value) {
      if (name != null) {
        var obj;

        if (name.constructor === String) {
          obj = {};
          obj[name] = value;
        } else {
          obj = name;
        }

        for (var p in obj) {
          this.query[p] = obj[p];
        }
      }

      return this;
    };

    _proto.removeQuery = function removeQuery() {
      for (var _len = arguments.length, queries = new Array(_len), _key = 0; _key < _len; _key++) {
        queries[_key] = arguments[_key];
      }

      for (var _i = 0; _i < queries.length; _i++) {
        var q = queries[_i];
        delete this.query[q];
      }

      return this;
    };

    _proto.setQuery = function setQuery(query) {
      this.query = query;
      return this;
    };

    _proto.sortQuery = function sortQuery(fn) {
      var _this = this;

      var arr = [];

      for (var key in this.query) {
        arr.push(key);
      }

      var sortedQuery = {};
      arr.sort(fn).forEach(function (key) {
        sortedQuery[key] = _this.query[key];
      });
      this.query = sortedQuery;
      return this;
    };

    _proto.valueOf = function valueOf() {
      return this.format();
    };

    _proto.toString = function toString() {
      return this.format();
    };

    _createClass(Url, [{
      key: "host",
      get: function get() {
        return this.hostname + (this.port ? ':' + this.port : '');
      },
      set: function set(h) {
        h = h.split(':');
        this.hostname = h[0];

        if (h[1]) {
          this.port = h[1];
        }
      }
    }, {
      key: "port",
      get: function get() {
        return this._port;
      },
      set: function set(p) {
        if (this.protocol === 'http:' && p === '80' || this.protocol === 'https:' && p === '443') {
          p = '';
        }

        this._port = p || '';
      }
    }, {
      key: "href",
      get: function get() {
        return this.format();
      },
      set: function set(url) {
        this.parse(url);
      }
    }, {
      key: "search",
      get: function get() {
        return Url.formatSearch(this.query);
      },
      set: function set(s) {
        this.query = Url.parseSearch(s);
      }
    }]);

    return Url;
  }();

  Url.parseSearch = function (search) {
    var query = {};
    if (search[0] === '?') search = search.slice(1);

    if (search.length) {
      search.split('&').forEach(function (s) {
        var pair = s.split(/=(.+)/);
        var key = decodeURIComponent(pair[0].replace(/\+/g, ' '));
        var value = pair.length === 1 ? '' : decodeURIComponent(pair[1].replace(/\+/g, ' '));

        if (query[key] == null) {
          query[key] = value;
        } else {
          if (query[key].constructor !== Array) {
            query[key] = [query[key]];
          }

          query[key].push(value);
        }
      });
    }

    return query;
  };

  Url.formatSearch = function (query) {
    var search = '';

    var _loop = function _loop(p) {
      var k = encodeURIComponent(p);
      [].concat(query[p]).forEach(function (val) {
        if (val == null) {
          return;
        }

        search += '&' + k;

        if (val !== '') {
          search += '=' + encodeURIComponent(val);
        }
      });
    };

    for (var p in query) {
      _loop(p);
    }

    return search ? '?' + search.slice(1) : '';
  };

  return Url;

})));
