import { type Updater, type Writable } from "svelte/store";

import { RuntimeOptions } from "./getRuntimeOptions";
import { getSyncStoreWithBrowserStorage } from "./getSyncStoreWithBrowserStorage";
import type { Options } from "./Options";
import { getStorageManager } from "./storageManagement";

const browser = typeof window !== "undefined" && typeof document !== "undefined";

export interface PersistentWritable<T> extends Writable<T> {
	runtimeOptions: RuntimeOptions<T>;
}

export const giveSvelteStorePersistenceBehaviour = <T>(
	store: Writable<T>,
	options: Options<T>,
): PersistentWritable<T> => {
	const runtimeOptions = new RuntimeOptions<T>(options, store);

	if (!browser) {
		return { ...store, runtimeOptions };
	}

	// const persistOnFirstRun = options.persistOnFirstRun ?? true;

	const { getFromStorage, setToStorage } = getStorageManager(runtimeOptions);

	getSyncStoreWithBrowserStorage(runtimeOptions, store)();

	const handleStorage = (event: StorageEvent) => {
		if (event.key === runtimeOptions.storageKey) {
			if (runtimeOptions.storageEventUpdatesStore === true && event.newValue != null) {
				set(runtimeOptions.serializer.parse(event.newValue));
			}
		}
	};

	const { update, set, ...rest } = store;

	window.addEventListener("storage", handleStorage);

	return {
		...rest,
		set(value: T) {
			setToStorage(value);
			set(value);
		},
		update(updater: Updater<T>) {
			return update((last) => {
				const value = updater(last);

				setToStorage(value);

				return value;
			});
		},
		runtimeOptions,
	};
};
