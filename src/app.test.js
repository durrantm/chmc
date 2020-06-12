const getElement = (obj, path) => {
  try { return obj[path]; }
  catch { return undefined; }
};
const access = (objectIn, pathParts) => {
  let object = {...objectIn};
  for (const pathPart of pathParts) {
    object = getElement(object, pathPart);
  }
  return object;
};
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