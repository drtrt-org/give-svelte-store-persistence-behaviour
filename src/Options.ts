import type { Serializer } from "./Serializer";
import { StorageType } from "./StorageType";

interface BaseOptions<T> {
	storageKey: string;
	serializer?: Serializer<T>;
	storageType?: StorageType;
	storageEventUpdatesStore?: boolean;
}

export interface Options<T> extends BaseOptions<T> {
	persistOnFirstRun?: boolean;
}

export interface RuntimeOptions<T> extends Required<BaseOptions<T>> {}
