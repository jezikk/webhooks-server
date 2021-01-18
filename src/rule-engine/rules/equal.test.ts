import { default as equal } from './equal';

describe('Equal rule', () => {
  it('Equal the same values', () => {
    const input = {
      header: { test: 1, test2: 2 },
      body: { test3: 3, test4: 4 },
    };
    const rule = {
      name: 'equal',
      source: 'header',
      attribute: 'test',
      value: 1,
    };
    const result = equal(rule, input);
    expect(result).toEqual(true);
  });

  it('Equal different values', () => {
    const input = {
      header: { test: 1, test2: 2 },
      body: { test3: 3, test4: 4 },
    };
    const rule = {
      name: 'equal',
      source: 'header',
      attribute: 'test',
      value: 'test',
    };
    const result = equal(rule, input);
    expect(result).toEqual(false);
  });

  it('Equal values with incorrect attribute', () => {
    const input = {
      header: { test: 1, test2: 2 },
      body: { test3: 3, test4: 4 },
    };
    const rule = {
      name: 'equal',
      source: 'header',
      attribute: 'err',
      value: 1,
    };
    const result = equal(rule, input);
    expect(result).toEqual(false);
  });

  it('Equal values with incorrect source', () => {
    const input = {
      header: { test: 1, test2: 2 },
      body: { test3: 3, test4: 4 },
    };
    const rule = {
      name: 'equal',
      source: 'err',
      attribute: 'test',
      value: 1,
    };
    const result = equal(rule, input);
    expect(result).toEqual(false);
  });
});
