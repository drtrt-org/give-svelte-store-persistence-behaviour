import type { RuntimeOptions, Options } from "./Options";
import { StorageType } from "./StorageType";

const defaultOptions = {
	serializer: JSON,
	storageType: StorageType.Local,
	storageEventUpdatesStore: true,
	persistLazily: false,
};

export const addDefaultsForMissingOptions = <T>(options: Options<T>): RuntimeOptions<T> => ({
	...defaultOptions,
	...options,
});
