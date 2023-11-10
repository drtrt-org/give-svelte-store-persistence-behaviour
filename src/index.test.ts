import { describe, it, expect } from "vitest";

import { myString } from ".";

describe("group", () => {
    it("should", () => {
        expect(myString).toBe("hello world");
    });
});
