module.exports = {
  extends: [
    "@open-turo/eslint-config-typescript",
    "plugin:@next/next/recommended",
  ],
  rules: {
    "import/no-default-export": "off",
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["test/**/", "**/*.test.*"] },
    ],
    "node/no-unpublished-import": [
      "error",
      {
        allowModules: [
          "@graphql-typed-document-node/core",
          "@jest/globals",
          "@testing-library/dom",
          "@testing-library/react",
          "@testing-library/user-event",
          "nock",
        ],
      },
    ],
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    "unicorn/prevent-abbreviations": [
      "error",
      {
        replacements: {
          args: false,
          env: false,
          props: false,
        },
      },
    ],
  },
};
