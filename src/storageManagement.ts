import type { RuntimeOptions } from "./Options";
import { StorageType } from "./StorageType";

export interface StorageManager<T> {
	getFromStorage: () => T | symbol;
	setToStorage: (value: T) => void;
}

export const absentStorageEntry: unique symbol = Symbol("absentStorageEntry");

const getStorage = <T>(options: RuntimeOptions<T>) =>
	options.storageType === StorageType.Local ? window.localStorage : window.sessionStorage;

const makeStorageGetter =
	<T>(options: RuntimeOptions<T>) =>
	(): T | symbol => {
		const stringified = getStorage(options).getItem(options.storageKey);
		if (stringified === null) {
			return absentStorageEntry;
		}

		return options.serializer.parse(stringified);
	};

const makeStorageSetter =
	<T>(options: RuntimeOptions<T>) =>
	(value: T) => {
		getStorage(options).setItem(options.storageKey, options.serializer.stringify(value));
	};

export const getStorageManager = <T>(options: RuntimeOptions<T>): StorageManager<T> => ({
	getFromStorage: makeStorageGetter(options),
	setToStorage: makeStorageSetter(options),
});
