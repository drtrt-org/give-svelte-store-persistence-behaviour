import { get, type Updater, type Writable } from "svelte/store";

import type { Options } from "./Options";
import { setDefaultsForMissingOptions } from "./setDefaultsForMissingOptions";
import { getStorageManager } from "./storageManagement";
import { StorageType } from "./StorageType";

const browser = typeof window !== "undefined" && typeof document !== "undefined";

export const giveSvelteStorePersistenceBehaviour = <T>(
	store: Writable<T>,
	options: Options<T>,
): Writable<T> & { options?: Options<T> } => {
	if (!browser) {
		return store;
	}

	setDefaultsForMissingOptions(options);

	const { getFromStorage, setToStorage } = getStorageManager(options);

	const initialiseState = () => {
		const itemFromStorage = getFromStorage();
		if (itemFromStorage !== undefined) {
			set(itemFromStorage);
			return;
		}

		if (options.persistOnFirstRun) {
			const defaultState = get(store);
			if (defaultState !== undefined) {
				setToStorage(defaultState);
			}
		}
	};

	const handleStorage = (event: StorageEvent) => {
		if (event.key === options.storageKey) {
			if (options.storageEventDelegate) {
				options.storageEventDelegate({
					storageKey: options.storageKey,
					storageType: options.storageType!,
					oldValue:
						event.oldValue === null ? null : options.serializer!.parse(event.oldValue),
					newValue:
						event.newValue === null ? null : options.serializer!.parse(event.newValue),
				});
			}

			if (options.receiveUpdatesFromOtherTabs === true && event.newValue != null) {
				set(options.serializer!.parse(event.newValue));
			}
		}
	};

	const { update, set, ...rest } = store;

	initialiseState();

	if (options.storageType === StorageType.Local) {
		window.addEventListener("storage", handleStorage);
	}

	return {
		...rest,
		set(value: T) {
			setToStorage(value);
			set(value);
		},
		update(updater: Updater<T>) {
			return update((last) => {
				const value = updater(last);

				setToStorage(value);

				return value;
			});
		},
		options,
	};
};
