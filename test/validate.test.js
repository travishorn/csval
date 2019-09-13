const parse = require("../src/parse");
const validate = require("../src/validate");

test("Validates a valid CSV string with no rules", async () => {
  const parsed = await parse("name,age\nJohn,30");
  const valid = await validate(parsed);
  expect(valid).toBe(true);
});

test("Validates a valid CSV string with empty rules", async () => {
  const parsed = await parse("name,age\nJohn,30");
  const valid = await validate(parsed, {});
  expect(valid).toBe(true);
});

test("Validates a valid CSV string with all required headers", async () => {
  const parsed = await parse("name,age\nJohn,30");
  const valid = await validate(parsed, {
    requiredFields: ["name", "age"]
  });
  expect(valid).toBe(true);
});

test("Validates a valid CSV string with more than just required fields", async () => {
  const parsed = await parse("name,age\nJohn,30");
  const valid = await validate(parsed, {
    requiredFields: ["name"]
  });
  expect(valid).toBe(true);
});

test("Throws an error when a required field is missing from the header row", async () => {
  const parsed = await parse("name,age\nJohn,30");

  const rules = { requiredFields: ["salary"] };

  await expect(validate(parsed, rules)).rejects.toThrow(
    "Required field missing from header row: salary"
  );
});

test("Throws an error when more than one required field is missing from the header row", async () => {
  const parsed = await parse("name,age\nJohn,30");

  const rules = { requiredFields: ["salary", "active"] };

  await expect(validate(parsed, rules)).rejects.toThrow(
    "Required fields missing from header row:\n - salary\n - active"
  );
});
