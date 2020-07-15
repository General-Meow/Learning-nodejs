export function isPermutation(word1: string, word2: string) : boolean {
    if(word1.length !== word2.length) {
        return false;
    }
    
    let result = true;
    for (const char of word1) {
        let countOfWord1 = countOfChar(char, word1);
        let countOfWord2 = countOfChar(char, word2);
        
        if(countOfWord1 !== countOfWord2) {
            result = false;
            break;
        }
    }

    return result;
}

function countOfChar(character: string, word: string): number {

    let count = 0;
    for(const char of word) {
        if(char === character) {
            count++;
        }
    }
    return count;
}