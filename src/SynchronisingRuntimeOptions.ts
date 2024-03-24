import { type Writable } from "svelte/store";

import { getSyncStoreWithBrowserStorage } from "./getSyncStoreWithBrowserStorage";
import type { RuntimeOptions } from "./Options";
import type { StorageManager } from "./storageManagement";

export class SynchronisingRuntimeOptions<T> implements RuntimeOptions<T> {
	private runtimeOptions: RuntimeOptions<T>;
	private syncStoreWithBrowserStorage: () => void;

	constructor(options: RuntimeOptions<T>, store: Writable<T>, storageManager: StorageManager<T>) {
		this.runtimeOptions = options;
		this.syncStoreWithBrowserStorage = getSyncStoreWithBrowserStorage(
			options,
			store,
			storageManager,
		);
	}

	get storageKey() {
		return this.runtimeOptions.storageKey;
	}

	set storageKey(value) {
		if (this.runtimeOptions.storageKey !== value) {
			this.runtimeOptions.storageKey = value;
			this.syncStoreWithBrowserStorage();
		}
	}

	get storageType() {
		return this.runtimeOptions.storageType;
	}

	set storageType(value) {
		if (this.runtimeOptions.storageType !== value) {
			this.runtimeOptions.storageType = value;
			this.syncStoreWithBrowserStorage();
		}
	}

	get serializer() {
		return this.runtimeOptions.serializer;
	}

	set serializer(value) {
		if (this.runtimeOptions.serializer !== value) {
			this.runtimeOptions.serializer = value;
			this.syncStoreWithBrowserStorage();
		}
	}

	get storageEventUpdatesStore() {
		return this.runtimeOptions.storageEventUpdatesStore;
	}

	set storageEventUpdatesStore(value) {
		this.runtimeOptions.storageEventUpdatesStore = value;
	}

	get persistLazily() {
		return this.runtimeOptions.persistLazily;
	}

	set persistLazily(value) {
		this.runtimeOptions.persistLazily = value;
	}

	get resetToDefaultOnParsingError() {
		return this.runtimeOptions.resetToDefaultOnParsingError;
	}

	set resetToDefaultOnParsingError(value) {
		this.runtimeOptions.resetToDefaultOnParsingError = value;
	}
}
