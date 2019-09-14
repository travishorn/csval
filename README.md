# csval

Check CSV files against a set of validation rules.

## Features

- Checks that the CSV file is actually valid itself and can be parsed
- Checks for the presence of required fields

## Installation

Clone the repository.

```
git clone https://github.com/travishorn/csval.git
```

Change into the directory.

```
cd csval
```

Install dependencies.

```
npm install
```

## Usage

Run `src/cli.js` and give a CSV file as the first argument

```
node src/cli.js sample-data/simple.csv
```

Since no rules were specified above, the file is only checked to make sure it
can be parsed correctly. As long as it's a valid CSV file, it will pass
validation. The CLI will show errors if they exist. Otherwise, it will display
a success message.

Pass in a rules file to validate against the rules

```
node src/cli sample-data/simple.csv sample-rules/simple.json
```

Again, the CLI will show parsing errors if they exist. When a rules file is
specified as it is above, the CLI will also display any validation errors.
Otherwise, it will display a success message.

## Tests

Run tests via Jest

```
npm run test
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

## To Do

- Add more validation features

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
