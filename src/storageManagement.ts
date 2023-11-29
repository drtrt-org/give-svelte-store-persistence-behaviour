import type { Options } from "./Options";
import { StorageType } from "./StorageType";

const getStorage = <T>(options: Options<T>) =>
	options.storageType === StorageType.Local ? window.localStorage : window.sessionStorage;

export const makeStorageGetter =
	<T>(options: Options<T>) =>
	(): T | undefined => {
		const stringified = getStorage(options).getItem(options.storageKey);

		return stringified === null ? undefined : options.serializer!.parse(stringified);
	};

export const makeStorageSetter =
	<T>(options: Options<T>) =>
	(value: T) => {
		getStorage(options).setItem(options.storageKey, options.serializer!.stringify(value));
	};

export const getStorageManager = <T>(options: Options<T>) => ({
	getFromStorage: makeStorageGetter(options),
	setToStorage: makeStorageSetter(options),
});
