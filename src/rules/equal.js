export default (header, payload, rule) => {
  const value =
    rule.source === 'header' ? header[rule.attribute] : payload[rule.attribute];
  return rule.value === value;
};
