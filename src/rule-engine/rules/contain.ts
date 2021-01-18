import { Rule, RuleInput } from '../rule-repository';
export default (rule: Rule, input: RuleInput) => {
  if (!rule.attribute)
    throw new Error('Attribute must be defined in equal rule');

  if (!rule.source) throw new Error('Source must be defined in equal rule');

  const value =
    rule.source === 'header'
      ? input.header[rule.attribute]
      : input.body[rule.attribute];

  if (typeof value !== 'string')
    throw Error(`Attribute "${value}" must be a string`);

  return value.includes(rule.value);
};
