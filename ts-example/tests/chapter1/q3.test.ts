import { urlify } from '../../src/chapter1/q3'
import { it } from 'mocha'
import { expect } from 'chai';

describe('urlify', () => {
    it("should return string with spaces replaced with space encoded", () => {
        let arg    = "Mr John Smith    ";
        let expected = "Mr%20John%20Smith"

        let result = urlify(arg);

         expect(result).to.equal(expected);
    });
})
