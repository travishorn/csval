const fs = require("fs").promises;

const readFile = async filePath => {
  try {
    const data = await fs.readFile(filePath);
    return data.toString();
  } catch (err) {
    if (err.code === "ENOENT")
      throw new Error("Cannot find the specified file.");
    throw err;
  }
};

module.exports = readFile;
