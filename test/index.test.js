import { expect, test } from "vitest";
import { parseCsv, readCsv, readRules, validate } from "../src/index.js";
import csval from "../src/index.js";

test("parses a CSV string", async () => {
  const parsed = await parseCsv("name,age\nJohn,30");
  expect(parsed.errors.length).toBe(0);
});

test("reads a CSV file", async () => {
  const data = await readCsv(`./sample-data/simple.csv`);
  expect(data).toBe("name,age\nJohn,30");
});

test("reads rules from a file", async () => {
  const rules = await readRules(`./sample-rules/simple.json`);
  expect(typeof rules).toBe("object");
});

test("validates a valid CSV string with no rules", async () => {
  const parsed = await parseCsv("name,age\nJohn,30");
  const valid = await validate(parsed);
  expect(valid).toBe(true);
});

test("exports a default object", async () => {
  const parsed = await csval.parseCsv("name,age\nJohn,30");
  const valid = await csval.validate(parsed);
  expect(valid).toBe(true);
});
