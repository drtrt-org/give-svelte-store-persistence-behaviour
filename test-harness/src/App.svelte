<script lang="ts">
	import { writable, type Writable } from "svelte/store";

	import { giveSvelteStorePersistenceBehaviour, type Options } from "../../dist/.";

	const storageKey = "storeValue";

	let valueToInitialisedStoreWith: string;
	let optionsText: string | undefined;
	let store: Writable<string> | undefined;

	function instantiateStore() {
		const options = JSON.parse(optionsText ?? "{}") as Options<string>;

		store = giveSvelteStorePersistenceBehaviour(
			writable(valueToInitialisedStoreWith),
			storageKey,
			options,
		);
	}

	function reset() {
		optionsText = undefined;
		store = undefined;
		localStorage.clear();
		sessionStorage.clear();
	}
</script>

<main>
	<input data-testid="initInput" bind:value={valueToInitialisedStoreWith} />

	<textarea
		bind:value={optionsText}
		placeholder="`giveSvelteStorePersistenceBehaviour` Options"
	/>
	<button on:click={instantiateStore}>Instantiate Store</button>

	<input data-testid="input" bind:value={$store} />

	<button on:click={reset}>Reset</button>
	<p data-testid="paragraph">{$store}</p>
</main>
