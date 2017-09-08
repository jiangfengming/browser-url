# Url
URL utility for browser.

See [x-url](https://www.npmjs.com/package/x-url) for cross-platform URL utility.

```js
// use current location
var url = new Url();
console.log('current location', url);

url = new Url('http://www.example.com/foo/bar?a=1&b=2#p2');
console.log('http://www.example.com/foo/bar?a=1&b=2#p2', url);
console.log('href:', url.href);
console.log('protocol: ', url.protocol);
console.log('host:', url.host);
console.log('hostname:', url.hostname);
console.log('port:', url.port);
console.log('pathname:', url.pathname);
console.log('search:', url.search);
console.log('hash:', url.hash);
console.log('query:', url.query);

url.query.foo = 'bar';
console.log(url.href);

console.log(url.addQuery('one', 1).addQuery({
  two: 2,
  foo: 3
}).removeQuery('a', 'b').href);

console.log(url.setQuery({
  foo: 1,
  bar: 2
}).set('hash', '#p1').href);

console.log(url.set('search', '?foo=2&bar=3').query);
console.log(url.sortQuery().href);
```

## License
MIT
