The code and tests are in:

    src/app.js
    src/app.test.js

Also in `/lib`

Notes:

During the interview I got stuck on using ` obj[path]` because I thought you were saying no, use dot notation here.  Bracket notation was what I wanted to use and this threw me off a bit.

As you did not get to see the next part I got stuck on - after the interview - I will recount it here.
I am happy to share this.

I got stuck for about 1/2 hour on my array iteration.  I mistakenly used a `for in` iterator instead of a `for of`.
The error message was something like "\[1 undefined" which wasn't helpful.
I've done that a few times this year. bugs me every time.

Once I got over that the rest of the program was simple.

Also
- I excluded node_modules as discussed from this repo (so npm install to be able to run).
- you can use jest src/ to run the code using es6
- you can use npm t to run pre-es6 code in lib

For your convenience the core code is here:

```
const getElement = (obj, path) => {
  try { return obj[path]; }
  catch { return undefined; }
};
exports.access = (objectIn, pathParts) => {
  let object = {...objectIn};
  for (const pathPart of pathParts) {
    object = getElement(object, pathPart);
  }
  return object;
};

The tests are:

const { access } = require('./app.js');
let object;
describe('Use a object locator to find an element using:', function () {
  beforeEach(() => {
    object = { a: 2, b: { a: "x", b: [1, { a: 3 }] } };
  });
  it('access(obj, "a") -> 2', function () {
    const pathParts = 'a'.split('.');
    const result = access(object, pathParts);
    expect(result).toBe(2);
  });
  it('access(obj, "b.a") -> "x"', function () {
    const pathParts = 'b.a'.split('.');
    const result = access(object, pathParts);
    expect(result).toBe("x");
  });
  it('access(obj, "b.b.1") -> { a: 3 }', function () {
    const pathParts = 'b.b.1'.split('.');
    object = access(object, pathParts);
    expect(object).toEqual({ a: 3 });
  });
  it('access("obj, "b.b.1.a") -> 3', function () {
    const path = 'b.b.1.a';
    const pathParts = path.split('.');
    object = access(object, pathParts);
    expect(object).toEqual(3);
  });
  it('access("obj, "b.b.5.a") -> undefined', function () {
    const path = 'b.b.5.c';
    const pathParts = path.split('.');
    object = access(object, pathParts);
    expect(object).toEqual(undefined);
  });
});
