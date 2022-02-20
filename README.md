# @public-js/keep-updated

[![Version](https://img.shields.io/npm/v/@public-js/keep-updated?style=flat)](https://www.npmjs.com/package/@public-js/keep-updated)
[![Build](https://github.com/public-js/keep-updated/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/public-js/keep-updated/actions/workflows/build.yml)
[![License](https://img.shields.io/npm/l/@public-js/keep-updated?style=flat)](https://www.npmjs.com/package/@public-js/keep-updated)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/fd9ab5088d3442af87a0f335688094fe)](https://www.codacy.com/gh/public-js/keep-updated/dashboard)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/public-js/keep-updated.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/public-js/keep-updated/context:javascript)
[![codecov](https://codecov.io/gh/public-js/keep-updated/branch/main/graph/badge.svg?token=BbVsomZtwx)](https://codecov.io/gh/public-js/keep-updated)
[![Maintainability](https://api.codeclimate.com/v1/badges/5d950db51954705b1ca3/maintainability)](https://codeclimate.com/github/public-js/keep-updated/maintainability)

---

Hassle-free dependency updates

## Getting Started

Add the package to your project by running:

```shell
npm i -D @public-js/keep-updated
```

Add the following array to your `package.json` and populate it with desired packages:

```
"keep-updated": []
```

Execute it directly:

```shell
npx keep-updated
```

or add the following to your root `package.json` file:

```
"scripts": {
  "keep-updated": "keep-updated"
}
```

## How does it work

The package will identify your preferred manager based on the lock-file,
fetch all the dependencies listed in the `keep-updated` array and install
**the latest desired versions** of the listed packages.

Then all changes made to the `package.json` will be reverted retaining only lock-file
information.

You might want to include this package as an additional step to your CI pipeline
e.g. prior to merging branches into `main`.
