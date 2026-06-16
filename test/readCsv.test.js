import { expect, test } from "vitest";
import { readCsv } from "../src/readCsv.js";

test("reads a CSV file", async () => {
  const data = await readCsv(`${__dirname}/../sample-data/simple.csv`);
  expect(data).toBe("name,age\nJohn,30");
});

test("throws an error on non-existent file", async () => {
  await expect(
    readCsv(`${__dirname}/../sample-data/non-existant.csv`),
  ).rejects.toThrow("Cannot find the specified CSV file.");
});

test("throws an error when passed a non-string file path", async () => {
  // @ts-expect-error
  await expect(readCsv(false)).rejects.toThrow(
    'The "path" argument must be of type string or an instance of Buffer or URL. Received type boolean (false)',
  );
});
