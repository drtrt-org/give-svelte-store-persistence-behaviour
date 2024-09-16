# give-svelte-store-persistence-behaviour

[![CI status](https://img.shields.io/badge/ci-passing-green)](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/actions/workflows/CI.yml)
[![NPM version](https://img.shields.io/npm/v/@drtrt/give-svelte-store-persistence-behaviour)](https://www.npmjs.com/package/@drtrt/give-svelte-store-persistence-behaviour)
[![License](https://img.shields.io/npm/l/@drtrt/give-svelte-store-persistence-behaviour)](./LICENSE)
[![NPM bundle size analysis](https://img.shields.io/bundlephobia/minzip/@drtrt/give-svelte-store-persistence-behaviour)](https://bundlephobia.com/package/@drtrt/give-svelte-store-persistence-behaviour)

A wrapper for any Svelte Store instance that gives it Browser Storage persistence, with configuration options available at instantiation or runtime.

| _`@drtrt/give-svelte-store-previous-behaviour` is used to persist state in [Fluent API Generator](https://www.fluentapigen.com)_ |
| :------------------------------------------------------------------------------------------------------------------------------- |

<br/>

## It's a wrap

`give-svelte-store-persistence-behaviour` does not instantiate a Store. Rather, **_it wraps an existing Store_**, leaving you with full control over how your Store is instantiated. This is important because:

-   You are not prevented from further adding your own augmentations to the Store, either _before_ it has been given Previous Behaviour or _after_.

-   It allows you to apply other wrappers, too, such as [@drtrt/give-svelte-store-previous-behaviour](https://www.npmjs.com/package/@drtrt/give-svelte-store-previous-behaviour).

This philosophy allows for a flexible, compositional approach, as is used in the [core Svelte Store code](https://github.com/sveltejs/svelte/blob/master/packages/svelte/src/runtime/store/index.js) that creates `readable` and `derived` Stores.

## Types

A full set of types is available for TypeScript consumers.

Full detail is available in the [dedicated Types documentation](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/main/docs/README.md).

## Questions

### Why did you spell 'behaviour' wrong?

#### **Answer:** I didn't. 😉

## Release History

The Change Log for this package is available in the GitHub Repo, [here](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/main/CHANGELOG.md).
