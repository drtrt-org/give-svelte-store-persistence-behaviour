import type { Serializer } from "./Serializer";
import { StorageType } from "./StorageType";

export interface Options<T> {
	storageKey: string;
	persistOnFirstRun?: boolean;
	serializer?: Serializer<T>;
	storageType?: StorageType;
	receiveUpdatesFromOtherTabs?: boolean;
	storageEventDelegate?: <V>({
		storageKey,
		storageType,
		oldValue,
		newValue,
	}: {
		storageKey: string;
		storageType: StorageType;
		oldValue: T | null;
		newValue: T | null;
	}) => V;
}
