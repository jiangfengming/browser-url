/*!
 * Url.js v1.1
 * http://www.noindoin.com/
 *
 * Copyright 2014 Jiang Fengming <fenix@noindoin.com>
 * Released under the MIT license
 */

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
    }

    this.protocol = obj.protocol;
    this.host = obj.host;
    this.hostname = obj.hostname;
    this.port = obj.port;
    this.pathname = obj.pathname;
    this.search = obj.search;
    this.hash = obj.hash;
    this.query = Url.parseSearch(obj.search);
  },

  get href() {
    return this.format();
  },

  set href(url) {
    this.parse(url);
  },

  format: function() {
    var url = this.protocol + '//' + this.host + this.pathname;
    if (this.query)
      url += Url.formatSearch(this.query);
    if (this.hash)
      url += this.hash;
    return url;
  },

  addQuery: function(name, value) {
    if (name.constructor == String) {
      var obj = {};
      obj[name] = value;
    } else {
      var obj = name;
    }
    for (var p in obj)
      this.query[p] = obj[p];
    return this;
  },

  removeQuery: function() {
    for (var i = arguments.length - 1; i >= 0; i--)
      delete this.query[arguments[i]];
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
