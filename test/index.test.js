const csval = require("../src/index");

test("Parses a CSV string", async () => {
  const parsed = await csval.parseCsv("name,age\nJohn,30");
  expect(parsed.errors.length).toBe(0);
});

test("Reads a CSV file", async () => {
  const data = await csval.readCsv(`${__dirname}/../sample-data/simple.csv`);
  expect(data).toBe("name,age\nJohn,30");
});

test("Reads rules from a file", async () => {
  const rules = await csval.readRules(
    `${__dirname}/../sample-rules/simple.json`
  );
  expect(typeof rules).toBe("object");
});

test("Validates a valid CSV string with no rules", async () => {
  const parsed = await csval.parseCsv("name,age\nJohn,30");
  const valid = await csval.validate(parsed);
  expect(valid).toBe(true);
});
