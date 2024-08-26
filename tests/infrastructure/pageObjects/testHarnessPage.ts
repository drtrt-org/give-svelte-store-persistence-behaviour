import type { Page, Locator, Expect } from "@playwright/test";

import { WebStorageType } from "../../../src";
import { storageKey as defaultStorageKey } from "../testHarness/src/lib/constants";
import type { OptionsWithoutStorageKey } from "../testHarness/src/lib/OptionsWithoutStorageKey";

import { RuntimeOptions } from "./runtimeOptions";

export class TestHarnessPage {
	readonly storeBoundInput: Locator;
	readonly storeBoundSpan: Locator;
	readonly optionsTextArea: Locator;
	readonly instantiateStoreButton: Locator;
	readonly valueToInitialiseStoreWithInput: Locator;

	public runtimeOptions: RuntimeOptions;

	constructor(
		readonly page: Page,
		readonly expect: Expect<unknown>,
	) {
		this.storeBoundInput = this.page.getByTestId("storeBoundInput");
		this.storeBoundSpan = this.page.getByTestId("storeBoundSpan");

		this.valueToInitialiseStoreWithInput = this.page.getByTestId(
			"valueToInitialiseStoreWithInput",
		);

		this.optionsTextArea = this.page.getByPlaceholder(
			"`giveSvelteStorePersistenceBehaviour` Options",
		);

		this.instantiateStoreButton = this.page.getByText("Instantiate Store", { exact: true });

		this.runtimeOptions = new RuntimeOptions(page);
	}

	async goto() {
		await this.page.goto("http://localhost:4173/");
	}

	async reset() {
		await this.page.getByText("Reset").click();
	}

	async #setInitialStoreValue(initialStoreValue: string) {
		await this.valueToInitialiseStoreWithInput.fill(initialStoreValue);
	}

	async #setOptions<T>(options: OptionsWithoutStorageKey<T>) {
		const optionsJSON = JSON.stringify(options, null, 2);

		await this.optionsTextArea.fill(optionsJSON);
	}

	async #clickInstantiateStore() {
		await this.instantiateStoreButton.click();
	}

	async instantiateStore(initialValue?: string, options?: OptionsWithoutStorageKey<string>) {
		if (options !== undefined) {
			await this.#setOptions(options);
		}

		if (initialValue !== undefined) {
			await this.#setInitialStoreValue(initialValue);
		}

		await this.#clickInstantiateStore();
	}

	async setStoreValue(storeValue: string) {
		await this.storeBoundInput.fill(storeValue);
	}

	async assertStoreBoundSpanText(expected: string) {
		const storeValue = await this.storeBoundSpan.textContent();

		this.expect(storeValue).toBe(expected);
	}

	async #getLocalStorageValueJSON(storageKey: string) {
		return await this.page.evaluate<string | null, string>(
			(x) => localStorage.getItem(x),
			storageKey,
		);
	}

	async #getSessionStorageValueJSON(storageKey: string) {
		return await this.page.evaluate<string | null, string>(
			(x) => sessionStorage.getItem(x),
			storageKey,
		);
	}

	async assertStorageValue<T>(
		webStorageType: WebStorageType,
		expected: T,
		storageKey: string = defaultStorageKey,
	): Promise<void> {
		const storageValueJSON =
			webStorageType === WebStorageType.Local
				? await this.#getLocalStorageValueJSON(storageKey)
				: await this.#getSessionStorageValueJSON(storageKey);

		const storageValue =
			storageValueJSON === null ? undefined : (JSON.parse(storageValueJSON) as T);

		this.expect(storageValue).toBe(expected);
	}
}
