import { loadESLint } from "eslint";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * A .test.tsx file triggers all rule categories in the flat config:
 * - TypeScript rules (files: **\/*.?([cm])tsx)
 * - React rules (files: **\/*.{jsx,tsx,mjsx,cjsx})
 * - Jest rules (files: **\/*.test.?([cm])[jt]s?(x))
 */
const TSX_TEST_FILE_PATH = "./test/sample.test.tsx";

describe("validate config", () => {
  const testFileName = "component.jsx";
  const code = fs.readFileSync(
    path.resolve(__dirname, "__fixtures__", testFileName),
    "utf8",
  );

  test.each(["index.mjs"])(
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
      const calculatedConfig =
        await linter.calculateConfigForFile(TSX_TEST_FILE_PATH);
      expect(calculatedConfig.rules).toMatchSnapshot();
    },
  );
});
