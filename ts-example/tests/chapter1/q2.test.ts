import { isPermutation } from '../../src/chapter1/q2'
import { it } from 'mocha'
import { expect } from 'chai';

describe("isPermutation function", () => {

    it("should exit early and return false when strings are of different lengths", () => {
        let result = isPermutation("abc", "abcd1");
        expect(result).to.be.false;
    });

    it("should return true is both strings are permutations are of each other", () =>{
        let result = isPermutation("abc", "cba");
        expect(result).to.be.true
    });


    it("should return false is both strings are not permutations are of each other", () =>{
        let result = isPermutation("abc", "cbaa");
        expect(result).to.be.false
    });
})