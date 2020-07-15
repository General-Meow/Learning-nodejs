export function isUnique(arg: string): boolean {

    let stringLength = arg.length;
    let result = true;
    for(var i = 0; i < stringLength; i++){
        for(var j = 0; j < stringLength; j++){
            if(i == j){
                continue;
            }
            if(arg[i] === arg[j]) {
                result = false;
                break;
            }
        }

        if(result == false) {
            break;
        }
    }
    
    return result;
}