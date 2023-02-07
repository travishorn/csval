import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { parseCsv } from "../src/parseCsv.js";
import { validate } from "../src/validate.js";

use(chaiAsPromised);

describe("validate", () => {
  it("validates a valid CSV string with no rules", async () => {
    const parsed = await parseCsv("name,age\nJohn,30");
    const valid = await validate(parsed);
    expect(valid).to.equal(true);
  });

  it("validates a valid CSV string with empty rules", async () => {
    const parsed = await parseCsv("name,age\nJohn,30");
    const valid = await validate(parsed, {});
    expect(valid).to.equal(true);
  });

  it("validates a valid CSV string with rules", async () => {
    const parsed = await parseCsv("name,age\nJohn,30");

    const rules = {
      properties: {
        age: {
          type: "number",
        },
      },
      required: ["age"],
    };

    const valid = await validate(parsed, rules);
    expect(valid).to.equal(true);
  });

  it("validates a valid CSV string with a boolean", async () => {
    const parsed = await parseCsv("name,active\nJohn,true");

    const rules = {
      properties: {
        active: {
          type: "boolean",
        },
      },
    };

    const valid = await validate(parsed, rules);
    expect(valid).to.equal(true);
  });

  it('validates rules with the optional type:"object" property', async () => {
    const parsed = await parseCsv("name,age\nJohn,30");

    const rules = {
      type: "object",
      properties: {
        age: {
          type: "number",
        },
      },
      required: ["age"],
    };

    const valid = await validate(parsed, rules);
    expect(valid).to.equal(true);
  });

  it("throws an error when validation fails", async () => {
    const parsed = await parseCsv("name,age\nJohn,30");

    const rules = {
      properties: {
        salary: {
          type: "number",
        },
      },
      required: ["salary"],
    };

    await expect(validate(parsed, rules)).to.be.rejectedWith(
      "Row 2: must have required property 'salary'"
    );
  });

  it("throws an error when validation fails on multiple rows", async () => {
    const parsed = await parseCsv("name,age\nJohn,30\nJane,abc");

    const rules = {
      properties: {
        age: {
          type: "number",
        },
        salary: {
          type: "number",
        },
      },
      required: ["salary"],
    };

    await expect(validate(parsed, rules)).to.be.rejectedWith(
      "Row 2: must have required property 'salary'\nRow 3: must have required property 'salary'\nRow 3: 'age' must be number"
    );
  });

  it("throws an error when multiple checks fail on the same row", async () => {
    const parsed = await parseCsv("name,age,salary\nJohn,-10,abc");

    const rules = {
      properties: {
        age: {
          type: "number",
          minimum: 0,
        },
        salary: {
          type: "number",
        },
      },
    };

    await expect(validate(parsed, rules)).to.be.rejectedWith(
      "Row 2: 'age' must be >= 0\nRow 2: 'salary' must be number"
    );
  });

  it("throws an error when extra properties are specified while additionalProperties is set to false", async () => {
    const parsed = await parseCsv("name,age,salary\nJohn,10,5000");

    const rules = {
      properties: {
        age: {
          type: "number",
          minimum: 0,
        },
        salary: {
          type: "number",
        },
      },
      additionalProperties: false,
    };

    await expect(validate(parsed, rules)).to.be.rejectedWith(
      "Row 2: property 'name' is not allowed"
    );
  });
});
