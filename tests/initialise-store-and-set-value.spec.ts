import { WebStorageType } from "../src";

import type { OptionsWithoutStorageKey } from "./infrastructure/testHarness/src/lib/OptionsWithoutStorageKey";
import { test } from "./infrastructure/testHarnessFixture";

const initialStoreValue = "Boo";
const secondStoreValue = "Hoo";

function assertStorageValue(webStorageType: WebStorageType, value: string | undefined) {
	const otherWebStorageType =
		webStorageType === WebStorageType.Local ? WebStorageType.Session : WebStorageType.Local;

	test(`${webStorageType} Storage should be set to that value`, async ({ testHarnessPage }) => {
		await testHarnessPage.assertStorageValue(webStorageType, value);
	});

	test(`${otherWebStorageType} Storage should not be set`, async ({ testHarnessPage }) => {
		await testHarnessPage.assertStorageValue(otherWebStorageType, undefined);
	});
}

function assertNoStorageValue() {
	[WebStorageType.Local, WebStorageType.Session].forEach((webStorageType) => {
		test(`${webStorageType} Storage should not be set`, async ({ testHarnessPage }) => {
			await testHarnessPage.assertStorageValue(webStorageType, undefined);
		});
	});
}

test.describe("Store is initialised with default options", () => {
	test.describe("After initialisation with a value", () => {
		test.beforeEach(async ({ testHarnessPage }) => {
			await testHarnessPage.instantiateStore(initialStoreValue);
		});

		assertStorageValue(WebStorageType.Local, initialStoreValue);

		test.describe("and then setting a new value", () => {
			test.beforeEach(async ({ testHarnessPage }) => {
				await testHarnessPage.setStoreValue(secondStoreValue);
			});

			assertStorageValue(WebStorageType.Local, secondStoreValue);
		});
	});
});

test.describe("Store is initialised with WebStorageType of 'Local'", () => {
	const options: OptionsWithoutStorageKey<string> = {};

	test.beforeEach(() => {
		options.webStorageType = WebStorageType.Local;
	});

	test.describe("After initialisation with a value", () => {
		test.beforeEach(async ({ testHarnessPage }) => {
			await testHarnessPage.instantiateStore(initialStoreValue, options);
		});

		assertStorageValue(WebStorageType.Local, initialStoreValue);

		test.describe("and then setting a new value", () => {
			test.beforeEach(async ({ testHarnessPage }) => {
				await testHarnessPage.setStoreValue(secondStoreValue);
			});

			assertStorageValue(WebStorageType.Local, secondStoreValue);
		});
	});
});

test.describe("Store is initialised with WebStorageType of 'Session'", () => {
	const options: OptionsWithoutStorageKey<string> = {};

	test.beforeEach(() => {
		options.webStorageType = WebStorageType.Session;
	});

	test.describe("After initialisation with a value", () => {
		test.beforeEach(async ({ testHarnessPage }) => {
			await testHarnessPage.instantiateStore(initialStoreValue, options);
		});

		assertStorageValue(WebStorageType.Session, initialStoreValue);

		test.describe("and then setting a new value", () => {
			test.beforeEach(async ({ testHarnessPage }) => {
				await testHarnessPage.setStoreValue(secondStoreValue);
			});

			assertStorageValue(WebStorageType.Session, secondStoreValue);
		});
	});
});

test.describe("Store is initialised with InitializeWebStorage value of 'true'", () => {
	const options: OptionsWithoutStorageKey<string> = {};

	test.beforeEach(() => {
		options.initializeWebStorage = true;
	});

	test.beforeEach(async ({ testHarnessPage }) => {
		await testHarnessPage.instantiateStore(initialStoreValue, options);
	});

	test.describe("After initialisation with a value", () => {
		assertStorageValue(WebStorageType.Local, initialStoreValue);

		test.describe("and then setting a new value", () => {
			test.beforeEach(async ({ testHarnessPage }) => {
				await testHarnessPage.setStoreValue(secondStoreValue);
			});

			assertStorageValue(WebStorageType.Local, secondStoreValue);
		});
	});
});

test.describe("Store is initialised with InitializeWebStorage value of 'false'", () => {
	const options: OptionsWithoutStorageKey<string> = {};

	test.beforeEach(() => {
		options.initializeWebStorage = false;
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

			assertStorageValue(WebStorageType.Local, secondStoreValue);
		});
	});
});

test.describe("Store is initialised with WebStorageType of 'Session' and InitializeWebStorage value of 'false'", () => {
	const options: OptionsWithoutStorageKey<string> = {};

	test.beforeEach(() => {
		options.webStorageType = WebStorageType.Session;
		options.initializeWebStorage = false;
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

			assertStorageValue(WebStorageType.Session, secondStoreValue);
		});
	});
});
