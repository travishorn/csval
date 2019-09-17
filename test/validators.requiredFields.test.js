const parseCsv = require("../src/parseCsv");
const requiredFields = require("../src/validators/requiredFields");

test("Validates a valid CSV string with all required headers", async () => {
  const parsed = await parseCsv("name,age\nJohn,30");

  const rules = {
    fields: [
      {
        name: "name",
        required: true
      },
      {
        name: "age",
        required: true
      }
    ]
  };

  const valid = await requiredFields(parsed, rules);
  expect(valid).toBe(true);
});

test("Validates a valid CSV string with more than just required fields", async () => {
  const parsed = await parseCsv("name,age\nJohn,30");

  const rules = {
    fields: [
      {
        name: "name",
        required: true
      }
    ]
  };

  const valid = await requiredFields(parsed, rules);
  expect(valid).toBe(true);
});

test("Throws an error when a required field is missing from the header row", async () => {
  const parsed = await parseCsv("name,age\nJohn,30");

  const rules = {
    fields: [
      {
        name: "salary",
        required: true
      }
    ]
  };

  expect(() => {
    requiredFields(parsed, rules);
  }).toThrow();
});

test("Throws an error when more than one required field is missing from the header row", async () => {
  const parsed = await parseCsv("name,age\nJohn,30");

  const rules = {
    fields: [
      {
        name: "salary",
        required: true
      },
      {
        name: "active",
        required: true
      }
    ]
  };

  await expect(() => {
    requiredFields(parsed, rules);
  }).toThrow("Required fields missing from header row:\n - salary\n - active");
});

test("Doesn't throw on missing fields where required is set to false", async () => {
  const parsed = await parseCsv("name,age\nJohn,30");

  const rules = {
    fields: [
      {
        name: "name",
        required: true
      },
      {
        name: "salary",
        required: false
      }
    ]
  };

  const valid = await requiredFields(parsed, rules);
  expect(valid).toBe(true);
});

test("Doesn't throw on missing fields where required isn't set", async () => {
  const parsed = await parseCsv("name,age\nJohn,30");

  const rules = {
    fields: [
      {
        name: "name",
        required: true
      },
      {
        name: "salary"
      }
    ]
  };

  const valid = await requiredFields(parsed, rules);
  expect(valid).toBe(true);
});
