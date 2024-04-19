import type { Serializer } from "./Serializer";
import { WebStorageType } from "./WebStorageType";

export interface Options<T> {
	storageKey: string;
	serializer?: Serializer<T>;
	webStorageType?: WebStorageType;
	webStorageEventUpdatesStore?: boolean;
	initializeWebStorage?: boolean;
}
