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

	return () => {
		const fromStorage = getFromStorage();

		if (fromStorage !== undefined) {
			store.set(fromStorage);
			return;
		}

		if (!runtimeOptions.persistLazily && defaultStoreValue !== undefined) {
			setToStorage(defaultStoreValue);
			store.set(defaultStoreValue);
		}
	};
};
