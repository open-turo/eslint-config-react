# `@open-turo/eslint-config-react`

Turo eslint configuration for react. The config expects that Typescript is being used as it extends
`eslint-config-typescript`.

## Relevant notes

The `eslint` configurations in this repo extend `@open-turo/eslint-config-typescript/legacy`; as it is the base TS
eslint config that supports our existing front-end codebase.

However, if you are creating a new React project and you think you would benefit from having the configurations in this
repository extend the default `@open-turo/eslint-config-typescript` config instead, please raise an issue and/or feel
free to create a PR to add a new default that extends it, and rename the current configurations to `legacy` and
`legacy-extended` respectively. We are not doing that for now to reduce maintenance burden, as it would be unused.

## Usage

Install the package and all of its peer dependencies:

```shell
npx install-peerdeps --dev @open-turo/eslint-config-react
```

Then in your `.eslintrc` file extend from one of the two configurations included in this package:

1. The default, based on our existing front-end repositories
2. The "extended", which adds more react-related plugins. We intend to transition to this one as default over time

### Default config

The default config of this repo is the recommended version for nour existing front-end projects.

To use this config, just add to your `.eslintrc` the following:

```
"extends": "@open-turo/eslint-config-typescript"
```

### Extended config (extended react-related rules)

We also provide an alternative `extended` preset, which adds more react-related plugins.
We intend to transition to this one as default over time; and we encourage you to use it for new projects.

If you want to use this `extended` configuration, you can import it by instead adding the following to your `.eslintrc`:

```
"extends": "@open-turo/eslint-config-typescript/extended"
```

Simply notice the `/extended` suffix, which points to the `extended.js` file in this repository.

## Development

Install [pre-commit](https://pre-commit.com/) and the commit hooks:

```shell
pre-commit install
pre-commit install --hook-type commit-msg
```

## Get Help

Please review Issues, post new Issues against this repository as needed.

## Contributions

Please see [here](https://github.com/open-turo/contributions) for guidelines on how to contribute to this project.
