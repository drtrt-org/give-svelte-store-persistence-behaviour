import type { Page, Locator, Expect } from "@playwright/test";

import { StorageType } from "../dist";
import { storageKey } from "../test-harness/src/lib/constants";
import type { OptionsWithoutStorageKey } from "../test-harness/src/lib/OptionsWithoutStorageKey";

export class TestHarnessPage {
	public readonly storeBoundInput: Locator;
	public readonly storeBoundParagraph: Locator;

	constructor(
		public readonly page: Page,
		public readonly expect: Expect<unknown>,
	) {
		this.storeBoundInput = this.page.getByTestId("storeBoundInput");
		this.storeBoundParagraph = this.page.getByTestId("storeBoundParagraph");
	}

	async goto() {
		await this.page.goto("http://localhost:4173/");
	}

	async reset() {
		await this.page.getByText("Reset").click();
	}

	async #setInitialStoreValue(initialStoreValue: string) {
		await this.page.getByTestId("valueToInitialiseStoreWith").fill(initialStoreValue);
	}

	async #setOptions<T>(options: OptionsWithoutStorageKey<T>) {
		const optionsJSON = JSON.stringify(options, null, 2);

		await this.page
			.getByPlaceholder("`giveSvelteStorePersistenceBehaviour` Options")
			.fill(optionsJSON);
	}

	async #clickInstantiateStore() {
		await this.page.getByText("Instantiate Store").click();
	}

	async instantiateStore(initialValue: string, options?: OptionsWithoutStorageKey<string>) {
		options && (await this.#setOptions(options));
		await this.#setInitialStoreValue(initialValue);
		await this.#clickInstantiateStore();
	}

	async setStoreValue(storeValue: string) {
		await this.page.getByTestId("storeBoundInput").fill(storeValue);
	}

	async #getLocalStorageValueJSON() {
		return await this.page.evaluate<string | null, string>(
			(x) => localStorage.getItem(x),
			storageKey,
		);
	}

	async #getSessionStorageValueJSON() {
		return await this.page.evaluate<string | null, string>(
			(x) => sessionStorage.getItem(x),
			storageKey,
		);
	}

	async assertStorageValue<T>(storageType: StorageType, expected: T): Promise<void> {
		const storageValueJSON =
			storageType === StorageType.Local
				? await this.#getLocalStorageValueJSON()
				: await this.#getSessionStorageValueJSON();

		const storageValue =
			storageValueJSON === null ? undefined : (JSON.parse(storageValueJSON) as T);

		this.expect(storageValue).toBe(expected);
	}
}
