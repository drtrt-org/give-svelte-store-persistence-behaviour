<script lang="ts">
	import { writable } from "svelte/store";

	import { giveSvelteStorePersistenceBehaviour } from "../../dist/.";

	const store = giveSvelteStorePersistenceBehaviour(writable("boo"), "storeValue");
</script>

<main>
	<div>
		{$store}
	</div>
</main>
