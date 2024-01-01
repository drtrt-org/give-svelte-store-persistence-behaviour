import { type Writable } from "svelte/store";

import type { IRuntimeOptions, Options } from "./Options";
import { StorageType } from "./StorageType";
import { getSyncStoreWithBrowserStorage } from "./getSyncStoreWithBrowserStorage";

const defaultOptions = {
	serializer: JSON,
	storageType: StorageType.Local,
	storageEventUpdatesStore: true,
	persistOnFirstRun: true,
};

export class RuntimeOptions<T> implements IRuntimeOptions<T> {
	private runtimeOptions: IRuntimeOptions<T>;
	private syncStoreValue: () => void;

	constructor(options: Options<T>, store: Writable<T>) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const runtimeOptions = { ...defaultOptions, ...options };

		this.runtimeOptions = runtimeOptions;
		this.syncStoreValue = getSyncStoreWithBrowserStorage(runtimeOptions, store);
	}

	get storageKey() {
		return this.runtimeOptions.storageKey;
	}

	set storageKey(value) {
		this.runtimeOptions.storageKey = value;
		this.syncStoreValue();
	}

	get storageType() {
		return this.runtimeOptions.storageType;
	}

	set storageType(value) {
		this.runtimeOptions.storageType = value;
		this.syncStoreValue();
	}

	get serializer() {
		return this.runtimeOptions.serializer;
	}

	set serializer(value) {
		this.runtimeOptions.serializer = value;
	}

	get storageEventUpdatesStore() {
		return this.runtimeOptions.storageEventUpdatesStore;
	}

	set storageEventUpdatesStore(value) {
		this.runtimeOptions.storageEventUpdatesStore = value;
	}

	get persistOnFirstRun() {
		return this.runtimeOptions.persistOnFirstRun;
	}

	set persistOnFirstRun(value) {
		this.runtimeOptions.persistOnFirstRun = value;
	}
}
