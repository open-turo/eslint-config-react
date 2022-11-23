module.exports = {
  root: true,
  env: {
    browser: true,
  },
  ignorePatterns: ["babel.config.js"],
  extends: ["@open-turo/eslint-config-typescript/legacy"],
  rules: {
    "node/no-unpublished-import": [
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
  },
};
