const readFile = require("./readFile");
const parse = require("./parse");
const validate = require("./validate");

const main = async () => {
  const rules = {};

  try {
    const data = await readFile(process.argv[2]);
    const parsed = await parse(data);
    await validate(parsed, rules);
    process.stdout.write("The CSV file meets all validation checks.\n");
  } catch (err) {
    process.stderr.write(`${err}\n`);
  }
};

main();
