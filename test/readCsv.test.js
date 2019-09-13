const readCsv = require("../src/readCsv");

test("Reads a file", async () => {
  const data = await readCsv(`${__dirname}/../sample-data/simple.csv`);
  expect(data).toBe("name,age\nJohn,30");
});

test("Throws an error on non-existent file", async () => {
  await expect(
    readCsv(`${__dirname}/../sample-data/non-existant.csv`)
  ).rejects.toThrow("Cannot find the specified CSV file.");
});
