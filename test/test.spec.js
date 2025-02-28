import { loadESLint } from "eslint";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("validate config", () => {
  const testFileName = "component.jsx";
  const code = fs.readFileSync(
    path.resolve(__dirname, "__fixtures__", testFileName),
    "utf8",
  );

  test("the legacy recommended config is correct", async () => {
    // Unlike the new flat config, the legacy turo config only works with TS, so we create a simple tsconfig.json file
    // in the __fixtures__ directory to make it work
    const ESLint = await loadESLint({
      useFlatConfig: false,
    });
    const linter = new ESLint({
      overrideConfig: {
        parserOptions: {
          tsconfigRootDir: path.resolve(__dirname, "__fixtures__"),
        },
      },
      overrideConfigFile: "./recommended.cjs",
    });
    const messages = await linter.lintFiles(
      path.resolve(__dirname, "__fixtures__", testFileName),
      {
        cwd: path.resolve(__dirname, "__fixtures__"),
      },
    );
    expect(messages[0].messages).toEqual([]);
    expect(messages[0].errorCount).toEqual(0);
  });

  test.each(["index.mjs", "index.cjs"])(
    `the flat config is correct for %s`,
    async (configFile) => {
      const ESLint = await loadESLint({
        useFlatConfig: true,
      });
      const { default: config } = await import(`../${configFile}`);
      const linter = new ESLint({
        baseConfig: config(),
        overrideConfig: [
          {
            files: [testFileName],
          },
        ],
      });
      const messages = await linter.lintText(code, {
        filePath: testFileName,
      });
      expect(messages[0].messages).toEqual([]);
      expect(messages[0].errorCount).toEqual(0);
    },
  );
});
