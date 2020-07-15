import { isUnique } from '../../src/chapter1/q1'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe("isUnique function", () => {

    it("should return true when all letters in string are unique", () => {
        let result = isUnique("abcdefg");
        expect(result).to.equal(true);
    });

    it("should return false when letters in string are not unique", () => {
        let result = isUnique("abcdea");
        expect(result).to.equal(false);
    })
});