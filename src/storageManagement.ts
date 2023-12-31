import type { RuntimeOptions } from "./Options";
import { StorageType } from "./StorageType";

export interface StorageManager<T> {
	getFromStorage: () => T | undefined;
	setToStorage: (value: T) => void;
}

const getStorage = <T>(options: RuntimeOptions<T>) =>
	options.storageType === StorageType.Local ? window.localStorage : window.sessionStorage;

const makeStorageGetter =
	<T>(options: RuntimeOptions<T>) =>
	(): T | undefined => {
		const stringified = getStorage(options).getItem(options.storageKey);

		return stringified === null ? undefined : options.serializer.parse(stringified);
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
