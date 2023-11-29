import type { Options } from "../../../dist";

export type OptionsWithoutStorageKey<T> = Omit<Options<T>, "storageKey">;
