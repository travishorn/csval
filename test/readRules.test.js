import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { readRules } from "../src/readRules.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

use(chaiAsPromised);

describe("readRules", () => {
  it("reads rules from a file", async () => {
    const rules = await readRules(`${__dirname}/../sample-rules/simple.json`);
    expect(rules).to.be.an("object");
  });

  it("throws an error on non-existent rules file", async () => {
    await expect(
      readRules(`${__dirname}/../sample-rules/non-existent.json`)
    ).to.be.rejectedWith("Cannot find the specified rules file.");
  });

  it("throws an error when passed a non-string file path", async () => {
    await expect(readRules(false)).to.be.rejectedWith(
      'The "path" argument must be of type string or an instance of Buffer or URL. Received type boolean (false)'
    );
  });
});
