import type { Locator, Page } from "@playwright/test";

export class RuntimeOptions {
	readonly #storageKeyInput: Locator;

	constructor(page: Page) {
		this.#storageKeyInput = page.getByTestId("storageKey");
	}

	async setStorageKey(storageKey: string) {
		await this.#storageKeyInput.fill(storageKey);
	}
}
