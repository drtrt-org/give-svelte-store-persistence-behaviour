import { StorageType } from "../src";

import { test } from "./test-harness-fixture";

const initialStoreValue = "Boo";
const secondStoreValue = "Hoo";

test.only("stuff", async ({ testHarnessPage, testHarnessPage2 }) => {
	await testHarnessPage.instantiateStore(initialStoreValue, { storageEventUpdatesStore: true });
	await testHarnessPage2.instantiateStore(undefined, { storageEventUpdatesStore: true });

	await testHarnessPage.assertStorageValue(StorageType.Local, initialStoreValue);
	await testHarnessPage2.assertStorageValue(StorageType.Local, initialStoreValue);
	await testHarnessPage2.assertStoreValue(initialStoreValue);

	await testHarnessPage.setStoreValue(secondStoreValue);
	await testHarnessPage2.assertStoreValue(secondStoreValue);
});
