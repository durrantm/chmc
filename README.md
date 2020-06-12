The code and tests are in:

    app.js
    app.test.js

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
