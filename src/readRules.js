const { promisify } = require("util");
const { readFile } = require("fs");

const pReadFile = promisify(readFile);

const readRules = async filePath => {
  try {
    const data = await pReadFile(filePath);
    return JSON.parse(data.toString());
  } catch (err) {
    if (err.code === "ENOENT")
      throw new Error("Cannot find the specified rules file.");
    throw err;
  }
};

module.exports = readRules;
