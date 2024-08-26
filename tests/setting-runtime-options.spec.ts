import { WebStorageType } from "../src";

import { storageKey as initialStorageKey } from "./infrastructure/testHarness/src/lib/constants";
import { test } from "./infrastructure/testHarnessFixture";

const initialStoreValue = "Boo";
const secondStoreValue = "Hoo";
const secondStorageKey = "secondStorageKey";

test.describe("Changing StorageKey at runtime", () => {
	test.describe("Store is initialised with default options and an initial value", () => {
		test.beforeEach(async ({ testHarnessPage }) => {
			await testHarnessPage.instantiateStore(initialStoreValue);
		});

		test("Value should be written to Local Storage", async ({ testHarnessPage }) => {
			await testHarnessPage.assertStorageValue(WebStorageType.Local, initialStoreValue);
		});

		test("The value should be reflected in a bound span", async ({ testHarnessPage }) => {
			await testHarnessPage.assertStoreBoundSpanText(initialStoreValue);
		});

		test.describe("RuntimeOptions StorageKey is changed", () => {
			test.beforeEach(async ({ testHarnessPage }) => {
				await testHarnessPage.runtimeOptions.setStorageKey(secondStorageKey);
			});

			test("The same value should be written to Local Storage using the new StorageKey", async ({
				testHarnessPage,
			}) => {
				await testHarnessPage.assertStorageValue(
					WebStorageType.Local,
					initialStoreValue,
					secondStorageKey,
				);
			});
		});
	});

	test.describe("Store is initialised with default options and an initial value", () => {
		test.beforeEach(async ({ testHarnessPage }) => {
			await testHarnessPage.instantiateStore(initialStoreValue);
		});

		test.describe("Store value is changed to a second value", () => {
			test.beforeEach(async ({ testHarnessPage }) => {
				await testHarnessPage.setStoreValue(secondStoreValue);
			});

			test("The change to the second value should be reflected in a bound span", async ({
				testHarnessPage,
			}) => {
				await testHarnessPage.assertStoreBoundSpanText(secondStoreValue);
			});

			test.describe("RuntimeOptions StorageKey is changed", () => {
				test.beforeEach(async ({ testHarnessPage }) => {
					await testHarnessPage.runtimeOptions.setStorageKey(secondStorageKey);
				});

				test("The initial value should be written to Local Storage using the new StorageKey", async ({
					testHarnessPage,
				}) => {
					await testHarnessPage.assertStorageValue(
						WebStorageType.Local,
						initialStoreValue,
						secondStorageKey,
					);
				});

				test("The change back to the initial value should be reflected in a bound span", async ({
					testHarnessPage,
				}) => {
					await testHarnessPage.assertStoreBoundSpanText(initialStoreValue);
				});
			});
		});
	});

	test.describe("Store is initialised with default options and an initial value", () => {
		test.beforeEach(async ({ testHarnessPage }) => {
			await testHarnessPage.instantiateStore(initialStoreValue);
		});

		test.describe("RuntimeOptions StorageKey is changed", () => {
			test.beforeEach(async ({ testHarnessPage }) => {
				await testHarnessPage.runtimeOptions.setStorageKey(secondStorageKey);
			});

			test.describe("Store value is changed to a second value", () => {
				test.beforeEach(async ({ testHarnessPage }) => {
					await testHarnessPage.setStoreValue(secondStoreValue);
				});

				test("The change to the second value should be reflected in a bound span", async ({
					testHarnessPage,
				}) => {
					await testHarnessPage.assertStoreBoundSpanText(secondStoreValue);
				});

				test.describe("RuntimeOptions StorageKey is changed back to the original key", () => {
					test.beforeEach(async ({ testHarnessPage }) => {
						await testHarnessPage.runtimeOptions.setStorageKey(initialStorageKey);
					});

					test("The bound span should change back to the first value", async ({
						testHarnessPage,
					}) => {
						await testHarnessPage.assertStoreBoundSpanText(initialStoreValue);
					});

					test.describe("RuntimeOptions StorageKey is changed back to the second key again", () => {
						test.beforeEach(async ({ testHarnessPage }) => {
							await testHarnessPage.runtimeOptions.setStorageKey(secondStorageKey);
						});

						test("The bound span should change to to the second value again", async ({
							testHarnessPage,
						}) => {
							await testHarnessPage.assertStoreBoundSpanText(secondStoreValue);
						});
					});
				});
			});
		});
	});
});
