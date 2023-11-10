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

▸ **giveSvelteStorePersistenceBehaviour**\<`T`\>(`store`, `storageKey`, `options?`): `Writable`\<`T`\> & \{ `setStorageKey`: `SetStorageKey`\<`T`\>  }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `Writable`\<`T`\> |
| `storageKey` | `string` |
| `options` | [`Options`](interfaces/Options.md)\<`T`\> |

#### Returns

`Writable`\<`T`\> & \{ `setStorageKey`: `SetStorageKey`\<`T`\>  }

#### Defined in

giveSvelteStorePersistenceBehaviour.ts:30
