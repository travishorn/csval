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
    properties: {
      salary: {
        type: "number"
      }
    },
    required: ["salary"]
  };

  await expect(validate(parsed, rules)).rejects.toThrow();
});

test("Throws an error when multiple validation checks fail", async () => {
  const parsed = await parseCsv("name,age\nJohn,30\nJane,abc");

  const rules = {
    properties: {
      age: {
        type: "number"
      },
      salary: {
        type: "number"
      }
    },
    required: ["salary"]
  };

  await expect(validate(parsed, rules)).rejects.toThrow();
});
