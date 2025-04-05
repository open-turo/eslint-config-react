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

### [`eslint.config.js`](https://eslint.org/docs/latest/use/configure/configuration-files-new) (requires eslint>=v8.23.0)

```js
const turoConfig = require("@open-turo/eslint-config-react");

module.exports = turoConfig();
```

### **[.eslintrc](https://eslint.org/docs/latest/use/configure/configuration-files)** (legacy example)

```jsonc
{
  "extends": "@open-turo/eslint-config-react/recommended",
}
```

You will have to set the `ESLINT_USE_FLAT_CONFIG` env var to true.

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
