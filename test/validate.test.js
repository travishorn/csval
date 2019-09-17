const parseCsv = require("../src/parseCsv");
const validate = require("../src/validate");

test("Validates a valid CSV string with no rules", async () => {
  const parsed = await parseCsv("name,age\nJohn,30");
  const valid = await validate(parsed);
  expect(valid).toBe(true);
});

test("Validates a valid CSV string with empty rules", async () => {
  const parsed = await parseCsv("name,age\nJohn,30");
  const valid = await validate(parsed, {});
  expect(valid).toBe(true);
});

test("Throws an error when validation fails", async () => {
  const parsed = await parseCsv("name,age\nJohn,30");

  const rules = {
    fields: [
      {
        name: "salary",
        required: true
      }
    ]
  };

  await expect(validate(parsed, rules)).rejects.toThrow();
});

test("Throw errors when multiple validators fail", async () => {
  const parsed = await parseCsv("name,age\nJohn,abc");

  const rules = {
    fields: [
      {
        name: "age",
        type: "number"
      },
      {
        name: "salary",
        required: true
      }
    ]
  };

  await expect(validate(parsed, rules)).rejects.toThrow(
    "Required field missing from header row: salary\nType error: Row 2: Expected a number"
  );
});
