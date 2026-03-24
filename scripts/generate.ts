import { readFile, writeFile, readdir } from "node:fs/promises";
import * as csv from "csv";
import chalk from "chalk";
import { join } from "node:path";

const cwd = process.cwd();

const filesList = await readdir(cwd);

const csvFiles = filesList.filter((file) => file.endsWith(".csv"));

if (csvFiles.length < 1) {
  exitWithError("There is no `*.csv` files in the working directory");
}

if (csvFiles.length > 1) {
  exitWithError("There is more than one `*.csv` file in the working directory");
}

const filePath = join(cwd, csvFiles[0]);

const fileData = await readFile(filePath);

const parsedRaw = await parseCsv(fileData);

const parsed: Array<{
  original: string;
  transcription: string;
  translation: string;
}> = [];

parsedRaw.forEach((row) => {
  if (!row[1]) return;

  parsed.push({
    original: row[1],
    transcription: row[2],
    translation: row[3],
  });
});

await writeFile(
  join(import.meta.dirname, "../src/", "data.json"),
  JSON.stringify(parsed, null, 2),
);

// Functions

function exitWithError(message: string) {
  console.log(chalk.red(message));
  process.exit(1);
}

function parseCsv(data: Buffer | string): Promise<Array<Array<string>>> {
  return new Promise((res, rej) => {
    const parser = csv.parse(data);
    const values: Array<Array<string>> = [];

    parser
      .on("data", (row) => {
        values.push(row);
      })
      .on("end", () => {
        res(values);
      })
      .on("error", (error) => {
        rej(error);
      });
  });
}
