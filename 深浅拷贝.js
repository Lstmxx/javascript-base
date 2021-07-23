// 浅拷贝
// 表示只复制了外层的引用，但是对于对象里面嵌套对象的话，还是会使用同一个地址

// 数组

const arr = [1, 2, 3, { a: 321 }, { b: 222 }, function() { console.log('ff') }, function() { console.log('gg') }]

const newArr = arr.concat()
const newArr2 = arr.slice()

newArr[0] = 3
newArr2[0] = 4

newArr[3].a = 111
newArr2[4].b = 777


console.log(arr)
console.log(newArr)
console.log(newArr2)

// 实现

function shallowCopy(obj) {
  if (typeof obj !== "object") return
  const newObj = obj instanceof Array ? [] : {}

  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

// 深拷贝

// 可以用JSON.stringify，不过不能拷贝函数，

const arrDeep1 = JSON.parse(JSON.stringify(arr))

arrDeep1[3].a = 123

console.log(arr)
console.log(arrDeep1)

// 实现

function deepCopy(obj) {
  if (typeof obj !== 'object') return
  const nobj = obj instanceof Array ? [] : {}
  for(const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const val = obj[key]
      if (val && typeof val === 'object') {
        nobj[key] = deepCopy(val)
      } else {
        nobj[key] = val
      }
    }
  }
  return nobj
}

const aaa = {
  val: false,
  b: null,
  c: {
    f: 1
  }
}

const b = deepCopy(aaa)
b.c.f = 2
console.log(aaa)
console.log(b)

// extend 实现


const cls2Type = {}
const toString = cls2Type.toString
const hasOwn = cls2Type.hasOwnProperty

function isPlainObj(obj) {
  let proto, ctor
  if (!obj || toString.call(obj) !== "[object object]") return false
  proto = Object.getPrototypeOf(obj)
  if (!proto) {
    return true
  }
  ctor = hasOwn.call(proto, "constructor") && proto.constructor
  return typeof ctor === "function"
    && hasOwn.toString.call(ctor) === hasOwn.toString.call(Object)
}

function isFunction(obj) {
  return type(obj) === "function";
}

function extend() {
  const len = arguments.length
  let deep = false
  let i = 1

  let target = arguments[0] || {}

  if (typeof target === 'boolean') {
    deep = target
    target = arguments[i] || {}
    i++
  }

  if (typeof target !== 'object' && !isFunction(target)) {
    target = {}
  }

  for(; i < len; i++) {
    const op = arguments[i]
    if (op !== null) {
      for(const name in op) {
        const src = target[name]
        const copy = op[name]
        // 防止循环引用
        if (target === copy) {
          continue
        }
        let copyIsArray, clone
        if (deep && copy && (isPlainObj(copy) || (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && isPlainObj(src) ? src : {}
          }
          target[name] = extend(deep, clone, copy)
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  return target
}

const c = extend(true, aaa, b)

console.log(c)

var a4 = extend(true, [4, 5, 6, 7, 8, 9], { 0: 1, 1: 2, 2: 3 });
console.log(a4) // ???

var obj1 = {
  value: {
      3: 1
  }
}

var obj2 = {
  value: [5, 6, 7],

}

var k = extend(true, obj1, obj2) // ???
var g = extend(true, obj2, obj1) // ???

console.log(k)
console.log(g)