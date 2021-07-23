// 工厂模式
// 所有实例都会指向Object，无法识别是创建自哪个对象的
(function() {
  function createPerson(name) {
    const o = new Object()
    o.name = name
    o.getName = function() {
      console.log(this.name)
    }
    return o
  }

  const p = createPerson('kkk')
})();

// 构造函数模式
// 对比工厂模式，实例可以识别为特定类型的一个对象了
// 但是每次实例的时候，每个方法都要被创建一次
(function() {
  function Person(name) {
    this.name = name
    this.getName = function() {
      console.log(this.name)
    }
  }

  const person1 = new Person('kkk')
})();

// 原型模式
// 对比构造模式，原型模式不会重新创建函数
// 但是所有属性和方法都是共享的，也不能初始化参数
(function() {
  function Person(name) {
  }

  Person.prototype.name = 'kkk'
  Person.prototype.go = {
    test: 'helo'
  }
  Person.prototype.getName = function() {
    console.log('y')
  }

  const person1 = new Person('kkk')
  person1.go.test = "person111"
  const person2 = new Person()
  console.log(person2.go)
})();

// 组合模式
// 构造函数模式 + 原型模式
// 结合了
// 构造函数模式的优点（可以定义私有化的属性，可以初始化属性值）和原型模式的优点（可以共享函数）
(function() {
  function Person(name) {
    this.name = name
  }

  Person.prototype = {
    constructor: Person,
    getName: function () {
        console.log(this.name);
    }
  }

  const person1 = new Person('kkk')
})();

// 寄生构造函数模式
// 所有实例都会指向Object，无法识别是创建自哪个对象的
(function() {
  function Person(name) {
    const o = new Object()
    o.name = name
    o.getName = function() {
      console.log(this.name)
    }
    return o
  }

  const person1 = new Person('kkk')
})();

