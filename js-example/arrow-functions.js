//run this file by running: node arrow-functions.js

//non arrow function square
const square = function(x) {
    return x * x;
}

//arrow function square very
const squareArrow = (x) => {
    return x * x
}

//arrow function lamda style
const squareArrowSimple = (x) => x * x

console.log("square", square(3))

console.log("square arrow:", squareArrow(3))

console.log("square arrow simple:", squareArrowSimple(3))

//object with traditional function definition
const eventObj = {
    name: "My birthday",
    printEvent: function() {
        console.log("The event is: ", this.name) //this is pointing to the current obj
    }
}

//arrow functions do not bind the `this` keyword to an encompasing object.
//so arrow functions aren't as well suited for functions (methods) in objects
const eventArrow = {
    name: "My birthday with arrows",
    printEvent: () => {
        console.log("The event is: ", this.name)
    }
}
//simple arrow function, again doesn't work
const eventArrowSimple = {
    name: "My birthday with arrows",
    printEvent: () => console.log("The event is: ", this.name)
}

//object method definition syntax
const eventMethodProperty = {
    name: "My birthday with methods",
    printEvent() {
        console.log("The event is: ", this.name)
    }
}

const eventMethodFunkyThis = {
    name: "My birthday with methods",
    guests: ["Paul"],
    printEvent() {
        //this works as it points to the eventMethodFunkyThis obj
        this.guests.forEach(function(guest){
            console.log(guest + ' is coming to ' + this.name)

            //what is this? seems to point to the global this obj
            console.log('this is: ', this)
        })
        

        this.guests.forEach((guest) => {
            console.log(guest + ' is coming to ' + this.name)
        })
    }
}

eventObj.printEvent()
eventArrow.printEvent()
eventArrowSimple.printEvent()
eventMethodProperty.printEvent()
eventMethodFunkyThis.printEvent()