#!/usr/bin/env node

const program = require("commander");

const pkg = require("../package.json");
const readCsv = require("./readCsv");
const readRules = require("./readRules");
const parseCsv = require("./parseCsv");
const validate = require("./validate");

program.version(pkg.version);

const main = async (csvFile, rulesFile) => {
  try {
    const csv = await readCsv(csvFile);
    const rules = rulesFile ? await readRules(rulesFile) : {};
    const parsed = await parseCsv(csv);
    await validate(parsed, rules);
    process.stdout.write("The CSV file meets all validation checks.\n");
  } catch (err) {
    process.stderr.write(`${err}\n`);
    process.exit(1);
  }
};

program.arguments("<csvFile> [rules]").action(main);

program.parse(process.argv);
