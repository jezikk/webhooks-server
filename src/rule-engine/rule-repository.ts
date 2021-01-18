import { equalFunc, containFunc, inFunc } from './rules';

export type Rule = {
  name: string;
  source?: string;
  attribute?: string;
  value?: any;
};

export type RuleInput = {
  header: object;
  body: object;
};

export type RuleFunc = (rule: Rule, input: RuleInput) => boolean;

type RuleStore = { [key: string]: RuleFunc };

export class RuleRepository {
  private store: RuleStore;
  constructor(store?: RuleStore) {
    this.store = store
      ? store
      : // Rules registration
        {
          equal: equalFunc,
          contain: containFunc,
          in: inFunc,
        };
  }

  get(name: string) {
    const ruleFunc = this.store[name];
    if (!ruleFunc) throw new Error(`Rule "${name}" doesn't exist`);
    return ruleFunc;
  }
}
