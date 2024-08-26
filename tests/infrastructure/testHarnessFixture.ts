import { test as base, expect } from "@playwright/test";

import { TestHarnessPage } from "./pageObjects/testHarnessPage";

type Fixtures = {
	testHarnessPage: TestHarnessPage;
	testHarnessPage2: TestHarnessPage;
};

export const test = base.extend<Fixtures>({
	context: async ({ browser }, use) => {
		const context = await browser.newContext();
		await use(context);
		await context.close();
	},
	testHarnessPage: async ({ context }, use) => {
		const page = await context.newPage();
		const testHarnessPage = new TestHarnessPage(page, expect);
		await testHarnessPage.goto();

		await use(testHarnessPage);

		await testHarnessPage.reset();
	},

	testHarnessPage2: async ({ context }, use) => {
		const page = await context.newPage();
		const testHarnessPage = new TestHarnessPage(page, expect);
		await testHarnessPage.goto();

		await use(testHarnessPage);

		await testHarnessPage.reset();
	},
});

export { expect } from "@playwright/test";
