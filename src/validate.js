const validate = async (parsed, rules) => {
  if (rules.requiredFields) {
    const missingRequiredFields = rules.requiredFields.filter(requiredField => {
      return !parsed.meta.fields.includes(requiredField);
    });

    if (missingRequiredFields.length > 0) {
      const error = new Error(
        "One or more fields are missing from the header row."
      );
      error.code = "EREQFLD";
      error.missingRequiredFields = missingRequiredFields;
      throw error;
    }
  }
  if (parsed) return true;
};

module.exports = validate;
