import type { IRuntimeOptions } from "./Options";
import { StorageType } from "./StorageType";

const getStorage = <T>(options: IRuntimeOptions<T>) =>
	options.storageType === StorageType.Local ? window.localStorage : window.sessionStorage;

export const makeStorageGetter =
	<T>(options: IRuntimeOptions<T>) =>
	(): T | undefined => {
		const stringified = getStorage(options).getItem(options.storageKey);

		return stringified === null ? undefined : options.serializer.parse(stringified);
	};

export const makeStorageSetter =
	<T>(options: IRuntimeOptions<T>) =>
	(value: T) => {
		getStorage(options).setItem(options.storageKey, options.serializer.stringify(value));
	};

export const getStorageManager = <T>(options: IRuntimeOptions<T>) => ({
	getFromStorage: makeStorageGetter(options),
	setToStorage: makeStorageSetter(options),
});
