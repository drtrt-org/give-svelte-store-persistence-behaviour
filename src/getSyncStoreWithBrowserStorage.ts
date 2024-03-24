import { get, type Writable } from "svelte/store";

import type { RuntimeOptions } from "./Options";
import type { StorageManager } from "./storageManagement";

export const getSyncStoreWithBrowserStorage = <T>(
	runtimeOptions: RuntimeOptions<T>,
	store: Writable<T>,
	storageManager: StorageManager<T>,
) => {
	const { getFromStorage, setToStorage } = storageManager;
	const defaultStoreValue = get(store);

	const resetToDefault = () => {
		setToStorage(defaultStoreValue);
		store.set(defaultStoreValue);
	};

	return () => {
		let fromStorage;

		try {
			fromStorage = getFromStorage();
		} catch (error) {
			if (runtimeOptions.resetToDefaultOnParsingError) {
				resetToDefault();
			}

			throw error;
		}

		if (fromStorage !== undefined) {
			store.set(fromStorage);
			return;
		}

		if (!runtimeOptions.persistLazily && defaultStoreValue !== undefined) {
			resetToDefault();
		}
	};
};
