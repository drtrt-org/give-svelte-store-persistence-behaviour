@drtrt/give-svelte-store-persistence-behaviour

# @drtrt/give-svelte-store-persistence-behaviour

## Table of contents

### Enumerations

- [WebStorageType](enums/WebStorageType.md)

### Interfaces

- [Options](interfaces/Options.md)
- [PersistentWritable](interfaces/PersistentWritable.md)
- [RuntimeOptions](interfaces/RuntimeOptions.md)
- [Serializer](interfaces/Serializer.md)

### Functions

- [giveSvelteStorePersistenceBehaviour](README.md#givesveltestorepersistencebehaviour)

## Functions

### giveSvelteStorePersistenceBehaviour

▸ **giveSvelteStorePersistenceBehaviour**\<`T`\>(`store`, `options`): [`PersistentWritable`](interfaces/PersistentWritable.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `Writable`\<`T`\> |
| `options` | [`Options`](interfaces/Options.md)\<`T`\> |

#### Returns

[`PersistentWritable`](interfaces/PersistentWritable.md)\<`T`\>

#### Defined in

[src/giveSvelteStorePersistenceBehaviour.ts:16](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/e45d43f/src/giveSvelteStorePersistenceBehaviour.ts#L16)
