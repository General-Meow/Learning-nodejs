import { removeDuplicates } from '../../src/chapter2/q1'
import { describe, it } from 'mocha'
import { expect } from 'chai';

describe("removeDuplicates", () => {

    it("should remove duplicates and return new array", () => {
        let param = new Array<String>();
        param.push("a");
        param.push("b");
        param.push("b");
        param.push("b");
        param.push("b");
        param.push("c");
        param.push("c");
        param.push("c");
        let result = removeDuplicates(param);

        let expected = new Array<String>();
        expected.push("a");
        expected.push("b");
        expected.push("c");
        expect(result).to.deep.equal(expected);

    })

})