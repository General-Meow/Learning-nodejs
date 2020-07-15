export function isPalindrome(word: string): boolean {
    let result = true;
    for (let index = 0, index2 = word.length-1; index < word.length && index2 > 0; index++, index2--) {
        const element = word[index];
        const endElement = word[index2];
            
        if(element !== endElement) {
            result = false;
            break;
        }
    }
    return result;
}