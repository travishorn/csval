const types = (parsed, rules) => {
  if (Array.isArray(rules.fields)) {
    const typedFields = rules.fields.filter(field => {
      return typeof field.type !== "undefined";
    });

    const errors = [];

    typedFields.forEach(field => {
      const expectedType = field.type;

      parsed.data.forEach((line, i) => {
        const value = line[field.name];

        switch (expectedType) {
          case "number":
            if (Number.isNaN(Number(value)))
              errors.push(`Row ${i + 2}: Expected a number`);
            break;
        }
      });
    });

    if (errors.length === 1) throw new Error(`Type error: ${errors[0]}`);

    if (errors.length > 0)
      throw new Error(`Type errors:\n - ${errors.join("\n - ")}`);
  }

  return true;
};

module.exports = types;
