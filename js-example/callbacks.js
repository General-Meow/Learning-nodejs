const add = function(a, b, callbackFunc) {

    setTimeout(() => {
        const result = a + b
        callbackFunc(result)
    
    }, 2000)
}

add(10, 10, (sum) => {
  console.log("the result from the function call is: " + sum)
})