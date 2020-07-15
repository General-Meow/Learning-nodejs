export function isOneEditAway(word1: string, word2: string): boolean {

    let result = null;
    //check for edit
    if(word1.length === word2.length) {
        let count = countOfEditsAway(word1, word2);
        result = isOneOrLessEditAwayCheck(count);
    }


    let shorterWord, longerWord;
    if(word1.length < word2.length) {
        shorterWord = word1;
        longerWord = word2;
    } else {
        shorterWord = word2;
        longerWord = word1;
    }

    //check for add
    if(!result) {
        let count = countsOfAddsAway(shorterWord, longerWord);
        result = isOneOrLessEditAwayCheck(count);
    }
    
    //check for remove
    if(!result) {
        //let count = countsOfAddsAway(longerWord, shorterWord);
        //result = isOneOrLessEditAwayCheck(count);
    }

    return result;
}

function countOfEditsAway(word1: string, word2: string): number {
    let editsRequiredCount = 0;

    for (let index = 0; index < word1.length; index++) {
        const word1Element = word1[index];
        const word2Element = word2[index];
        
        if(word1Element !== word2Element){
            editsRequiredCount++;
        }
    }
    return editsRequiredCount;
}

function countsOfAddsAway(word1: string, word2: string): number {
    let changes = 0;
    let lastLongestIndex = 0;
    for (let word1Index = 0, word2Index = 0; word1Index < word1.length, word2Index < word2.length; word1Index++, word2Index++) {
        lastLongestIndex = word2Index;
        let word1Element = word1[word1Index];
        let word2Element = word2[word2Index];
        while(word1Element !== word2Element){
            word2Index++;
            word2Element = word2[word2Index];
        }
    }
    console.log('words ', word1, word2, lastLongestIndex)
    console.log(word2.substr(lastLongestIndex))

    if(lastLongestIndex < word2.length){
        changes += word2.substr(lastLongestIndex).length
    }

    return changes;
}

function isOneOrLessEditAwayCheck(count: number) : boolean {
    return count <= 1;
}