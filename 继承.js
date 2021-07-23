// 原型链继承

(function () {
  function Parent() {
    this.name = "KEVIN";
    this.names = ["kevin", "daisy"];
  }
  Parent.prototype.getName = function () {
    console.log(this.name);
  };

  function Child() {}
  Child.prototype = new Parent();
  // 因为子类用是继承自父类的一个实例，所以各个子类之间的引用类型的属性是会被共享的
  console.log("###原型继承###");
  // 创建时候也不能向父类传参来初始化
  const child1 = new Child();
  child1.names.push("ffff");
  child1.name = "kelkel";
  console.log("child1 names:", child1.names);
  console.log("child1 name:", child1.name);

  const child2 = new Child();
  console.log("child2 names:", child2.names);
  console.log("child2 name:", child2.name);

  console.log("#################");
})();

// 借用构造函数

(function () {
  function Parent(name) {
    this.names = ["kevin", "daisy"];
    this.name = name || "empty";
    this.test1 = () => console.log("hahaha");
  }

  Parent.prototype.test = () => console.log("hahaha");

  function Child(name) {
    Parent.call(this, name);
  }

  console.log("###借用构造函数###");
  // 创建可以向父类传参来初始化
  // 避免了引用类型共享的问题
  const child1 = new Child("helo");
  child1.names.push("ffff");
  console.log("child1 names:", child1.names);
  console.log("child1 name:", child1.name);
  // 缺点就是继承不了父类在原型上定义的函数，只能继承构造函数内定义的函数
  // 这就造成了每次创建都要重新定义函数
  // child1.test()
  child1.test1();

  const child2 = new Child();
  console.log("child2 names:", child2.names);
  console.log("child2 name:", child2.name);

  console.log("#################");
})();

// 组合继承
// 缺点是调用了两次父类的构造函数
(function () {
  function Parent(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
  }

  Parent.prototype.test = () => console.log("hahaha");

  function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
  }

  Child.prototype = new parent();
  Child.prototype.constructor = Child();

  console.log("###组合继承###");

  var child1 = new Child("kevin", "18");

  child1.colors.push("black");

  console.log(child1.name); // kevin
  console.log(child1.age); // 18
  console.log(child1.colors); // ["red", "blue", "green", "black"]

  var child2 = new Child("daisy", "20");

  console.log(child2.name); // daisy
  console.log(child2.age); // 20
  console.log(child2.colors); // ["red", "blue", "green"]

  console.log("#################");
})();

// 原型式继承
// 缺点和原型链继承一样
(function () {
  function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
  }
})();

// 寄生式继承
// 跟借用构造函数模式一样，每次创建对象都会创建一遍方法
(function () {
  function createObj(o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
  }
})();

// 寄生组合式继承

(function () {
  function obj(o) {
    function F() {}
    F.prototype = o
    return new F()
  }

  function prototype(child, parent) {
    const prototype = obj(parent.prototype)
    prototype.constructor = child
    child.prototype = prototype
  }

  function Parent(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
  }

  Parent.prototype.test = () => console.log("hahaha");

  function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
  }

  prototype(Child, Parent)

})();