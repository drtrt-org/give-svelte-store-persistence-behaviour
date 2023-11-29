import { test as base, expect } from "@playwright/test";

import { TestHarnessPage } from "./test-harness-page";

type Fixtures = {
	testHarnessPage: TestHarnessPage;
};

export const test = base.extend<Fixtures>({
	testHarnessPage: async ({ page }, use) => {
		const testHarnessPage = new TestHarnessPage(page, expect);
		await testHarnessPage.goto();

		await use(testHarnessPage);

		await testHarnessPage.reset();
	},
});

export { expect } from "@playwright/test";
