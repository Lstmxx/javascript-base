function step1() {
  function Person() {
  
  }
  const person = new Person()
  person.name = 'kev'
  
  console.log(person.name)
}

step1()

/**
 * 函数的 prototype 属性指向了一个对象，
 * 这个对象正是调用该构造函数而创建的实例的原型，
 * 也就是这个例子中的 person1 和 person2 的原型。
 * 那什么是原型呢？你可以这样理解：
 * 每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，
 * 这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。
 */

function step2() {
  function Person() {
  
  }
  const person0 = new Person()
  console.log('before prototype change', Object.getPrototypeOf(person0))
  Person.prototype.name = 'kevv'
  console.log('after prototype change', Object.getPrototypeOf(person0))
  const person1 = new Person()
  const person2 = new Person()
  console.log('p1', person1.name) 
  console.log('p2', person2.name)

  console.log(person2.__proto__ === Person.prototype)
  console.log(Person.prototype.constructor == Person)
  console.log(Person.prototype)

}

step2()

function step3() {
  function Person() {
  
  }
  Person.prototype.name = 'gulugulu'
  const p = new Person()
  p.name = 'helo'
  console.log('instance ', p.name)
  delete p.name
  console.log('prototype', p.name)

}

step3()