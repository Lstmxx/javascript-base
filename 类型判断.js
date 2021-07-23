console.log(typeof undefined)
console.log(typeof false)
console.log(typeof null)
console.log(typeof {})
console.log(typeof [])
const sb = Symbol(1)
console.log(typeof sb)

console.log({} == {})

function Person() {

}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true
console.log(Person === Person.prototype.constructor); // true