import Ajv from "ajv";

const ajv = new Ajv.default({ allErrors: true, coerceTypes: true });

/**
 * Validates parsed CSV data against provided JSON schema rules.
 *
 * @param {Object} parsed - The parsed CSV data
 * @param {Array<Object>} parsed.data - An array of row objects
 * @param {Object} [rules] - The JSON schema rules
 * @returns {Promise<boolean>} True if the data is valid, otherwise throws an error
 * @throws {Error} If validation fails, with details of the errors
 */
const validate = async (parsed, rules = {}) => {
  /** @type {string[]} */
  const errors = [];
  const schema = Object.assign({ type: "object" }, rules);
  const coerce = ajv.compile(schema);

  parsed.data.forEach((/** @type {Object} */ row, /** @type {number} */ i) => {
    coerce(row);
    const valid = ajv.validate(schema, row);

    if (!valid && ajv.errors) {
      ajv.errors.forEach((/** @type {import('ajv').ErrorObject} */ error) => {
        switch (error.keyword) {
          case "type":
          case "minimum":
            errors.push(
              `Row ${i + 2}: '${error.instancePath.slice(1)}' ${error.message}`,
            );
            break;
          case "additionalProperties":
            errors.push(
              `Row ${i + 2}: property '${
                error.params.additionalProperty
              }' is not allowed`,
            );
            break;
          default:
            errors.push(`Row ${i + 2}: ${error.message}`);
        }
      });
    }
  });

  if (errors.length === 1) throw new Error(errors[0]);
  if (errors.length > 0) throw new Error(`${errors.join("\n")}`);

  return true;
};

export { validate };
