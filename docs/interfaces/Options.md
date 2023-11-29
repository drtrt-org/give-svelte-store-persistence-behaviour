[@drtrt/give-svelte-store-persistence-behaviour](../README.md) / Options

# Interface: Options\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [storageEventDelegate](Options.md#storageEventDelegate)
- [persistOnFirstRun](Options.md#persistonfirstrun)
- [receiveUpdatesFromOtherTabs](Options.md#receiveupdatesfromothertabs)
- [serializer](Options.md#serializer)
- [storageType](Options.md#storagetype)

## Properties

### storageEventDelegate

• `Optional` **storageEventDelegate**: ``null`` \| (`__namedParameters`: \{ `newValue`: ``null`` \| `T` ; `oldValue`: ``null`` \| `T` ; `storageKey`: `string` ; `storageType`: [`StorageType`](../enums/StorageType.md)  }) => `unknown`

#### Defined in

[Options.ts:9](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/865030d/src/Options.ts#L9)

___

### persistOnFirstRun

• `Optional` **persistOnFirstRun**: `boolean`

#### Defined in

[Options.ts:5](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/865030d/src/Options.ts#L5)

___

### receiveUpdatesFromOtherTabs

• `Optional` **receiveUpdatesFromOtherTabs**: `boolean` \| () => `boolean`

#### Defined in

[Options.ts:8](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/865030d/src/Options.ts#L8)

___

### serializer

• `Optional` **serializer**: [`Serializer`](Serializer.md)\<`T`\>

#### Defined in

[Options.ts:6](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/865030d/src/Options.ts#L6)

___

### storageType

• `Optional` **storageType**: [`StorageType`](../enums/StorageType.md)

#### Defined in

[Options.ts:7](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/865030d/src/Options.ts#L7)
