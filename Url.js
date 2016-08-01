function Url(url) {
  this.parse(url);
}

Url.parseSearch = function(search) {
  var query = {};
  if (search.length > 1) {
    search.slice(1).split('&').forEach(function(s) {
      var pair = s.split('=');
      var key = decodeURIComponent(pair[0]);
      var value = pair.length == 1 ? '' : decodeURIComponent(pair[1]);
      if (query[key] == undefined) {
        query[key] = value;
      } else {
        if (query[key].constructor != Array)
          query[key] = [query[key]];
        query[key].push(value);
      }
    });
  }
  return query;
};

Url.formatSearch = function(query) {
  var search = '';
  for (var p in query) {
    [].concat(query[p]).forEach(function(val) {
      if (val == null)
        return;
      search += '&' + encodeURIComponent(p);
      if (val !== '')
        search += '=' + encodeURIComponent(val);
    });
  }
  return search ? '?' + search.slice(1) : '';
};

Url.prototype = {
  parse: function(url) {
    if (!url) {
      var obj = location;
    } else {
      var obj = document.createElement('a');
      obj.href = url;

      // IE doesn't populate all link properties when setting .href with a relative URL,
      // however .href will return an absolute URL which then can be used on itself
      // to populate these additional fields.
      obj.href = obj.href;
    }

    this.protocol = obj.protocol;
    this.hostname = obj.hostname;
    this.port = obj.port;
    this.search = obj.search;
    this.hash = obj.hash;
    this.query = Url.parseSearch(obj.search);
    // pathname doesn't include the leading slash in IE
    this.pathname = obj.pathname;
    if (this.pathname.charAt(0) != '/') {
      this.pathname = '/' + this.pathname;
    }
  },

  get host() {
    return this.hostname + (this.port ? ':' + this.port : '');
  },

  set host(h) {
    h = h.split(':');
    this.hostname = h[0];
    if (h[1]) {
      this.port = h[1];
    }
  },

  get port() {
    return this._port;
  },

  set port(p) {
    if ((this.protocol == 'http:' && p == '80') || (this.protocol == 'https:' && p == '443')) {
      p = '';
    }

    this._port = p || '';
  },

  get href() {
    return this.format();
  },

  set href(url) {
    this.parse(url);
  },

  get search() {
    return Url.formatSearch(this.query);
  },

  set search(s) {
    this.query = Url.parseSearch(s);
  },

  set: function(key, value) {
    this[key] = value;
    return this;
  },

  format: function() {
    return this.protocol + '//' + this.host + this.pathname + this.search + this.hash;
  },

  addQuery: function(name, value) {
    if (name != null) {
      if (name.constructor == String) {
        var obj = {};
        obj[name] = value;
      } else {
        var obj = name;
      }

      for (var p in obj) {
        this.query[p] = obj[p];
      }
    }

    return this;
  },

  removeQuery: function() {
    for (var i = arguments.length - 1; i >= 0; i--) {
      delete this.query[arguments[i]];
    }
    return this;
  },

  setQuery: function(query) {
    this.query = query;
    return this;
  },

  valueOf: function() {
    return this.format();
  },

  toString: function() {
    return this.format();
  }
};

// CommonJS
if (typeof module != 'undefined' && module.exports) {
  module.exports = Url;
}
