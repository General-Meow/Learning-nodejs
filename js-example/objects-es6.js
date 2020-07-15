const name = 'paul'
const sex = 'male'

//create an object using the old way
const oldWay = {
  name: name,
  sex: sex
}

console.log(oldWay)

const newWay = {
  name, //use the name value and create a property with the same name
  gender: sex, //you can still change the property name
  location: 'london' //if location doesn't exist set default
}

console.log(newWay)


const myObject = {
    age: 18,
    school: 'deptford green',
    clazz: 'wd',
    favSubject: undefined
}
  
//old way
const age = myObject.age
const school = myObject.school
const clazz = myObject.clazz
const favSubject = myObject.favSubject

console.log("old way:", age, school, clazz, favSubject)

//new way
const myNewObject = {
    anotherAge: 18,
    anotherSchool: 'deptford green',
    anotherClazz: 'wd',
    anotherFavSubject: undefined
}

//within brackets, just after const, create a list of properties you wish to extract from the opbject
//you can rename the new variable with the syntax {property:newVariableName}
//if you extract a property that doesn't exist, it'll be undefined
//if you can set a default value is the property is undefined with the syntax {notHere = 5}
const {anotherAge, anotherSchool: secondarySchool, anotherClazz, anotherFavSubject, derp = 5} = myNewObject

console.log("new way with destructuring:", anotherAge, secondarySchool, anotherClazz, anotherFavSubject, derp)
