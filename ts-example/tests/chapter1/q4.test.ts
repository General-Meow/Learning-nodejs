import { isPalindrome } from '../../src/chapter1/q4'
import { describe, it } from 'mocha'
import { expect } from 'chai';

describe('isPalindrome', () => {
    
    it('should return true when provided word is a palindrome', () => {
        let result = isPalindrome('abcdcba');
        expect(result).to.be.true;
    });

    it('should return false when provided word is not a palindrome', () => {
        let result = isPalindrome('asdwefgd');
        expect(result).to.be.false;
    })

})
