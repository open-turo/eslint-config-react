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
    const calculatedConfig =
      await linter.calculateConfigForFile(TSX_TEST_FILE_PATH);
    expect(calculatedConfig.rules).toMatchSnapshot();
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
      const calculatedConfig =
        await linter.calculateConfigForFile(TSX_TEST_FILE_PATH);
      expect(calculatedConfig.rules).toMatchSnapshot();
    },
  );

  test("validates the legacy config and the flat config are the same ruleset", async () => {
    /**
     * Legacy setup
     */
    const ESLintLegacy = await loadESLint({
      useFlatConfig: false,
    });
    const linterLegacy = new ESLintLegacy({
      overrideConfig: {
        parserOptions: {
          tsconfigRootDir: path.resolve(__dirname, "__fixtures__"),
        },
      },
      overrideConfigFile: "./recommended.cjs",
    });
    const calculatedConfig =
      await linterLegacy.calculateConfigForFile(TSX_TEST_FILE_PATH);

    /**
     * Flat config setup - overrideConfigFile: true prevents the project's
     * eslint.config.mjs from being merged on top of the baseConfig, giving
     * us a clean comparison of the two exported configs in isolation.
     */
    const ESLint = await loadESLint({
      useFlatConfig: true,
    });
    const { default: config } = await import(`../index.cjs`);
    const linter = new ESLint({
      baseConfig: config(),
      overrideConfigFile: true,
    });
    const flatConfig = await linter.calculateConfigForFile(TSX_TEST_FILE_PATH);
    const SEVERITY_MAP = { error: 2, off: 0, warn: 1 };

    /**
     * Maps legacy rule severity strings ("off", "warn", "error") to numeric values (0, 1, 2)
     * so that legacy and flat config rules can be compared.
     */
    function mapRulesToNumericSeverity(rules) {
      const result = {};
      for (const [ruleName, ruleValue] of Object.entries(rules)) {
        /** `json` from the Flat config reports here even though it is only supposed to apply to JSON files */
        if (ruleName.startsWith("json/")) continue;
        if (Array.isArray(ruleValue)) {
          const [severity] = ruleValue;
          result[ruleName] = [
            typeof severity === "string" ? SEVERITY_MAP[severity] : severity,
          ];
        } else if (typeof ruleValue === "string") {
          result[ruleName] = [SEVERITY_MAP[ruleValue]];
        } else {
          result[ruleName] = ruleValue;
        }
      }
      return result;
    }

    const mappedCalculatedConfig = mapRulesToNumericSeverity(
      calculatedConfig.rules,
    );
    const mappedFlatConfig = mapRulesToNumericSeverity(flatConfig.rules);

    expect(mappedCalculatedConfig).toStrictEqual(mappedFlatConfig);
  });
});
