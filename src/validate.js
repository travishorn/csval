const Enjoi = require("enjoi");
const Joi = require("@hapi/joi");

const validate = async (parsed, passedRules) => {
  const errors = [];
  const rules = Object.assign({ type: "object" }, passedRules);
  const schema = Enjoi.schema(rules).unknown();

  parsed.data.forEach((row, i) => {
    Joi.validate(row, schema, err => {
      if (err) errors.push(`Row ${i + 2}: ${err.message}`);
    });
  });

  if (errors.length === 1) throw new Error(errors[0]);
  if (errors.length > 0) throw new Error(`\n${errors.join("\n")}`);

  return true;
};

module.exports = validate;
