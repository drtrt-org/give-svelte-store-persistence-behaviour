[**@drtrt/give-svelte-store-persistence-behaviour**](../README.md) • **Docs**

***

[@drtrt/give-svelte-store-persistence-behaviour](../README.md) / PersistentWritable

# Interface: PersistentWritable\<T\>

## Extends

- `Writable`\<`T`\>

## Type Parameters

• **T**

## Properties

### runtimeOptions

> **runtimeOptions**: `Required`\<[`Options`](Options.md)\<`T`\>\>

#### Defined in

[src/giveSvelteStorePersistenceBehaviour.ts:13](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/b436ca4110b544304f1cd2e9bed064c24a3d7d54/src/giveSvelteStorePersistenceBehaviour.ts#L13)

## Methods

### set()

> **set**(`this`, `value`): `void`

Set value and inform subscribers.

#### Parameters

• **this**: `void`

• **value**: `T`

to set

#### Returns

`void`

#### Inherited from

`Writable.set`

#### Defined in

node\_modules/svelte/types/index.d.ts:1628

***

### subscribe()

> **subscribe**(`this`, `run`, `invalidate`?): `Unsubscriber`

Subscribe on value changes.

#### Parameters

• **this**: `void`

• **run**: `Subscriber`\<`T`\>

subscription callback

• **invalidate?**: `Invalidator`\<`T`\>

cleanup callback

#### Returns

`Unsubscriber`

#### Inherited from

`Writable.subscribe`

#### Defined in

node\_modules/svelte/types/index.d.ts:1619

***

### update()

> **update**(`this`, `updater`): `void`

Update value using callback and inform subscribers.

#### Parameters

• **this**: `void`

• **updater**: `Updater`\<`T`\>

callback

#### Returns

`void`

#### Inherited from

`Writable.update`

#### Defined in

node\_modules/svelte/types/index.d.ts:1634
