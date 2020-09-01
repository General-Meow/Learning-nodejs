const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

test('hello world', () => {

})


// test('this should fail', () => {
//     throw new Error('failure')
// })


test('should Calculate total with tip', () => {
    const expectedResult = 110
    const result = calculateTip(100, 0.1)


    expect(result).toBe(expectedResult)
    // if(result != expect) {
    //     throw new Error(`result was not what was expected, expected ${expect}`)
    // }
})

test('should calculate 20% as a default tip when no percent is provided', () => {
    const expectedResult = 120
    const result = calculateTip(100)

    expect(result).toBe(expectedResult)
})

test("Should convert 32 F to 0 C", () => {
    const expectedResult = 0
    const result = fahrenheitToCelsius(32)
    expect(result).toBe(expectedResult)
})

test("Should convert 0 C to 32 F", () => {
    const expectedResult = 32
    const result = celsiusToFahrenheit(0)
    expect(result).toBe(expectedResult)
})

// test('testing async code', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

test('should add 2 number', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('should add 2 number async/await', async () => {
    const result = await add(2, 3)
    expect(result).toBe(5)

})