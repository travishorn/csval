import { readFile } from "node:fs/promises";

/**
 * Reads a JSON file containing validation rules and returns the parsed object.
 * @param {string} filePath - The path to the JSON file containing validation rules
 * @returns {Promise<string>} A promise that resolves to the parsed JSON object
 * @throws {Error} If the file cannot be found or read, or if the JSON is invalid
 */
export async function readRules(filePath) {
  try {
    const data = await readFile(filePath);
    return JSON.parse(data.toString());
  } catch (err) {
    const error = /** @type {NodeJS.ErrnoException} */ (err);

    if (error.code === "ENOENT") {
      throw new Error("Cannot find the specified rules file.", { cause: err });
    }

    throw err;
  }
}
