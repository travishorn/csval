import { expect, test } from "vitest";
import { readRules } from "../src/readRules.js";

test("reads rules from a file", async () => {
  const rules = await readRules(`./sample-rules/simple.json`);
  expect(rules).toBeTypeOf("object");
});

test("throws an error on non-existent rules file", async () => {
  await expect(readRules(`./sample-rules/non-existent.json`)).rejects.toThrow(
    "Cannot find the specified rules file.",
  );
});

test("throws an error when passed a non-string file path", async () => {
  // @ts-expect-error
  await expect(readRules(false)).rejects.toThrow(
    'The "path" argument must be of type string or an instance of Buffer or URL. Received type boolean (false)',
  );
});
