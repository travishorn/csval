import { exec } from "node:child_process";
import { expect, test } from "vitest";

/**
 * @param {string} args
 * @returns {Promise<{code: number, error: Error|null, stdout: string, stderr: string}>}
 */
async function cli(args) {
  const cliPath = "./src/cli.js";
  const command = `node ${cliPath} ${args}`;

  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      resolve({
        code: error?.code ? error.code : 0,
        error,
        stdout,
        stderr,
      });
    });
  });
}

test("validates a passed in CSV file", async () => {
  const result = await cli("./sample-data/simple.csv");
  expect(result.stdout).toBe("The CSV file meets all validation checks.\n");
});

test("validates a passed in CSV file with passed in rules file", async () => {
  const result = await cli(
    "./sample-data/simple.csv ./sample-rules/simple.json",
  );
  expect(result.stdout).toBe("The CSV file meets all validation checks.\n");
});

test("gives an error on missing file path argument", async () => {
  const result = await cli("");
  expect(result.stderr).toBe("error: missing required argument 'csv file'\n");
});

test("gives an error on parse error", async () => {
  const result = await cli("./sample-data/not-parseable.csv");
  expect(result.stderr).toBe(
    "Error: Parse error: Row 2: Quoted field unterminated\n",
  );
});

test("gives an error on validation error", async () => {
  const result = await cli(
    "./sample-data/simple.csv ./sample-rules/expect-extra-fields.json",
  );
  expect(result.stderr).toBeTruthy();
});
