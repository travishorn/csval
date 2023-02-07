import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { parseCsv } from "../src/parseCsv.js";
import { readCsv } from "../src/readCsv.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

use(chaiAsPromised);

describe("parseCsv", () => {
  it("parses a CSV string", async () => {
    const parsed = await parseCsv("name,age\nJohn,30");
    expect(parsed.errors.length).to.equal(0);
  });

  it("parses a read file", async () => {
    const data = await readCsv(`${__dirname}/../sample-data/simple.csv`);
    const parsed = await parseCsv(data);
    expect(parsed.errors.length).to.equal(0);
  });

  it("throws an error on row with too few fields.", async () => {
    await expect(parseCsv("name,age,salary\nJohn,30")).to.be.rejectedWith(
      "Parse error: Row 2: Too few fields: expected 3 fields but parsed 2"
    );
  });

  it("throws an error on row with too many fields", async () => {
    await expect(parseCsv("name,age\nJohn,30,75000")).to.be.rejectedWith(
      "Parse error: Row 2: Too many fields: expected 2 fields but parsed 3"
    );
  });

  it("throws an error when delimiter cannot be detected", async () => {
    await expect(parseCsv("")).to.be.rejectedWith(
      "Parse error: Unable to auto-detect delimiting character; defaulted to ','"
    );

    await expect(parseCsv("name age\nJohn 30")).to.be.rejectedWith(
      "Parse error: Unable to auto-detect delimiting character; defaulted to ','"
    );
  });

  it("Throws an error when quoted fields are malformed", async () => {
    await expect(parseCsv('a,"b,c\nd,e,f')).to.be.rejectedWith(
      "Parse error: Row 2: Quoted field unterminated"
    );

    await expect(parseCsv('a,"b,"c\nd,e,f')).to.be.rejectedWith(
      "Parse errors:\n - Row 2: Trailing quote on quoted field is malformed\n - Row 2: Quoted field unterminated"
    );

    await expect(parseCsv('a,"b"c,d\ne,f,g')).to.be.rejectedWith(
      "Parse errors:\n - Row 2: Trailing quote on quoted field is malformed\n - Row 2: Quoted field unterminated"
    );

    await expect(parseCsv('a,"b,c\nd"e,f,g')).to.be.rejectedWith(
      "Parse errors:\n - Row 2: Trailing quote on quoted field is malformed\n - Row 2: Quoted field unterminated"
    );
  });
});
