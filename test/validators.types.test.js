const parseCsv = require("../src/parseCsv");
const types = require("../src/validators/types");

test("Validates when all values match the correct type", async () => {
  const parsed = await parseCsv("name,age\nJohn,30");

  const rules = {
    fields: [
      {
        name: "age",
        type: "number"
      }
    ]
  };

  const valid = types(parsed, rules);
  expect(valid).toBe(true);
});

test("Throws an error when a string value appears in a number field", async () => {
  const parsed = await parseCsv("name,age\nJohn,abc");

  const rules = {
    fields: [
      {
        name: "age",
        type: "number"
      }
    ]
  };

  expect(() => {
    types(parsed, rules);
  }).toThrow("Type error: Row 2: Expected a number");
});

test("Throws an error when multiple string values appear in a number field", async () => {
  const parsed = await parseCsv("name,age\nJohn,abc\nJane,def");

  const rules = {
    fields: [
      {
        name: "age",
        type: "number"
      }
    ]
  };

  expect(() => {
    types(parsed, rules);
  }).toThrow(
    "Type errors:\n - Row 2: Expected a number\n - Row 3: Expected a number"
  );
});
