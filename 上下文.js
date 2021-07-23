// console.log(foo);

// function foo(a = 2) {
//   console.log("foo");
//   d = 1
//   console.log(d)
//   console.log(this)
// }

// console.log(foo);

// foo()
// var foo = 1;

var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

console.log((foo.bar, foo.bar))


function Foo(){
	getName = function(){
		console.log(1);					
  };
	return this
}
			
function getName(){
	console.log(5);
}
console.log(this)

Foo().getName();

