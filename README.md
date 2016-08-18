# Url

```js
// use current location
var url = new Url();
console.log(url);

url = new Url('http://www.example.com/foo/bar?a=1&b=2#p2');
console.log(url);
console.log(url.href);
console.log(url.protocol);
console.log(url.host);
console.log(url.hostname);
console.log(url.port);
console.log(url.pathname);
console.log(url.search);
console.log(url.hash);
console.log(url.query);

url.query.foo = 'bar';
console.log(url.href);

console.log(url.addQuery('one', 1).addQuery({
  two: 2,
  foo: 3
}).removeQuery('one', 'two').href);

console.log(url.setQuery({
  foo: 1,
  bar: 2
}).set('hash', '#p1').href);

console.log(url.set('search', '?foo=2&bar=3').query);
console.log(url.sortQuery().href);
```

## License
MIT
