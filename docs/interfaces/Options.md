[@drtrt/give-svelte-store-persistence-behaviour](../README.md) / Options

# Interface: Options\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [persistOnFirstRun](Options.md#persistonfirstrun)
- [receiveUpdatesFromOtherTabs](Options.md#receiveupdatesfromothertabs)
- [serializer](Options.md#serializer)
- [storageEventDelegate](Options.md#storageeventdelegate)
- [storageKey](Options.md#storagekey)
- [storageType](Options.md#storagetype)

## Properties

### persistOnFirstRun

• `Optional` **persistOnFirstRun**: `boolean`

#### Defined in

[Options.ts:6](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/ca49d9f/src/Options.ts#L6)

___

### receiveUpdatesFromOtherTabs

• `Optional` **receiveUpdatesFromOtherTabs**: `boolean`

#### Defined in

[Options.ts:9](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/ca49d9f/src/Options.ts#L9)

___

### serializer

• `Optional` **serializer**: [`Serializer`](Serializer.md)\<`T`\>

#### Defined in

[Options.ts:7](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/ca49d9f/src/Options.ts#L7)

___

### storageEventDelegate

• `Optional` **storageEventDelegate**: \<V\>(`__namedParameters`: \{ `newValue`: ``null`` \| `T` ; `oldValue`: ``null`` \| `T` ; `storageKey`: `string` ; `storageType`: [`StorageType`](../enums/StorageType.md)  }) => `V`

#### Type declaration

▸ \<`V`\>(`«destructured»`): `V`

##### Type parameters

| Name |
| :------ |
| `V` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `newValue` | ``null`` \| `T` |
| › `oldValue` | ``null`` \| `T` |
| › `storageKey` | `string` |
| › `storageType` | [`StorageType`](../enums/StorageType.md) |

##### Returns

`V`

#### Defined in

[Options.ts:10](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/ca49d9f/src/Options.ts#L10)

___

### storageKey

• **storageKey**: `string`

#### Defined in

[Options.ts:5](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/ca49d9f/src/Options.ts#L5)

___

### storageType

• `Optional` **storageType**: [`StorageType`](../enums/StorageType.md)

#### Defined in

[Options.ts:8](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/ca49d9f/src/Options.ts#L8)
