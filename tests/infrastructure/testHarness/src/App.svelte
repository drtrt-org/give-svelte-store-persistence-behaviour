<script lang="ts">
	import { writable } from "svelte/store";

	import {
		giveSvelteStorePersistenceBehaviour,
		WebStorageType,
		type PersistentWritable,
	} from "../../../../dist/.";

	import { storageKey } from "./lib/constants";
	import type { OptionsWithoutStorageKey } from "./lib/OptionsWithoutStorageKey";

	let valueToInitialiseStoreWith: string;
	let valueToInitialiseStoreWithInput: HTMLInputElement;

	// We need to do the following because Svelte will not update a bound
	// variable if:
	// a) it's initial value is undefined, and
	// b) the bound input is set to an empty string.
	$: if (
		valueToInitialiseStoreWithInput &&
		valueToInitialiseStoreWithInput.value === "" &&
		valueToInitialiseStoreWith !== ""
	) {
		valueToInitialiseStoreWith = "";
	}

	let optionsText: string | undefined;
	let store: PersistentWritable<string> | undefined;

	function instantiateStore() {
		const options = JSON.parse(optionsText ?? "{}") as OptionsWithoutStorageKey<string>;

		store = giveSvelteStorePersistenceBehaviour(writable(valueToInitialiseStoreWith), {
			storageKey,
			...options,
		});

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { serializer, ...settableRuntimeOptions } = store.runtimeOptions;
	}

	function reset() {
		optionsText = undefined;
		store = undefined;
		localStorage.clear();
		sessionStorage.clear();
	}
</script>

<main>
	<fieldset>
		<legend>Instantiation</legend>
		<label
			>Value to instantiate store with:
			<input
				data-testid="valueToInitialiseStoreWithInput"
				bind:this={valueToInitialiseStoreWithInput}
				bind:value={valueToInitialiseStoreWith}
			/>
		</label>
		<label
			>Options to instantiate store with:
			<textarea
				bind:value={optionsText}
				placeholder="`giveSvelteStorePersistenceBehaviour` Options"
			/>
		</label>

		<button on:click={instantiateStore}>Instantiate Store</button>
	</fieldset>

	<fieldset>
		<legend>Runtime</legend>

		{#if store}
			Storage Key:
			<input data-testid="storageKey" bind:value={store.runtimeOptions.storageKey} />

			Storage Type:
			{#each Object.values(WebStorageType) as webStorageType}
				<label>
					<input
						type="radio"
						bind:group={store.runtimeOptions.webStorageType}
						value={webStorageType}
					/>
					{webStorageType}
				</label>
			{/each}

			StorageEvent updates store:

			<input
				type="checkbox"
				bind:checked={store.runtimeOptions.webStorageEventUpdatesStore}
			/>
		{/if}
	</fieldset>

	<fieldset>
		<legend>Bound controls</legend>

		<label
			>Store-bound input:
			<input data-testid="storeBoundInput" bind:value={$store} />
		</label>

		Store-bound text: <span data-testid="storeBoundSpan">{$store}</span>
	</fieldset>

	<button on:click={reset}>Reset</button>
</main>
