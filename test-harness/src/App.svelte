<script lang="ts">
	import { writable, type Writable } from "svelte/store";

	import { giveSvelteStorePersistenceBehaviour } from "../../dist/.";

	import { storageKey } from "./lib/constants";
	import type { OptionsWithoutStorageKey } from "./lib/OptionsWithoutStorageKey";

	let valueToInitialiseStoreWith: string;
	let optionsText: string | undefined;
	let store: Writable<string> | undefined;

	function instantiateStore() {
		const options = JSON.parse(optionsText ?? "{}") as OptionsWithoutStorageKey<string>;

		store = giveSvelteStorePersistenceBehaviour(writable(valueToInitialiseStoreWith), {
			storageKey,
			...options,
		});
	}

	function reset() {
		optionsText = undefined;
		store = undefined;
		localStorage.clear();
		sessionStorage.clear();
	}
</script>

<main>
	<input data-testid="valueToInitialiseStoreWith" bind:value={valueToInitialiseStoreWith} />

	<textarea
		bind:value={optionsText}
		placeholder="`giveSvelteStorePersistenceBehaviour` Options"
	/>
	<button on:click={instantiateStore}>Instantiate Store</button>

	<input data-testid="storeBoundInput" bind:value={$store} />

	<button on:click={reset}>Reset</button>
	<p data-testid="storeBoundParagraph">{$store}</p>
</main>
