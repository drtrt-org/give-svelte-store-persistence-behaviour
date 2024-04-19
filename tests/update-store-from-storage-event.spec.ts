import type { OptionsWithoutStorageKey } from "./infrastructure/testHarness/src/lib/OptionsWithoutStorageKey";
import { test } from "./infrastructure/testHarnessFixture";

const initialStoreValue = "Boo";
const secondStoreValue = "Hoo";

test.describe("Updating Store from Storage Events", () => {
	test.describe("Store is initialised with default options and an initial value", () => {
		test.beforeEach(async ({ testHarnessPage }) => {
			await testHarnessPage.instantiateStore(initialStoreValue);
		});

		test.describe("On a new page, another Store is initialised with `webStorageEventUpdatesStore` set to false", () => {
			test.beforeEach(async ({ testHarnessPage2 }) => {
				await testHarnessPage2.instantiateStore(undefined, {
					webStorageEventUpdatesStore: false,
				});
			});

			test("The Store on the new page should have the same value as that on the first page", async ({
				testHarnessPage2,
			}) => {
				await testHarnessPage2.assertStoreBoundSpanText(initialStoreValue);
			});

			test.describe("On the first page, the Store's value is changed", () => {
				test.beforeEach(async ({ testHarnessPage }) => {
					await testHarnessPage.setStoreValue(secondStoreValue);
				});

				test("The value of the Store on the second page should not change", async ({
					testHarnessPage2,
				}) => {
					await testHarnessPage2.assertStoreBoundSpanText(initialStoreValue);
				});
			});
		});
	});

	const scenarios: [string, OptionsWithoutStorageKey<string> | undefined][] = [
		["default options", undefined],
		["`webStorageEventUpdatesStore` set to true", { webStorageEventUpdatesStore: true }],
	];

	scenarios.forEach(([scenarioName, options]) => {
		test.describe("Store is initialised with default options and an initial value", () => {
			test.beforeEach(async ({ testHarnessPage }) => {
				await testHarnessPage.instantiateStore(initialStoreValue);
			});

			test.describe(`On a new page, another Store is initialised with ${scenarioName}`, () => {
				test.beforeEach(async ({ testHarnessPage2 }) => {
					await testHarnessPage2.instantiateStore(undefined, options);
				});

				test("The Store on the new page should have the same value as that on the first page", async ({
					testHarnessPage2,
				}) => {
					await testHarnessPage2.assertStoreBoundSpanText(initialStoreValue);
				});

				test.describe("On the first page, the Store's value is changed", () => {
					test.beforeEach(async ({ testHarnessPage }) => {
						await testHarnessPage.setStoreValue(secondStoreValue);
					});

					test("The value of the Store on the second page should change to the new value, too", async ({
						testHarnessPage2,
					}) => {
						await testHarnessPage2.assertStoreBoundSpanText(secondStoreValue);
					});

					test.describe("On the second page, the Store's value is changed back to the original value", () => {
						test.beforeEach(async ({ testHarnessPage2 }) => {
							await testHarnessPage2.setStoreValue(initialStoreValue);
						});

						test("The value of the Store on the first page should change back to original value, too", async ({
							testHarnessPage,
						}) => {
							await testHarnessPage.assertStoreBoundSpanText(initialStoreValue);
						});
					});
				});
			});
		});
	});
});
