const RULE_KEY = 'rule';
const ANY_KEY = 'any';
const ALL_KEY = 'all';

export class RuleEngine {
  rules;
  constructor(rules) {
    if (Array.isArray(rules)) {
      this.rules = rules;
    } else if (typeof rules === 'object') {
      this.rules = [rules];
    }
  }

  match(header, payload) {}
}

function isRule(obj) {
  return typeof obj === 'object' && obj.hasOwnProperty(RULE_KEY);
}
