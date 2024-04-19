import { get, type Writable } from "svelte/store";

import type { RuntimeOptions } from "./RuntimeOptions";
import { absentStorageEntry, type WebStorageManager } from "./webStorageManagement";

export const getSyncSvelteStoreWithWebStorage = <T>(
	runtimeOptions: RuntimeOptions<T>,
	store: Writable<T>,
	webStorageManager: WebStorageManager<T>,
) => {
	const { getFromStorage, setToStorage } = webStorageManager;

	const defaultWebStorageValue = get(store);

	return () => {
		const fromStorage = getFromStorage();

		if (fromStorage !== undefined && fromStorage !== absentStorageEntry) {
			store.set(fromStorage as T);
			return;
		}

		if (defaultWebStorageValue === undefined) {
			return;
		}

		store.set(defaultWebStorageValue);

		if (runtimeOptions.initializeWebStorage && fromStorage === absentStorageEntry) {
			setToStorage(defaultWebStorageValue);
		}
	};
};

/* 

initializeWebStorage

*/
