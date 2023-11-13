import { test, expect } from "./test-harness-fixture";

test("has title", async ({ testHarnessPage }) => {
	await testHarnessPage.setOptions<string>({ persistOnFirstRun: true });

	await testHarnessPage.instantiateStore();

	await expect(testHarnessPage.storeBoundInput).toHaveValue("Boo");
	await expect(testHarnessPage.storeBoundParagraph).toHaveText("Boo");

	await testHarnessPage.assertLocalStorageValue("Boo");
});
