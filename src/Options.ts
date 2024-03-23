import type { Serializer } from "./Serializer";
import { StorageType } from "./StorageType";

export interface Options<T> {
	storageKey: string;
	serializer?: Serializer<T>;
	storageType?: StorageType;
	storageEventUpdatesStore?: boolean;
	persistLazily?: boolean;
	resetToDefaultOnParsingError?: boolean;
}

export interface RuntimeOptions<T> extends Required<Options<T>> {}
