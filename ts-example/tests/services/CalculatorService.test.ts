import { Calculator } from '../../src/services/CalculatorService'
import { expect } from 'chai'
import { when, mock } from 'ts-mockito'

describe('CalculatorService', () => {
    // it('Add should add 2 numbers together', () => {
    //     let result = add(10, 1);
    //     expect(result).to.equal(12);
    // });

    let calculator = new Calculator();

    it("should add two number together", () => {
        let result = calculator.add(10, 10);
        expect(result).to.equal(20);
    });

    it("should take away", () => {
        let result = calculator.takeaway(1, 10);
        expect(result).to.equal(9);
    });

    xit("should do division", () => {
        let mockedCalc = mock(Calculator);
        when(mockedCalc.divide(10, 5)).thenReturn(3);

        let result = mockedCalc.divide(10, 5);
        expect(result).to.equal(2);
    });

    it("should run heavyCalculation and return a number less than 100", async () => {
        let result = await calculator.heavyCalculation(1000);
        expect(result).to.be.greaterThan(0);
        expect(result).to.be.lessThan(100);
    })

    it("should run combine to sequencially wait for 2 heavy calcs to add", () => {
        let result = calculator.combineHeavyCalcs();
        result.then(value => {
            expect(value).to.be.greaterThan(0);
            console.log('got value: ', value)
        })
    });

    it("myGenerator should yield values 1 to 5", () => {
        let value = calculator.myGenerator();
        let actualValue = value.next();
        console.log("actual value: ", actualValue);
        console.log("next value: ", value.next());

    });
});