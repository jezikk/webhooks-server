import { default as contain } from './contain';

describe('Contain rule', () => {
  it('The attribute contains a defined text', () => {
    const input = {
      header: { test: 'bla fefeed dd', test2: 2 },
      body: { test3: 3, test4: 4 },
    };
    const rule = {
      name: 'equal',
      source: 'header',
      attribute: 'test',
      value: 'bla',
    };
    const result = contain(rule, input);
    expect(result).toEqual(true);
  });

  it(`The attribute doesn't contain a defined text`, () => {
    const input = {
      header: { test: 'bla fefeed dd', test2: 'lol' },
      body: { test3: 3, test4: 4 },
    };
    const rule = {
      name: 'equal',
      source: 'header',
      attribute: 'test2',
      value: 'bla',
    };
    const result = contain(rule, input);
    expect(result).toEqual(false);
  });

  it(`The attribute isn't a string`, () => {
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

    expect(() => contain(rule, input)).toThrowError();
  });
});
