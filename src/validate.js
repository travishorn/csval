import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true, coerceTypes: true });

const validate = async (parsed, passedRules) => {
  const errors = [];
  const schema = Object.assign({ type: "object" }, passedRules);
  const coerce = ajv.compile(schema);

  parsed.data.forEach((row, i) => {
    coerce(row);
    const valid = ajv.validate(schema, row);

    if (!valid) {
      ajv.errors.forEach((error) => {
        switch (error.keyword) {
          case "type":
          case "minimum":
            errors.push(
              `Row ${i + 2}: '${error.instancePath.slice(1)}' ${error.message}`
            );
            break;
          case "additionalProperties":
            errors.push(
              `Row ${i + 2}: property '${
                error.params.additionalProperty
              }' is not allowed`
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
