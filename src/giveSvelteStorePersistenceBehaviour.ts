import { get, type Updater, type Writable } from "svelte/store";

import type { Options } from "./Options";
import { StorageType } from "./StorageType";

const browser = typeof window !== "undefined" && typeof document !== "undefined";

type AllRequired<T> = {
	[P in keyof T]-?: T[P];
};

type SetStorageKey<T> = (storageKey: string, defaultValue?: T) => void;

const defaultOptions = {
	persistOnFirstRun: true,
	serializer: JSON,
	storageType: StorageType.Local,
	receiveUpdatesFromOtherTabs: true,
	otherTabStateChangedDelegate: null,
};

function getValueFunction<T>(candidate: T | (() => T)): () => T {
	if (typeof candidate === "function") {
		return candidate as () => T;
	}

	return () => candidate;
}

export function giveSvelteStorePersistenceBehaviour<T>(
	store: Writable<T>,
	storageKey: string,
	options: Options<T> = {},
): Writable<T> & { setStorageKey: SetStorageKey<T> } {
	if (!browser) {
		return { ...store, setStorageKey: () => {} };
	}

	function getFromStorage(): T | undefined {
		const stringified = storage.getItem(internalStorageKey);
		return stringified === null ? undefined : (serializer.parse(stringified) as T);
	}

	function setToStorage(value: T) {
		storage.setItem(internalStorageKey, serializer.stringify(value));
	}

	function initialiseState() {
		const itemFromStorage = getFromStorage();
		if (itemFromStorage !== undefined) {
			set(itemFromStorage);
			return;
		}

		if (persistOnFirstRun) {
			const defaultState = get(store);
			if (defaultState !== undefined) {
				setToStorage(defaultState);
			}
		}
	}

	function handleStorage(event: StorageEvent) {
		if (event.key === internalStorageKey) {
			otherTabStateChangedDelegate &&
				otherTabStateChangedDelegate({
					storageKey: internalStorageKey,
					storageType,
					oldValue: event.oldValue === null ? null : serializer.parse(event.oldValue),
					newValue: event.newValue === null ? null : serializer.parse(event.newValue),
				});

			if (updateOtherTabs() === true && event.newValue != null) {
				set(serializer.parse(event.newValue));
			}
		}
	}

	let internalStorageKey: string = storageKey;

	options = { ...defaultOptions, ...options };

	const { update, set, ...rest } = store;

	const {
		persistOnFirstRun,
		serializer,
		receiveUpdatesFromOtherTabs,
		storageType,
		otherTabStateChangedDelegate,
	} = options as AllRequired<Options<T>>;

	const updateOtherTabs = getValueFunction(receiveUpdatesFromOtherTabs);

	const storage = storageType === StorageType.Local ? window.localStorage : window.sessionStorage;

	initialiseState();

	const setStorageKey = (storageKey: string, defaultValue?: T) => {
		internalStorageKey = storageKey;
		const fromStorage = getFromStorage();

		if (fromStorage !== undefined) {
			store.set(fromStorage);
		} else {
			if (defaultValue !== undefined) {
				store.set(defaultValue);
				setToStorage(defaultValue);
			}
		}
	};

	if (storageType === StorageType.Local) {
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
		setStorageKey,
	};
}
