import type { Options } from "./Options";
import type { RuntimeOptions } from "./RuntimeOptions";
import { WebStorageType } from "./WebStorageType";

const defaultOptions = {
	serializer: JSON,
	webStorageType: WebStorageType.Local,
	webStorageEventUpdatesStore: true,
	initializeWebStorage: true,
};

export const addDefaultsForMissingOptions = <T>(options: Options<T>): RuntimeOptions<T> => ({
	...defaultOptions,
	...options,
});
