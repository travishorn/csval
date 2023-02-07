#!/usr/bin/env node

import { readFile } from "fs/promises";
import { program } from "commander";
import { readCsv } from "./readCsv.js";
import { readRules } from "./readRules.js";
import { parseCsv } from "./parseCsv.js";
import { validate } from "./validate.js";

const { version } = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url))
);

program
  .version(version)
  .argument("<csv file>", "The CSV file to validate")
  .argument("[rules file]", "The rules to validate against")
  .action(async (csvFile, rulesFile) => {
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
  });

program.parse(process.argv);
