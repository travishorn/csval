import papaparse from "papaparse";

const { parse } = papaparse;

const parseCsv = async (data) => {
  const parsed = parse(data, {
    header: true,
    skipEmptyLines: true,
  });

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

export { parseCsv };
