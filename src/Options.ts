import type { Serializer } from "./Serializer";
import { StorageType } from "./StorageType";

export interface Options<T> {
	storageKey: string;
	serializer?: Serializer<T>;
	storageType?: StorageType;
	storageEventUpdatesStore?: boolean;
	persistOnFirstRun?: boolean;
}

export interface IRuntimeOptions<T> extends Required<Options<T>> {}
