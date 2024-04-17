import { get, type Writable } from "svelte/store";

import type { RuntimeOptions } from "./Options";
import { absentStorageEntry, type StorageManager } from "./storageManagement";

export const getSyncStoreWithBrowserStorage = <T>(
	runtimeOptions: RuntimeOptions<T>,
	store: Writable<T>,
	storageManager: StorageManager<T>,
) => {
	const { getFromStorage, setToStorage } = storageManager;

	const defaultBrowserStorageValue = get(store);

	return () => {
		const fromStorage = getFromStorage();

		// If there was an entry in BrowserStorage and it is not 'undefined',
		// then update Svelte Store with this value.
		if (fromStorage !== undefined && fromStorage !== absentStorageEntry) {
			store.set(fromStorage as T);
			return;
		}

		// If the defaultBrowserStorageValue is undefined, there is nothing
		// more we can do.
		if (defaultBrowserStorageValue === undefined) {
			return;
		}

		// TODO: decide if this is necessary...
		store.set(defaultBrowserStorageValue);

		// If we are persistingLazily, then we leave BrowserStorage alone...
		// (It will get updated the next time the wrapped Svelte Store has
		// 'set' called on it.)
		if (runtimeOptions.persistLazily) {
			return;
		}

		// If the value we got from BrowserStorage was 'absent' then
		// we'll set BrowserStorage with the defaultBrowserStorageValue.
		if (fromStorage === absentStorageEntry) {
			setToStorage(defaultBrowserStorageValue);
		}
	};
};
