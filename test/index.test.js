import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { expect } from "chai";
import { parseCsv, readCsv, readRules, validate } from "../src/index.js";
import csval from "../src/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("csval", () => {
  it("parses a CSV string", async () => {
    const parsed = await parseCsv("name,age\nJohn,30");
    expect(parsed.errors.length).to.equal(0);
  });

  it("reads a CSV file", async () => {
    const data = await readCsv(`${__dirname}/../sample-data/simple.csv`);
    expect(data).to.equal("name,age\nJohn,30");
  });

  it("reads rules from a file", async () => {
    const rules = await readRules(`${__dirname}/../sample-rules/simple.json`);
    expect(typeof rules).to.equal("object");
  });

  it("validates a valid CSV string with no rules", async () => {
    const parsed = await parseCsv("name,age\nJohn,30");
    const valid = await validate(parsed);
    expect(valid).to.equal(true);
  });

  it("exports a default object", async () => {
    const parsed = await csval.parseCsv("name,age\nJohn,30");
    const valid = await csval.validate(parsed);
    expect(valid).to.equal(true);
  });
});
