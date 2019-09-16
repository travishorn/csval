// const path = require("path");
const exec = require("child_process").exec;

const cli = args => {
  return new Promise(resolve => {
    const cliPath = `./src/cli`;
    const command = `node --no-warnings ${cliPath} ${args}`;
    exec(
      command,
      {
        cwd: `${__dirname}/../`
      },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr
        });
      }
    );
  });
};

test("Validates a passed in CSV file", async () => {
  let result = await cli("./sample-data/simple.csv");
  expect(result.stdout).toBe("The CSV file meets all validation checks.\n");
});

test("Validates a passed in CSV file with passed in rules file", async () => {
  let result = await cli("./sample-data/simple.csv ./sample-rules/simple.json");
  expect(result.stdout).toBe("The CSV file meets all validation checks.\n");
});

test("Gives an error on missing file path argument", async () => {
  let result = await cli("");
  expect(result.stderr).toBe("Error: You must supply a path to a CSV file.\n");
});

test("Gives an error on parse error", async () => {
  let result = await cli("./sample-data/not-parseable.csv");
  expect(result.stderr).toBe(
    "Error: Parse error: Row 2: Quoted field unterminated\n"
  );
});

test("Gives an error on validation error", async () => {
  let result = await cli(
    "./sample-data/simple.csv ./sample-rules/expect-extra-fields.json"
  );
  expect(result.stderr).toBe(
    "Error: Required field missing from header row: salary\n"
  );
});
