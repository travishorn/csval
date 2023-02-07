import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { readCsv } from "../src/readCsv.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

use(chaiAsPromised);

describe("readCsv", () => {
  it("reads a CSV file", async () => {
    const data = await readCsv(`${__dirname}/../sample-data/simple.csv`);
    expect(data).to.equal("name,age\nJohn,30");
  });

  it("throws an error on non-existent file", async () => {
    await expect(
      readCsv(`${__dirname}/../sample-data/non-existant.csv`)
    ).to.be.rejectedWith("Cannot find the specified CSV file.");
  });

  it("throws an error when passed a non-string file path", async () => {
    await expect(readCsv(false)).to.be.rejectedWith(
      'The "path" argument must be of type string or an instance of Buffer or URL. Received type boolean (false)'
    );
  });
});
