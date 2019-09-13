const Papa = require("papaparse");

const parse = async data => {
  const parsed = Papa.parse(data, { header: true });

  if (parsed.errors.length > 0) {
    const errorText = parsed.errors.reduce((acc, cur, i) => {
      if (i === 0) {
        acc = parsed.errors.length > 1 ? "Parse errors:\n - " : "Parse error: ";
      } else {
        acc += "\n - ";
      }

      if (typeof cur.row === "number") acc += `Row ${cur.row + 2}: `;

      acc += cur.message;
      return acc;
    }, "");

    throw new Error(errorText);
  }

  return parsed;
};

module.exports = parse;
