const validate = async (parsed, passedRules) => {
  const rules = Object.assign({}, passedRules);

  if (Array.isArray(rules.requiredFields)) {
    const missingRequiredFields = rules.requiredFields.filter(requiredField => {
      return !parsed.meta.fields.includes(requiredField);
    });

    if (missingRequiredFields.length > 0) {
      const errorText = missingRequiredFields.reduce((acc, cur, i) => {
        if (i === 0) {
          acc =
            missingRequiredFields.length > 1
              ? "Required fields missing from header row:\n - "
              : "Required field missing from header row: ";
        } else {
          acc += "\n - ";
        }

        acc += cur;

        return acc;
      }, "");

      throw new Error(errorText);
    }
  }

  return true;
};

module.exports = validate;
