# @public-js/keep-updated

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
