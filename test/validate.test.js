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

  await expect(validate(parsed, rules)).rejects.toThrow(
    'Row 2: "salary" is required'
  );
});

test("Throws an error when validation fails on multiple rows", async () => {
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

  await expect(validate(parsed, rules)).rejects.toThrow(
    'Row 2: "salary" is required\nRow 3: "age" must be a number\nRow 3: "salary" is required'
  );
});

test("Throws an error when multiple checks fail on the same row", async () => {
  const parsed = await parseCsv("name,age,salary\nJohn,-10,abc");

  const rules = {
    properties: {
      age: {
        type: "number",
        minimum: 0
      },
      salary: {
        type: "number"
      }
    }
  };

  await expect(validate(parsed, rules)).rejects.toThrow(
    'Row 2: "age" must be larger than or equal to 0\nRow 2: "salary" must be a number'
  );
});

test("Throws an error extra rows are specified an additionalProperties is set to false", async () => {
  const parsed = await parseCsv("name,age,salary\nJohn,10,5000");

  const rules = {
    properties: {
      age: {
        type: "number",
        minimum: 0
      },
      salary: {
        type: "number"
      }
    },
    additionalProperties: false
  };

  await expect(validate(parsed, rules)).rejects.toThrow(
    'Row 2: "name" is not allowed'
  );
});
