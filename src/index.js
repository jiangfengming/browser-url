class Url {
  constructor(url) {
    this.parse(url)
  }

  parse(url) {
    let obj
    if (!url) {
      obj = location
    } else {
      obj = document.createElement('a')
      obj.href = url

      // IE doesn't populate all link properties when setting .href with a relative URL,
      // however .href will return an absolute URL which then can be used on itself
      // to populate these additional fields.
      obj.href = obj.href
    }

    this.protocol = obj.protocol
    this.hostname = obj.hostname
    this.port = obj.port
    this.search = obj.search
    this.hash = obj.hash
    this.query = Url.parseSearch(obj.search)
    // pathname doesn't include the leading slash in IE
    this.pathname = obj.pathname
    if (this.pathname.charAt(0) !== '/') {
      this.pathname = '/' + this.pathname
    }
  }

  get host() {
    return this.hostname + (this.port ? ':' + this.port : '')
  }

  set host(h) {
    h = h.split(':')
    this.hostname = h[0]
    if (h[1]) {
      this.port = h[1]
    }
  }

  get port() {
    return this._port
  }

  set port(p) {
    if ((this.protocol === 'http:' && p === '80') || (this.protocol === 'https:' && p === '443')) {
      p = ''
    }

    this._port = p || ''
  }

  get href() {
    return this.format()
  }

  set href(url) {
    this.parse(url)
  }

  get search() {
    return Url.formatSearch(this.query)
  }

  set search(s) {
    this.query = Url.parseSearch(s)
  }

  set(key, value) {
    this[key] = value
    return this
  }

  format() {
    if (this.host) {
      return this.protocol + '//' + this.host + this.pathname + this.search + this.hash
    } else {
      return this.protocol + this.pathname + this.search + this.hash
    }
  }

  addQuery(name, value) {
    if (name != null) {
      let obj
      if (name.constructor === String) {
        obj = {}
        obj[name] = value
      } else {
        obj = name
      }

      for (const p in obj) {
        this.query[p] = obj[p]
      }
    }

    return this
  }

  removeQuery(...queries) {
    for (const q of queries) {
      delete this.query[q]
    }
    return this
  }

  setQuery(query) {
    this.query = query
    return this
  }

  sortQuery(fn) {
    const arr = []
    for (const key in this.query) {
      arr.push(key)
    }
    const sortedQuery = {}
    arr.sort(fn).forEach(key => {
      sortedQuery[key] = this.query[key]
    })
    this.query = sortedQuery
    return this
  }

  valueOf() {
    return this.format()
  }

  toString() {
    return this.format()
  }
}

Url.parseSearch = function(search) {
  const query = {}
  if (search[0] === '?') search = search.slice(1)
  if (search.length) {
    search.split('&').forEach(s => {
      const pair = s.split(/=(.+)/)
      const key = decodeURIComponent(pair[0].replace(/\+/g, ' '))
      const value = pair.length === 1 ? '' : decodeURIComponent(pair[1].replace(/\+/g, ' '))
      if (query[key] == null) {
        query[key] = value
      } else {
        if (query[key].constructor !== Array) {
          query[key] = [query[key]]
        }
        query[key].push(value)
      }
    })
  }
  return query
}

Url.formatSearch = function(query) {
  let search = ''
  for (const p in query) {
    const k = encodeURIComponent(p)
    ;[].concat(query[p]).forEach(val => {
      if (val == null) {
        return
      }
      search += '&' + k
      if (val !== '') {
        search += '=' + encodeURIComponent(val)
      }
    })
  }
  return search ? '?' + search.slice(1) : ''
}

export default Url
