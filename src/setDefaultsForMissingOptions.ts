import type { Options } from "./Options";
import { StorageType } from "./StorageType";

const defaultOptions = {
	persistOnFirstRun: true,
	serializer: JSON,
	storageType: StorageType.Local,
	receiveUpdatesFromOtherTabs: true,
};
export const setDefaultsForMissingOptions = <T>(options: Options<T>) => {
	Object.keys(defaultOptions).forEach((key) => {
		const typedKey = key as keyof typeof defaultOptions;

		if (!(typedKey in options)) {
			// @ts-expect-error The typescript acrobatics necessary to do this the 'right'
			// way just aren't worth it.
			// ... or I don't know TS well enough, yet. 😊
			options[typedKey] = defaultOptions[typedKey];
		}
	});
};
