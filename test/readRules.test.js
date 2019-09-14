const readRules = require("../src/readRules");

test("Reads rules from a file", async () => {
  const rules = await readRules(`${__dirname}/../sample-rules/simple.json`);
  expect(Array.isArray(rules.fields)).toBe(true);
});

test("Throws an error on non-existent rules file", async () => {
  await expect(
    readRules(`${__dirname}/../sample-rules/non-existent.json`)
  ).rejects.toThrow("Cannot find the specified rules file.");
});

test("Throws an error when passed a non-string file path", async () => {
  await expect(readRules(false)).rejects.toThrow(
    'The "path" argument must be one of type string, Buffer, or URL. Received type boolean'
  );
});
