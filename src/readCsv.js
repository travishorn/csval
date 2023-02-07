import { promisify } from "node:util";
import { readFile } from "node:fs";

const pReadFile = promisify(readFile);

const readCsv = async (filePath) => {
  try {
    const data = await pReadFile(filePath);
    return data.toString();
  } catch (err) {
    if (err.code === "ENOENT")
      throw new Error("Cannot find the specified CSV file.");
    throw err;
  }
};

export { readCsv };
