import type { Config } from "eslint/config";

declare namespace config {
  interface Options {
    /** Options forwarded to `@open-turo/eslint-config-typescript` */
    turo?: TuroOptions;
  }

  interface TuroOptions {
    /** List of modules to allow in the `n/no-unpublished-import` rule */
    allowModules?: string[];
    /** The ECMAScript version to use */
    ecmaVersion?: "latest" | number;
    /** List of glob patterns to ignore */
    ignores?: string[];
    /** Test framework to use (defaults to `"jest"`) */
    testFramework?: "jest" | "vitest";
    /** Whether to include TypeScript rules (defaults to `true`) */
    typescript?: boolean;
  }
}

declare function config(options?: config.Options): Config[];

export = config;
