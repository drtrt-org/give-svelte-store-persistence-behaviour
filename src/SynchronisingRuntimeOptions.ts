import { type Writable } from "svelte/store";

import { getSyncSvelteStoreWithWebStorage } from "./getSyncSvelteStoreWithWebStorage";
import type { RuntimeOptions } from "./RuntimeOptions";
import type { WebStorageManager } from "./webStorageManagement";

export class SynchronisingRuntimeOptions<T> implements RuntimeOptions<T> {
	private runtimeOptions: RuntimeOptions<T>;
	private syncStoreWithWebStorage: () => void;

	constructor(
		options: RuntimeOptions<T>,
		store: Writable<T>,
		webStorageManager: WebStorageManager<T>,
	) {
		this.runtimeOptions = options;
		this.syncStoreWithWebStorage = getSyncSvelteStoreWithWebStorage(
			options,
			store,
			webStorageManager,
		);
	}

	get storageKey() {
		return this.runtimeOptions.storageKey;
	}

	set storageKey(value) {
		if (this.runtimeOptions.storageKey !== value) {
			this.runtimeOptions.storageKey = value;
			this.syncStoreWithWebStorage();
		}
	}

	get webStorageType() {
		return this.runtimeOptions.webStorageType;
	}

	set webStorageType(value) {
		if (this.runtimeOptions.webStorageType !== value) {
			this.runtimeOptions.webStorageType = value;
			this.syncStoreWithWebStorage();
		}
	}

	get serializer() {
		return this.runtimeOptions.serializer;
	}

	set serializer(value) {
		if (this.runtimeOptions.serializer !== value) {
			this.runtimeOptions.serializer = value;
			this.syncStoreWithWebStorage();
		}
	}

	get webStorageEventUpdatesStore() {
		return this.runtimeOptions.webStorageEventUpdatesStore;
	}

	set webStorageEventUpdatesStore(value) {
		this.runtimeOptions.webStorageEventUpdatesStore = value;
	}

	get initializeWebStorage() {
		return this.runtimeOptions.initializeWebStorage;
	}

	set initializeWebStorage(value) {
		this.runtimeOptions.initializeWebStorage = value;
	}
}
