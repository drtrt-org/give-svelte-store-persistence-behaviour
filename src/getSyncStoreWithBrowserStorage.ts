import { get, type Writable } from "svelte/store";
import type { IRuntimeOptions } from "./Options";
import { getStorageManager } from "./storageManagement";

export const getSyncStoreWithBrowserStorage = <T>(
	runtimeOptions: IRuntimeOptions<T>,
	store: Writable<T>,
) => {
	const { getFromStorage, setToStorage } = getStorageManager<T>(runtimeOptions);
	const defaultStoreValue = get(store);

	return () => {
		const fromStorage = getFromStorage();

		if (fromStorage != undefined) {
			store.set(fromStorage);
			return;
		}

		if (runtimeOptions.persistOnFirstRun && defaultStoreValue !== undefined) {
			setToStorage(defaultStoreValue);
		}
	};
};
