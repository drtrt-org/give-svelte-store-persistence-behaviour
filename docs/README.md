@drtrt/give-svelte-store-persistence-behaviour

# @drtrt/give-svelte-store-persistence-behaviour

## Table of contents

### Enumerations

- [StorageType](enums/StorageType.md)

### Interfaces

- [Options](interfaces/Options.md)
- [Serializer](interfaces/Serializer.md)

### Functions

- [giveSvelteStorePersistenceBehaviour](README.md#givesveltestorepersistencebehaviour)

## Functions

### giveSvelteStorePersistenceBehaviour

▸ **giveSvelteStorePersistenceBehaviour**\<`T`\>(`store`, `options`): `Writable`\<`T`\> & \{ `options?`: [`Options`](interfaces/Options.md)\<`T`\>  }

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

`Writable`\<`T`\> & \{ `options?`: [`Options`](interfaces/Options.md)\<`T`\>  }

#### Defined in

[giveSvelteStorePersistenceBehaviour.ts:10](https://github.com/drtrt-org/give-svelte-store-persistence-behaviour/blob/ca49d9f/src/giveSvelteStorePersistenceBehaviour.ts#L10)
