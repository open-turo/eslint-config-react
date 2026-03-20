import type { Plugins as TuroPlugins } from "@open-turo/eslint-config-typescript";
import type jsxA11y from "eslint-plugin-jsx-a11y";
import type react from "eslint-plugin-react";
import type reactHooks from "eslint-plugin-react-hooks";
import type { Config } from "eslint/config";
import type globals from "globals";

export interface Options {
  /** Options forwarded to `@open-turo/eslint-config-typescript` */
  turo?: TuroOptions;
}

/**
 * The underlying ESLint plugins bundled with this config, re-exported so
 * consumers can extend or reference them without adding redundant direct
 * dependencies to their own `package.json`.
 */
export interface Plugins extends TuroPlugins {
  globals: typeof globals;
  jsxA11y: typeof jsxA11y;
  react: typeof react;
  reactHooks: typeof reactHooks;
}

export interface TuroOptions {
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

declare function config(options?: Options): Config[];
declare namespace config {
  const plugins: Plugins;
}

// eslint-disable-next-line import-x/no-default-export -- Not valid here
export default config;
