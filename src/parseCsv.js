import papaparse from "papaparse";

const { parse } = papaparse;

const DEFAULT_CONFIG = {
  header: true,
  skipEmptyLines: true,
};

/**
 * Parses CSV data into an array of objects, where each object represents a row
 * with key-value pairs corresponding to column headers and cell values.
 *
 * @template [T=Record<string, unknown>]
 * @param {string} data - The CSV data as a string
 * @param {import("papaparse").ParseConfig} [config={}] - Optional parsing configuration
 * @returns {Promise<import("papaparse").ParseResult<T>>} The parsed CSV data
 * @throws {Error} If there are parsing errors, with details about the errors
 */
const parseCsv = async (data, config = {}) => {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  const parsed = parse(data, mergedConfig);

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
