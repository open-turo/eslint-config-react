module.exports = {
  root: true,
  plugins: ["react", "react-hooks", "jsx-a11y", "eslint-plugin-react-compiler"],
  env: {
    browser: true,
  },
  ignorePatterns: ["babel.config.js"],
  extends: [
    "@open-turo/eslint-config-typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "jsx-a11y/anchor-is-valid": [
      "warn",
      {
        specialLink: ["to"],
      },
    ],
    "n/no-unpublished-import": [
      "error",
      {
        allowModules: [
          "@jest/globals",
          "@testing-library/dom",
          "@testing-library/react",
          "@testing-library/user-event",
          "nock",
        ],
      },
    ],
    // don't force .jsx extension
    "react/jsx-filename-extension": "off",
    // In TS you must use the Fragment syntax instead of the shorthand
    "react/jsx-fragments": "off",
    // This allows props to be spread in JSX
    "react/jsx-props-no-spreading": "off",
    // ensure props are alphabetical
    "react/jsx-sort-props": "error",
    // Allow emotion css prop
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    // We don't need default props on TS components
    "react/require-default-props": "off",
    "react/sort-prop-types": "error",
    // State initialization can be in the constructor or via class fields
    "react/state-in-constructor": "off",
    // This allows static properties to be placed within the class declaration
    "react/static-property-placement": "off",
    /** ESLint plugin for the React Compiler, to enforce rules that make adopting it easier/more effective */
    "react-compiler/react-compiler": [
      "error",
      {
        environment: {
          /**
           * At the time of writing, `eslint-plugin-react-compiler` errors on ref usages in render paths. This rule is noisy,
           * since it currently reports false positives. We can remove this in the future when the rule is more accurate.
           * {@link https://github.com/facebook/react/pull/30843 PR that disables this rule in the default config}
           */
          validateRefAccessDuringRender: false,
        },
      },
    ],
    /*
     * Rules that significantly impact performance time of eslint, and are not
     * necessarily relevant for react applications.
     */
    "sonarjs/aws-apigateway-public-api": "off",
    "sonarjs/aws-ec2-rds-dms-public": "off",
    "sonarjs/aws-iam-all-privileges": "off",
    "sonarjs/aws-iam-privilege-escalation": "off",
    "sonarjs/aws-iam-public-access": "off",
    "sonarjs/aws-restricted-ip-admin-access": "off",
    // Already covered with react/no-array-index-key
    "sonarjs/no-array-index-key": "off",
    // Already covered with react/no-unknown-property
    "sonarjs/no-unknown-property": "off",
    "sonarjs/jsx-no-useless-fragment": "off",
    "sonarjs/no-unstable-nested-components": "off",
    // Allow file names to match a component name
    "unicorn/filename-case": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
