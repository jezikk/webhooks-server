import { default as inFunc } from './in';

describe('Contain rule', () => {
  it('The attribute includes any value from an array', () => {
    const input = {
      header: { test: 'bla fefeed dd', test2: 2 },
      body: { test3: 3, test4: 4 },
    };
    const rule = {
      name: 'equal',
      source: 'header',
      attribute: 'test',
      value: ['bla fefeed dd', 'efeffefe'],
    };
    const result = inFunc(rule, input);
    expect(result).toEqual(true);
  });

  it(`The attribute doesn't include any value from an array`, () => {
    const input = {
      header: { test: 'bla fefeed dd', test2: 'lol' },
      body: { test3: 3, test4: 4 },
    };
    const rule = {
      name: 'equal',
      source: 'header',
      attribute: 'test2',
      value: ['bla', 'wwww'],
    };
    const result = inFunc(rule, input);
    expect(result).toEqual(false);
  });

  it(`The value of attribute isn't an array`, () => {
    const input = {
      header: { test: 'bla fefeed dd', test2: 4 },
      body: { test3: 3, test4: 4 },
    };
    const rule = {
      name: 'equal',
      source: 'header',
      attribute: 'test2',
      value: 'bla',
    };

    expect(() => inFunc(rule, input)).toThrowError();
  });
});
