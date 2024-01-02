import { type Updater, type Writable } from "svelte/store";

import { addDefaultsForMissingOptions } from "./addDefaultsForMissingOptions";
import { getSyncStoreWithBrowserStorage } from "./getSyncStoreWithBrowserStorage";
import type { RuntimeOptions, Options } from "./Options";
import { getStorageManager } from "./storageManagement";
import { SynchronisingRuntimeOptions } from "./SynchronisingRuntimeOptions";

const browser = typeof window !== "undefined" && typeof document !== "undefined";

export interface PersistentWritable<T> extends Writable<T> {
	runtimeOptions: RuntimeOptions<T>;
}

export const giveSvelteStorePersistenceBehaviour = <T>(
	store: Writable<T>,
	options: Options<T>,
): PersistentWritable<T> => {
	const optionsWithDefaults = addDefaultsForMissingOptions(options);

	const storageManager = getStorageManager(optionsWithDefaults);

	const runtimeOptions = new SynchronisingRuntimeOptions<T>(
		optionsWithDefaults,
		store,
		storageManager,
	);

	if (!browser) {
		return { ...store, runtimeOptions };
	}

	getSyncStoreWithBrowserStorage(runtimeOptions, store, storageManager)();

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
			storageManager.setToStorage(value);
			set(value);
		},
		update(updater: Updater<T>) {
			return update((last) => {
				const value = updater(last);

				storageManager.setToStorage(value);

				return value;
			});
		},
		runtimeOptions,
	};
};
