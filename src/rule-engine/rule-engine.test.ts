import { RuleEngine } from './rule-engine';
import { RuleInput } from './rule-repository';

describe('Rule engine', () => {
  it('Evaluate correct rules without operators', () => {
    const rules = [
      { name: 'equal', source: 'header', attribute: 'test', value: 'VALUE' },
      { name: 'in', source: 'body', attribute: 'test', value: [3, 5, 1] },
    ];

    const input: RuleInput = {
      header: { test: 'VALUE', test2: 2 },
      body: { test: 3, test2: 'VALUE' },
    };

    const engine = new RuleEngine(rules);
    const result = engine.evaluate(input);
    expect(result).toBe(true);
  });

  it('Evaluate incorrect rules without operators', () => {
    const rules = [
      { name: 'equal', source: 'header', attribute: 'test', value: 'ERR' },
      { name: 'in', source: 'body', attribute: 'test', value: [3, 5, 1] },
    ];

    const input: RuleInput = {
      header: { test: 'VALUE', test2: 2 },
      body: { test: 3, test2: 'VALUE' },
    };

    const engine = new RuleEngine(rules);
    const result = engine.evaluate(input);
    expect(result).toBe(false);
  });

  it('Evaluate correct rules with all operator', () => {
    const rules = [
      { name: 'equal', source: 'header', attribute: 'test', value: 'VALUE' },
      {
        all: [
          { name: 'in', source: 'body', attribute: 'test', value: [3, 5, 1] },
          { name: 'contain', source: 'body', attribute: 'test2', value: 'VAL' },
        ],
      },
    ];

    const input: RuleInput = {
      header: { test: 'VALUE', test2: 2 },
      body: { test: 3, test2: 'VALUE' },
    };

    const engine = new RuleEngine(rules);
    const result = engine.evaluate(input);
    expect(result).toBe(true);
  });

  it('Evaluate correct rules with any operator', () => {
    const rules = [
      { name: 'equal', source: 'header', attribute: 'test', value: 'VALUE' },
      {
        any: [
          { name: 'in', source: 'body', attribute: 'test', value: ['h', 'g'] },
          { name: 'contain', source: 'body', attribute: 'test2', value: 'VAL' },
        ],
      },
    ];

    const input: RuleInput = {
      header: { test: 'VALUE', test2: 2 },
      body: { test: 3, test2: 'VALUE' },
    };

    const engine = new RuleEngine(rules);
    const result = engine.evaluate(input);
    expect(result).toBe(true);
  });

  it('Evaluate incorrect rules with any operator', () => {
    const rules = [
      { name: 'equal', source: 'header', attribute: 'test', value: 'VALUE' },
      {
        any: [
          {
            name: 'in',
            source: 'body',
            attribute: 'test',
            value: ['h', 'g'],
          },
          {
            name: 'contain',
            source: 'body',
            attribute: 'test2',
            value: 'ERR',
          },
        ],
      },
    ];

    const input: RuleInput = {
      header: { test: 'VALUE', test2: 2 },
      body: { test: 3, test2: 'VALUE' },
    };

    const engine = new RuleEngine(rules);
    const result = engine.evaluate(input);
    expect(result).toBe(false);
  });

  it('Evaluate correct rules with any and all operator', () => {
    const rules = [
      { name: 'equal', source: 'header', attribute: 'test', value: 'VALUE' },
      {
        any: [
          {
            name: 'in',
            source: 'body',
            attribute: 'test',
            value: ['h', 'g'],
          },
          {
            all: [
              {
                name: 'contain',
                source: 'body',
                attribute: 'test2',
                value: 'VAL',
              },
              {
                name: 'equal',
                source: 'body',
                attribute: 'test',
                value: 3,
              },
            ],
          },
        ],
      },
    ];

    const input: RuleInput = {
      header: { test: 'VALUE', test2: 2 },
      body: { test: 3, test2: 'VALUE' },
    };

    const engine = new RuleEngine(rules);
    const result = engine.evaluate(input);
    expect(result).toBe(true);
  });
});
