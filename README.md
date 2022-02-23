# @public-js/keep-updated

[![Build](https://github.com/public-js/keep-updated/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/public-js/keep-updated/actions/workflows/build.yml)
[![Version](https://img.shields.io/npm/v/@public-js/keep-updated?style=flat)](https://www.npmjs.com/package/@public-js/keep-updated)
[![Downloads](https://img.shields.io/npm/dw/@public-js/keep-updated?style=flat)](https://www.npmjs.com/package/@public-js/keep-updated)
[![Size](https://packagephobia.com/badge?p=@public-js/keep-updated)](https://packagephobia.com/result?p=@public-js/keep-updated)

[![Codacy](https://app.codacy.com/project/badge/Grade/fd9ab5088d3442af87a0f335688094fe)](https://www.codacy.com/gh/public-js/keep-updated/dashboard)
[![LGTM](https://img.shields.io/lgtm/grade/javascript/g/public-js/keep-updated?logo=lgtm)](https://lgtm.com/projects/g/public-js/keep-updated/context:javascript)
[![Codecov](https://codecov.io/gh/public-js/keep-updated/branch/main/graph/badge.svg?token=BbVsomZtwx)](https://codecov.io/gh/public-js/keep-updated)
[![Code Climate](https://api.codeclimate.com/v1/badges/5d950db51954705b1ca3/maintainability)](https://codeclimate.com/github/public-js/keep-updated/maintainability)

Hassle-free dependency updates

---

## Installing

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

## Resources

- [Changelog](CHANGELOG.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

## License

MIT, [full license text](LICENSE).
Read more about it on [TLDRLegal](https://www.tldrlegal.com/l/mit).
