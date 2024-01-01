import { StorageType } from "../src";

import type { OptionsWithoutStorageKey } from "./infrastructure/testHarness/src/lib/OptionsWithoutStorageKey";
import { test } from "./infrastructure/testHarnessFixture";

const initialStoreValue = "Boo";
const secondStoreValue = "Hoo";

function assertStorageValue(storageType: StorageType, value: string | undefined) {
	const otherStorageType =
		storageType === StorageType.Local ? StorageType.Session : StorageType.Local;

	test(`${storageType} Storage should be set to that value`, async ({ testHarnessPage }) => {
		await testHarnessPage.assertStorageValue(storageType, value);
	});

	test(`${otherStorageType} Storage should not be set`, async ({ testHarnessPage }) => {
		await testHarnessPage.assertStorageValue(otherStorageType, undefined);
	});
}

function assertNoStorageValue() {
	[StorageType.Local, StorageType.Session].forEach((storageType) => {
		test(`${storageType} Storage should not be set`, async ({ testHarnessPage }) => {
			await testHarnessPage.assertStorageValue(storageType, undefined);
		});
	});
}

test.describe("Store is initialised with default options", () => {
	test.describe("After initialisation with a value", () => {
		test.beforeEach(async ({ testHarnessPage }) => {
			await testHarnessPage.instantiateStore(initialStoreValue);
		});

		assertStorageValue(StorageType.Local, initialStoreValue);

		test.describe("and then setting a new value", () => {
			test.beforeEach(async ({ testHarnessPage }) => {
				await testHarnessPage.setStoreValue(secondStoreValue);
			});

			assertStorageValue(StorageType.Local, secondStoreValue);
		});
	});
});

test.describe("Store is initialised with StorageType of 'Local'", () => {
	const options: OptionsWithoutStorageKey<string> = {};

	test.beforeEach(() => {
		options.storageType = StorageType.Local;
	});

	test.describe("After initialisation with a value", () => {
		test.beforeEach(async ({ testHarnessPage }) => {
			await testHarnessPage.instantiateStore(initialStoreValue, options);
		});

		assertStorageValue(StorageType.Local, initialStoreValue);

		test.describe("and then setting a new value", () => {
			test.beforeEach(async ({ testHarnessPage }) => {
				await testHarnessPage.setStoreValue(secondStoreValue);
			});

			assertStorageValue(StorageType.Local, secondStoreValue);
		});
	});
});

test.describe("Store is initialised with StorageType of 'Session'", () => {
	const options: OptionsWithoutStorageKey<string> = {};

	test.beforeEach(() => {
		options.storageType = StorageType.Session;
	});

	test.describe("After initialisation with a value", () => {
		test.beforeEach(async ({ testHarnessPage }) => {
			await testHarnessPage.instantiateStore(initialStoreValue, options);
		});

		assertStorageValue(StorageType.Session, initialStoreValue);

		test.describe("and then setting a new value", () => {
			test.beforeEach(async ({ testHarnessPage }) => {
				await testHarnessPage.setStoreValue(secondStoreValue);
			});

			assertStorageValue(StorageType.Session, secondStoreValue);
		});
	});
});

test.describe("Store is initialised with PersistOnFirstRun value of 'true'", () => {
	const options: OptionsWithoutStorageKey<string> = {};

	test.beforeEach(() => {
		options.persistOnFirstRun = true;
	});

	test.beforeEach(async ({ testHarnessPage }) => {
		await testHarnessPage.instantiateStore(initialStoreValue, options);
	});

	test.describe("After initialisation with a value", () => {
		assertStorageValue(StorageType.Local, initialStoreValue);

		test.describe("and then setting a new value", () => {
			test.beforeEach(async ({ testHarnessPage }) => {
				await testHarnessPage.setStoreValue(secondStoreValue);
			});

			assertStorageValue(StorageType.Local, secondStoreValue);
		});
	});
});

test.describe("Store is initialised with PersistOnFirstRun value of 'false'", () => {
	const options: OptionsWithoutStorageKey<string> = {};

	test.beforeEach(() => {
		options.persistOnFirstRun = false;
	});

	test.beforeEach(async ({ testHarnessPage }) => {
		await testHarnessPage.instantiateStore(initialStoreValue, options);
	});

	test.describe("After initialisation with a value", () => {
		assertNoStorageValue();

		test.describe("and then setting a new value", () => {
			test.beforeEach(async ({ testHarnessPage }) => {
				await testHarnessPage.setStoreValue(secondStoreValue);
			});

			assertStorageValue(StorageType.Local, secondStoreValue);
		});
	});
});

test.describe("Store is initialised with StorageType of 'Session' and PersistOnFirstRun value of 'false'", () => {
	const options: OptionsWithoutStorageKey<string> = {};

	test.beforeEach(() => {
		options.storageType = StorageType.Session;
		options.persistOnFirstRun = false;
	});

	test.beforeEach(async ({ testHarnessPage }) => {
		await testHarnessPage.instantiateStore(initialStoreValue, options);
	});

	test.describe("After initialisation with a value", () => {
		assertNoStorageValue();

		test.describe("and then setting a new value", () => {
			test.beforeEach(async ({ testHarnessPage }) => {
				await testHarnessPage.setStoreValue(secondStoreValue);
			});

			assertStorageValue(StorageType.Session, secondStoreValue);
		});
	});
});
