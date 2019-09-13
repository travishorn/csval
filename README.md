# csval

Validate CSV files. Work in progress.

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

- Create a way to pass in rules file via CLI
- Add more validation features
- Keep the validation library and the CLI loosely coupled

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
