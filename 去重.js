// ES5

var array = [{value: 1}, {value: 1}, {value: 2}, null, undefined, null, undefined];

function unique(array) {
  var obj = {}
  return array.filter(function(item) {
    console.log(typeof item + JSON.stringify(item))
    return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ?
      false :
      (obj[typeof item + JSON.stringify(item)] = true)
  })
}

console.log(unique(array))
console.log(this)

// es6
const arr = [null, undefined, null, undefined, 11, 22, 111, 11]
function unique(array) {
  const map = new Map()
  return array.filter((data) => !map.has(data) && map.set(data, true))
}
console.log(unique(arr))

