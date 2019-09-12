const Papa = require("papaparse");

const parse = async data => {
  const parsed = Papa.parse(data, { header: true });

  if (parsed.errors.length > 0) {
    const error = new Error("Parse error(s).");
    error.code = "EPARSE";
    error.parseErrors = parsed.errors;
    throw error;
  }

  return parsed;
};

module.exports = parse;
