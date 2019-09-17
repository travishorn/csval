const requiredFields = (parsed, rules) => {
  if (Array.isArray(rules.fields)) {
    const missingRequiredFields = rules.fields.filter(field => {
      return field.required && !parsed.meta.fields.includes(field.name);
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

        acc += cur.name;

        return acc;
      }, "");

      throw new Error(errorText);
    }

    return true;
  }

  return true;
};

module.exports = requiredFields;
