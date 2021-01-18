import { RuleRepository, Rule, RuleInput } from './rule-repository';

const RULE_KEY = 'name';
const ANY_OPERATOR = 'any';
const ALL_OPERATOR = 'all';

export class RuleEngine {
  ruleConfig: any[];
  ruleRepository: RuleRepository;

  constructor(rules: any[], ruleRepository = new RuleRepository()) {
    if (Array.isArray(rules)) {
      this.ruleConfig = rules;
    } else if (typeof rules === 'object') {
      this.ruleConfig = [rules];
    } else {
      throw new Error('Wrong rules specification');
    }
    this.ruleRepository = ruleRepository;
  }

  evaluate(
    input: RuleInput,
    ruleConfig = this.ruleConfig,
    operator = ALL_OPERATOR
  ): boolean {
    let resultCount = 0;
    for (const obj of ruleConfig) {
      if (typeof obj !== 'object')
        throw new Error('Operator or rule must be a object');

      if (obj.hasOwnProperty(RULE_KEY)) {
        const rule: Rule = obj;
        const ruleFunc = this.ruleRepository.get(rule.name);

        if (!ruleFunc) throw new Error(`Rule ${rule.name} doesn't exist`);

        const result = ruleFunc(rule, input);
        if (!result && operator === ALL_OPERATOR) return false;
        if (result && operator === ANY_OPERATOR) return true;
        if (result && operator === ALL_OPERATOR) resultCount++;
      } else {
        const operations = [ALL_OPERATOR, ANY_OPERATOR];
        for (const [key, value] of Object.entries(obj)) {
          if (!operations.includes(key))
            throw new Error(`Operator ${key} doesn't exist`);

          if (!Array.isArray(value))
            throw new Error('Operator must be an array');

          const result = this.evaluate(input, value, key);
          if (!result && operator === ALL_OPERATOR) return false;
          if (result && operator === ANY_OPERATOR) return true;
          if (result && operator === ALL_OPERATOR) resultCount++;
        }
      }
    }

    if (resultCount === ruleConfig.length && operator === ALL_OPERATOR) {
      return true;
    }
    return false;
  }
}
