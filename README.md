# `@open-turo/eslint-config-react`

Turo eslint configuration for react. The config expects that Typescript is being used as it extends
`eslint-config-typescript`.

[![Release](https://img.shields.io/github/v/release/open-turo/eslint-config-react)](https://github.com/open-turo/eslint-config-react/releases/)
[![Tests pass/fail](https://img.shields.io/github/actions/workflow/status/open-turo/eslint-config-react/ci.yaml)](https://github.com/open-turo/eslint-config-react/actions/)
[![License](https://img.shields.io/github/license/open-turo/eslint-config-react)](./LICENSE)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://github.com/dwyl/esta/issues)
![CI](https://github.com/open-turo/eslint-config-react/actions/workflows/release.yaml/badge.svg)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Conventional commits](https://img.shields.io/badge/conventional%20commits-1.0.2-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Join us!](https://img.shields.io/badge/Turo-Join%20us%21-593CFB.svg)](https://turo.com/jobs)

## Usage

Install the package and all of its peer dependencies:

```shell
npx install-peerdeps --dev @open-turo/eslint-config-react
```

Then in your `.eslintrc` file, extend from the default configuration of this package, which is the recommended eslint
configuration for our existing front-end projects.

To use this config, just add to your `.eslintrc` the following:

```
"extends": "@open-turo/eslint-config-typescript"
```

### Legacy preset

There is a `legacy` preset that extends `@open-turo/eslint-config-typescript/legacy`. This only exists for backwards
compatibility with existing projects. It is strongly recommended to use the standard preset.

To use the `legacy` preset, update your `.eslintrc` file to be:

```json
{
  "extends": "@open-turo/eslint-config-react/legacy"
}
```

## Development

### Pre-commit

Install [pre-commit](https://pre-commit.com/) and the commit hooks:

```shell
pre-commit install
pre-commit install --hook-type commit-msg
```

### Keeping peerDependencies up-to-date

Transitive `peerDependencies` should be added, and kept up to date. A useful tool for that task is
`npx check-peer-dependencies`, which shows us our missing (or outdated) peerDependencies.

## Get Help

Please review Issues, post new Issues against this repository as needed.

## Contributions

Please see [here](https://github.com/open-turo/contributions) for guidelines on how to contribute to this project.
