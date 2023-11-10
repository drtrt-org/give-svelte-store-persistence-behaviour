[@drtrt/give-svelte-store-persistence-behaviour](../README.md) / Serializer

# Interface: Serializer\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Methods

- [parse](Serializer.md#parse)
- [stringify](Serializer.md#stringify)

## Methods

### parse

▸ **parse**(`text`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`T`

#### Defined in

[Serializer.ts:2](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/f131837/src/Serializer.ts#L2)

___

### stringify

▸ **stringify**(`object`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |

#### Returns

`string`

#### Defined in

[Serializer.ts:3](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/f131837/src/Serializer.ts#L3)
