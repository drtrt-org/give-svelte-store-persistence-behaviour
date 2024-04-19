import { type Updater, type Writable } from "svelte/store";

import { addDefaultsForMissingOptions } from "./addDefaultsForMissingOptions";
import { getSyncSvelteStoreWithWebStorage } from "./getSyncSvelteStoreWithWebStorage";
import type { Options } from "./Options";
import type { RuntimeOptions } from "./RuntimeOptions";
import { SynchronisingRuntimeOptions } from "./SynchronisingRuntimeOptions";
import { getWebStorageManager } from "./webStorageManagement";

const browser = typeof window !== "undefined" && typeof document !== "undefined";

export interface PersistentWritable<T> extends Writable<T> {
	runtimeOptions: RuntimeOptions<T>;
}

export const giveSvelteStorePersistenceBehaviour = <T>(
	store: Writable<T>,
	options: Options<T>,
): PersistentWritable<T> => {
	const optionsWithDefaults = addDefaultsForMissingOptions(options);

	const webStorageManager = getWebStorageManager(optionsWithDefaults);

	const runtimeOptions = new SynchronisingRuntimeOptions<T>(
		optionsWithDefaults,
		store,
		webStorageManager,
	);

	if (!browser) {
		return { ...store, runtimeOptions };
	}

	getSyncSvelteStoreWithWebStorage(runtimeOptions, store, webStorageManager)();

	const handleStorage = (event: StorageEvent) => {
		if (event.key === runtimeOptions.storageKey) {
			if (runtimeOptions.webStorageEventUpdatesStore === true && event.newValue != null) {
				set(runtimeOptions.serializer.parse(event.newValue));
			}
		}
	};

	const { update, set, ...rest } = store;

	window.addEventListener("storage", handleStorage);

	return {
		...rest,
		set(value: T) {
			webStorageManager.setToStorage(value);
			set(value);
		},
		update(updater: Updater<T>) {
			return update((last) => {
				const value = updater(last);

				webStorageManager.setToStorage(value);

				return value;
			});
		},
		runtimeOptions,
	};
};
