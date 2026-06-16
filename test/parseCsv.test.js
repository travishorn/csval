import { expect, test } from "vitest";
import { parseCsv } from "../src/parseCsv.js";
import { readCsv } from "../src/readCsv.js";

test("parses a CSV string", async () => {
  const parsed = await parseCsv("name,age\nJohn,30");
  expect(parsed.errors.length).toBe(0);
});

test("parses a read file", async () => {
  const data = await readCsv(`./sample-data/simple.csv`);
  const parsed = await parseCsv(data);
  expect(parsed.errors.length).toBe(0);
});

test("throws an error on row with too few fields.", async () => {
  await expect(parseCsv("name,age,salary\nJohn,30")).rejects.toThrow(
    "Parse error: Row 2: Too few fields: expected 3 fields but parsed 2",
  );
});

test("throws an error on row with too many fields", async () => {
  await expect(parseCsv("name,age\nJohn,30,75000")).rejects.toThrow(
    "Parse error: Row 2: Too many fields: expected 2 fields but parsed 3",
  );
});

test("throws an error when delimiter cannot be detected", async () => {
  await expect(parseCsv("")).rejects.toThrow(
    "Parse error: Unable to auto-detect delimiting character; defaulted to ','",
  );

  await expect(parseCsv("name age\nJohn 30")).rejects.toThrow(
    "Parse error: Unable to auto-detect delimiting character; defaulted to ','",
  );
});

test("Throws an error when quoted fields are malformed", async () => {
  await expect(parseCsv('a,"b,c\nd,e,f')).rejects.toThrow(
    "Parse error: Row 2: Quoted field unterminated",
  );

  await expect(parseCsv('a,"b,"c\nd,e,f')).rejects.toThrow(
    "Parse errors:\n - Row 2: Trailing quote on quoted field is malformed\n - Row 2: Quoted field unterminated",
  );

  await expect(parseCsv('a,"b"c,d\ne,f,g')).rejects.toThrow(
    "Parse errors:\n - Row 2: Trailing quote on quoted field is malformed\n - Row 2: Quoted field unterminated",
  );

  await expect(parseCsv('a,"b,c\nd"e,f,g')).rejects.toThrow(
    "Parse errors:\n - Row 2: Trailing quote on quoted field is malformed\n - Row 2: Quoted field unterminated",
  );
});
