import type { Page, Locator, Expect } from "@playwright/test";
import type { Options } from "../src/Options";

export class TestHarnessPage {
	public readonly storeBoundInput: Locator;
	public readonly storeBoundParagraph: Locator;

	constructor(
		public readonly page: Page,
		public readonly expect: Expect<{}>,
	) {
		this.storeBoundInput = this.page.getByTestId("input");
		this.storeBoundParagraph = this.page.getByTestId("paragraph");
	}

	async goto() {
		await this.page.goto("http://localhost:4173/");
	}

	async reset() {
		await this.page.getByText("Reset").click();
	}

	async setOptions<T>(options: Options<T>) {
		const optionsJSON = JSON.stringify(options, null, 2);

		await this.page
			.getByPlaceholder("`giveSvelteStorePersistenceBehaviour` Options")
			.fill(optionsJSON);
	}

	async instantiateStore() {
		await this.page.getByText("Instantiate Store").click();
	}

	async assertLocalStorageValue<T>(expected: T): Promise<void> {
		const localStorageValueJSON = await this.page.evaluate<string | null>(() =>
			localStorage.getItem("storeValue"),
		);

		const localStorageValue = JSON.parse(localStorageValueJSON as string) as string;

		this.expect(localStorageValue).toBe(expected);
	}

	async getValuePersistedToSessionStorage(): Promise<string> {
		const sessionStorageValueJSON = await this.page.evaluate<string | null>(() =>
			sessionStorage.getItem("storeValue"),
		);

		return JSON.parse(sessionStorageValueJSON as string) as string;
	}
}
