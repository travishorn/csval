/* global Promise */

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { exec } from "node:child_process";
import { expect } from "chai";

const __dirname = dirname(fileURLToPath(import.meta.url));

const cli = (args) => {
  return new Promise((resolve) => {
    const cliPath = "./src/cli";
    const command = `node --no-warnings ${cliPath} ${args}`;
    exec(
      command,
      {
        cwd: `${__dirname}/../`,
      },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr,
        });
      }
    );
  });
};

describe("cli", () => {
  it("validates a passed in CSV file", async () => {
    let result = await cli("./sample-data/simple.csv");
    expect(result.stdout).to.equal(
      "The CSV file meets all validation checks.\n"
    );
  });

  it("validates a passed in CSV file with passed in rules file", async () => {
    let result = await cli(
      "./sample-data/simple.csv ./sample-rules/simple.json"
    );
    expect(result.stdout).to.equal(
      "The CSV file meets all validation checks.\n"
    );
  });

  it("gives an error on missing file path argument", async () => {
    let result = await cli("");
    expect(result.stderr).to.equal(
      "error: missing required argument 'csv file'\n"
    );
  });

  it("gives an error on parse error", async () => {
    let result = await cli("./sample-data/not-parseable.csv");
    expect(result.stderr).to.equal(
      "Error: Parse error: Row 2: Quoted field unterminated\n"
    );
  });

  it("gives an error on validation error", async () => {
    let result = await cli(
      "./sample-data/simple.csv ./sample-rules/expect-extra-fields.json"
    );
    expect(result.stderr).to.be.ok;
  });
});
