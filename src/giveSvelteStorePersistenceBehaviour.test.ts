import { describe, it, expect } from "vitest";

import { giveSvelteStorePersistenceBehaviour } from ".";

describe("giveSvelteStorePersistenceBehaviour", () => {
	it("should be a function", () => {
		expect(giveSvelteStorePersistenceBehaviour).toBeTypeOf("function");
	});
});
