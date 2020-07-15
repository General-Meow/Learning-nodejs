
// export function add(number1: number, number2: number): number {
//     return number1 + number2;
// }


export class Calculator {

    
    add(number1: number, number2: number): number {
        return number1 + number2;
    }
    
    takeaway(amount: number, from: number): number {
        return from - amount;
    }

    divide(from: number, amount: number): number {
        return from / amount;
    }

    async heavyCalculation(waitTimeMilliseconds: number) : Promise<number> {
        let now = Date.now();
        while((now + waitTimeMilliseconds) > Date.now()){

        }
        return Math.trunc(Math.random() * 100);
    }

    async heavyCalculation2(waitTimeMilliseconds: number) : Promise<number> {
        let now = Date.now();
        while((now + waitTimeMilliseconds) > Date.now()){

        }
        return Math.trunc(Math.random() * 100);
    }

    async combineHeavyCalcs() : Promise<number> {
        let result1 = await this.heavyCalculation(1000)
        console.log('waited and got result1');
        let result2 = await this.heavyCalculation2(700)
        console.log('waited and got result2');
        return result1 + result2;    
    }

    *myGenerator() : Generator<number> {
        for(let x of [1, 2, 3, 4, 5]) {
            let v = yield x;
        }
    }
}