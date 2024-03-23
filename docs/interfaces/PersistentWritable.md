[@drtrt/give-svelte-store-persistence-behaviour](../README.md) / PersistentWritable

# Interface: PersistentWritable\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `Writable`\<`T`\>

  ↳ **`PersistentWritable`**

## Table of contents

### Properties

- [runtimeOptions](PersistentWritable.md#runtimeoptions)

### Methods

- [set](PersistentWritable.md#set)
- [subscribe](PersistentWritable.md#subscribe)
- [update](PersistentWritable.md#update)

## Properties

### runtimeOptions

• **runtimeOptions**: [`RuntimeOptions`](RuntimeOptions.md)\<`T`\>

#### Defined in

[src/giveSvelteStorePersistenceBehaviour.ts:12](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/1425e0d/src/giveSvelteStorePersistenceBehaviour.ts#L12)

## Methods

### set

▸ **set**(`this`, `value`): `void`

Set value and inform subscribers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | `void` | - |
| `value` | `T` | to set |

#### Returns

`void`

#### Inherited from

Writable.set

#### Defined in

node_modules/svelte/types/index.d.ts:1628

▸ **set**(`this`, `value`): `void`

Set value and inform subscribers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | `void` | - |
| `value` | `T` | to set |

#### Returns

`void`

#### Inherited from

Writable.set

#### Defined in

tests/infrastructure/testHarness/node_modules/svelte/types/index.d.ts:1628

___

### subscribe

▸ **subscribe**(`this`, `run`, `invalidate?`): `Unsubscriber`

Subscribe on value changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | `void` | - |
| `run` | `Subscriber`\<`T`\> | subscription callback |
| `invalidate?` | `Invalidator`\<`T`\> | cleanup callback |

#### Returns

`Unsubscriber`

#### Inherited from

Writable.subscribe

#### Defined in

node_modules/svelte/types/index.d.ts:1619

▸ **subscribe**(`this`, `run`, `invalidate?`): `Unsubscriber`

Subscribe on value changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | `void` | - |
| `run` | `Subscriber`\<`T`\> | subscription callback |
| `invalidate?` | `Invalidator`\<`T`\> | cleanup callback |

#### Returns

`Unsubscriber`

#### Inherited from

Writable.subscribe

#### Defined in

tests/infrastructure/testHarness/node_modules/svelte/types/index.d.ts:1619

___

### update

▸ **update**(`this`, `updater`): `void`

Update value using callback and inform subscribers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | `void` | - |
| `updater` | `Updater`\<`T`\> | callback |

#### Returns

`void`

#### Inherited from

Writable.update

#### Defined in

node_modules/svelte/types/index.d.ts:1634

▸ **update**(`this`, `updater`): `void`

Update value using callback and inform subscribers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | `void` | - |
| `updater` | `Updater`\<`T`\> | callback |

#### Returns

`void`

#### Inherited from

Writable.update

#### Defined in

tests/infrastructure/testHarness/node_modules/svelte/types/index.d.ts:1634
