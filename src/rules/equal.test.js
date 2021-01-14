import { jest } from '@jest/globals';
import { equal } from '../rules';

describe('Equal rule', () => {
  it('Equal the same values', () => {
    const header = { test: 1, test2: 2 };
    const payload = { test3: 3, test4: 4 };
    const rule = {
      rule: 'equal',
      source: 'header',
      attribute: 'test',
      value: 1,
    };
    const result = equal(header, payload, rule);
    expect(result).toEqual(true);
  });

  it('Equal different values', () => {
    const header = { test: 1, test2: 2 };
    const payload = { test3: 3, test4: 4 };
    const rule = {
      rule: 'equal',
      source: 'header',
      attribute: 'test',
      value: 'test',
    };
    const result = equal(header, payload, rule);
    expect(result).toEqual(false);
  });

  it('Equal values with incorrect attribute', () => {
    const header = { test: 1, test2: 2 };
    const payload = { test3: 3, test4: 4 };
    const rule = {
      rule: 'equal',
      source: 'header',
      attribute: 'err',
      value: 1,
    };
    const result = equal(header, payload, rule);
    expect(result).toEqual(false);
  });

  it('Equal values with incorrect source', () => {
    const header = { test: 1, test2: 2 };
    const payload = { test3: 3, test4: 4 };
    const rule = {
      rule: 'equal',
      source: 'err',
      attribute: 'test',
      value: 1,
    };
    const result = equal(header, payload, rule);
    expect(result).toEqual(false);
  });
});
