import { RuleRepository } from './rule-repository';

describe('Rule repository', () => {
  it('Get valid rule', () => {
    const ruleRepository = new RuleRepository({ test: () => true });
    expect(typeof ruleRepository.get('test')).toBe('function');
  });
  it('Get invalid rule', () => {
    const ruleRepository = new RuleRepository({ test: () => true });
    expect(() => ruleRepository.get('unknown')).toThrowError();
  });
});
