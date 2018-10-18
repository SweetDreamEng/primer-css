# Primer

[![npm version](https://img.shields.io/npm/v/primer.svg)](https://www.npmjs.org/package/primer)
[![Build Status](https://travis-ci.org/primer/primer.svg?branch=master)](https://travis-ci.org/primer/primer)

Primer is the design system that powers GitHub. Primer includes 23 packages that are grouped into 3 core meta-packages for easy install. Each package and meta-package is independently versioned and distributed via npm, so it's easy to include all or part of Primer within your own project.

## Packages

The Primer repo is managed as a monorepo that is composed of many npm packages.

### Core Packages

| Package | Version |
|---|---|
| **[primer](/modules/primer)** <br />Includes all 23 packages | [![npm](https://img.shields.io/npm/v/primer.svg)](https://www.npmjs.com/package/primer) |
| [primer-core](/modules/primer-core) | [![npm](https://img.shields.io/npm/v/primer-core.svg)](https://www.npmjs.com/package/primer-core) |
| [primer-product](/modules/primer-product) |  [![npm](https://img.shields.io/npm/v/primer-product.svg)](https://www.npmjs.com/package/primer-product) |
| [primer-marketing](/modules/primer-marketing) | [![npm](https://img.shields.io/npm/v/primer-marketing.svg)](https://www.npmjs.com/package/primer-marketing) |

## Install

This repository is distributed with [npm][npm]. After [installing npm][install-npm], you can install `primer` with this command.

```sh
$ npm install --save primer
```

## Usage

The source files included are written in [Sass][sass] (SCSS). After [installing](#install) with npm, you can add your project's `node_modules` directory to your Sass [include paths](https://github.com/sass/node-sass#includepaths) (AKA [load paths](http://technology.customink.com/blog/2014/10/09/understanding-and-using-sass-load-paths/) in Ruby), then import it like this:

```scss
@import "primer/index.scss";
```

You can import individual Primer modules by installing them with npm, for instance:

```sh
$ npm install --save primer-navigation
```

Then, you would import the module with:

```scss
@import "primer-navigation/index.scss";
```

## Development
See [DEVELOP.md](./DEVELOP.md) for development docs.

## Releasing (Staff only)
You can find docs about our release process in [RELEASING.md](./RELEASING.md).

## Documentation

Primer CSS documentation is published to the [GitHub Style Guide](https://styleguide.github.com/primer/).

## License

[MIT](./LICENSE) &copy; [GitHub](https://github.com/)

[primer]: https://github.com/primer/primer
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
