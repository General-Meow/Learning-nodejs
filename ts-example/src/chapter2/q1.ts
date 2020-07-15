export function removeDuplicates(characters: Array<String>) : Array<String> {
    
    let result = Array<String>();
    for (let index = 0; index < characters.length; index++) {
        const element = characters[index];
        let indexOfElement = result.indexOf(element);
        
        if(indexOfElement >= 0) {
            continue;
        }
        result.push(element)
    }
    
    return result;
}