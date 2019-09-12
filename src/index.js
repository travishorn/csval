const readFile = require("./readFile");
const parse = require("./parse");
const validate = require("./validate");

const main = async () => {
  const rules = {
    requiredFields: ["employeeId", "name"]
  };

  try {
    const data = await readFile(process.argv[2]);
    const parsed = await parse(data);
    await validate(parsed, rules);
    process.stdout.write("The CSV file meets all validation checks.\n");
  } catch (err) {
    process.stderr.write(`${err}\n`);

    if (err.code === "EPARSE") {
      err.parseErrors.forEach(parseError => {
        process.stderr.write(
          `Row ${parseError.row + 2}: ${parseError.message}.\n`
        );
      });
    }

    if (err.code === "EREQFLD") {
      process.stderr.write(
        `Missing field(s): ${err.missingRequiredFields.join(", ")}\n`
      );
    }
  }
};

main();
