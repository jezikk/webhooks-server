import { getFlattenObject } from './utils';

describe('flattenObject', () => {
  it('Flatten 1-level object', () => {
    const source = {
      key1: 'value1',
      key2: 'value2',
    };
    const target = { ...source };
    const result = getFlattenObject(source);
    expect(result).toEqual(target);
  });
  it('Flatten nested object', () => {
    const source = {
      key1: 'value1',
      key2: {
        key21: [{ key211: 'value211' }],
        key22: 'value22',
        key23: 'value23',
      },
      key3: ['value3'],
      key4: { key41: 'value41', key42: { key421: 'value421' } },
    };
    const target = {
      key1: 'value1',
      'key2.key21[].0.key211': 'value211',
      'key2.key22': 'value22',
      'key2.key23': 'value23',
      'key3[].0': 'value3',
      'key4.key41': 'value41',
      'key4.key42.key421': 'value421',
    };
    const result = getFlattenObject(source);
    expect(result).toEqual(target);
  });
});
