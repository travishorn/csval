import { readFile } from "node:fs/promises";

/**
 * Reads a CSV file from the specified file path and returns its contents as a
 * string.
 *
 * @param {string} filePath - The path to the CSV file
 * @returns {Promise<string>} The contents of the CSV file as a string
 * @throws {Error} If the file cannot be found or read, with details about the error
 */
const readCsv = async (filePath) => {
  try {
    const data = await readFile(filePath);
    return data.toString();
  } catch (err) {
    const error = /** @type {NodeJS.ErrnoException} */ (err);

    if (error.code === "ENOENT") {
      throw new Error("Cannot find the specified CSV file.", { cause: err });
    }

    throw err;
  }
};

export { readCsv };
