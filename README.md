# csval

Check CSV files against a set of validation rules.

## Validation Checks

- CSV file is actually valid itself and can be parsed
- Presence of required fields
- Mismatching types. For example, number vs string
- Minimum and maxiumum lengths
- Number and date ranges
- Regex pattern matching
- Much more. Check the [JSON Schema reference](https://json-schema.org/understanding-json-schema/reference/index.html) for more information

## CLI Installation

```
npm install --global csval
```

## Usage

Run `csval` and give a CSV file as the first argument

```
csval sample-data/simple.csv
```

Since no rules were specified above, the file is only checked to make sure it
can be parsed correctly. As long as it's a valid CSV file, it will pass
validation. The CLI will show errors if they exist. Otherwise, it will display
a success message.

Pass in a rules file to validate against the rules

```
csval sample-data/simple.csv sample-rules/simple.json
```

Again, the CLI will show parsing errors if they exist. When a rules file is
specified as it is above, the CLI will also display any validation errors.
Otherwise, it will display a success message.

### Rules file

Rules files should follow the [JSON
Schema](https://json-schema.org/understanding-json-schema/reference/index.html)
format. It describes what you should expect in each row. Here's an example.

```json
{
  "type": "object", // This line is implied and can be left out
  "properties": {
    "salary": {
      "type": "number"
    }
  }
}
```

The rules above say that the "salary" field on each row must be a number. This
CSV file would pass.

```
name,salary
John,100000
Jane,150000
```

This CSV file would fail.

```
name,salary
John,100000
Jane,idk
```

Here's another example rules file.

```json
{
  "properties": {
    "age": {
      "type": "number",
      "minimum": 0
    }
  }
}
```

This CSV file would pass.

```
name,age
John,30
Jane,50
```

But this one would fail.

```
name,age
John,30
Jane,-10
```

You can require certain fields, as well. Consider this rules file.

```json
{
  "properties": {
    "age": {
      "type": "number"
    }
  },
  "required": ["age"]
}
```

This CSV file would pass.

```
name,age,salary
John,30,100000
Jane,50,150000
```

This one would fail.

```
name,salary
John,100000
Jane,150000
```

There are many other possible rules. See the [JSON
Schema](https://json-schema.org/understanding-json-schema/reference/index.html)
for more information.

## Programmatic API

Install the library

```
npm install csval
```

Use it in your project like so

```javascript
const csval = require("csval");

const main = async () => {
  const csvString= "name,age\nJohn,30";

  const rules = {
    properties: {
      name: {
        type: "string"
      }
    }
  };

  const parsed = await csval.parseCsv(csvString);
  const valid = await csval.validate(parsed, rules);

  // csval.validate will either throw an error or valid will be true
};

main();
```

You can also read CSV data and rules from files.

```javascript
const csval = require("csval");

const main = async () => {
  const csvString= await readCsv("path/to/file.csv");
  const rules = await readRules("path/to/rules.json");
  const parsed = await csval.parseCsv(csvString);
  const valid = await csval.validate(parsed, rules);

  // csval.validate will either throw an error or valid will be true
};

main();
```

## Develop

Clone the repository

```
git clone https://github.com/travishorn/csval.git
```

Change into the directory

```
cd csval
```

Install dependencies

```
npm install
```

## Tests

Run tests via Jest

```
npm run test
```

View test coverage

```
npm run test:coverage
```

## Lint

Lint all JavaScript files

```
npm run lint
```

Automatically fix linting problems if possible

```
npm run lint:fix
```

## License

The MIT License

Copyright 2019 Travis Horn

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
