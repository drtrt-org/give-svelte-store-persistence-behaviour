import type { Serializer } from "./Serializer";
import { StorageType } from "./StorageType";

export interface Options<T> {
	persistOnFirstRun?: boolean;
	serializer?: Serializer<T>;
	storageType?: StorageType;
	receiveUpdatesFromOtherTabs?: boolean | (() => boolean);
	otherTabStateChangedDelegate?:
		| null
		| (({
				storageKey,
				storageType,
				oldValue,
				newValue,
		  }: {
				storageKey: string;
				storageType: StorageType;
				oldValue: T | null;
				newValue: T | null;
		  }) => unknown);
}
