import type { Options, RuntimeOptions } from "./Options";
import { StorageType } from "./StorageType";

const defaultOptions = {
	serializer: JSON,
	storageType: StorageType.Local,
	storageEventUpdatesStore: true,
};

export const getRuntimeOptions = <T>(options: Options<T>): RuntimeOptions<T> => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { persistOnFirstRun, ...runtimeOptions } = { ...defaultOptions, ...options };

	return runtimeOptions;
};
