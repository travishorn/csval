import { readFile } from "fs/promises";

const readRules = async (filePath) => {
  try {
    const data = await readFile(filePath);
    return JSON.parse(data.toString());
  } catch (err) {
    if (err.code === "ENOENT")
      throw new Error("Cannot find the specified rules file.");
    throw err;
  }
};

export { readRules };
